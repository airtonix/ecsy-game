import { Node } from './Node';
import { NodeContainer } from './NodeContainer';
import {
  Direction,
  NodeItemData,
  WorkflowLayout,
  WorkflowOptions,
} from './types';

export class Workflo {
  // The default options.
  private readonly defaultOptions = {};

  // The root nodes.
  private _rootNodes: Array<Node> = [];

  // The root node container.
  private _rootNodeContainer!: HTMLDivElement;

  // The node layout direction.
  private layoutDirection!: Direction;

  constructor(
    // The target container.
    public target: HTMLElement,
    // The options.
    public options: Partial<WorkflowOptions> = {}
  ) {}

  /**
   * Initialisation.
   */
  init() {
    // Create the control.
    this.createControl(this.options.layout || this.defaultOptions);

    // Create the node tree based on the data items passed as an option.
    this.populateNodeTree(this.options.data || []);

    // Populate the root node container with nested node containers based on our node tree.
    this.populateRootNodeContainer();
  }

  /**
   * Build the actual control into the target container.
   * @param layout The control layout options.
   */
  createControl(layout: WorkflowLayout) {
    // Determine the layout direction of our nodes.
    const layoutDirection =
      layout?.direction?.toLowerCase() === 'vertical'
        ? 'vertical'
        : 'horizontal';

    // Apply the workflo-container class to the target element.
    this.target.classList.add(
      'workflo-container',
      `workflo-direction-${layoutDirection}`
    );

    // Wrap the root nodes container in a row container to center it vertically.
    const rootNodeContainerRow = document.createElement('div');
    rootNodeContainerRow.classList.add('root-node-container-row');
    this.target.appendChild(rootNodeContainerRow);

    // Wrap the root nodes container in a div.
    const rootNodeContainer = document.createElement('div');
    rootNodeContainer.classList.add('root-node-container');
    rootNodeContainerRow.appendChild(rootNodeContainer);

    // Grab a reference to the root node container.
    this._rootNodeContainer = rootNodeContainer;
  }

  /**
   * Populate the node tree based on the data items passed in via the options.
   */
  populateNodeTree(dataItems: NodeItemData[]) {
    // Check that we have an id property.
    if (!this.options?.nodeIdField) {
      throw new Error('no id property was defined in options.');
    }

    // A function to recursively create and append child nodes to a parent node.
    const createAndAppendChildNodes = (
      parent: Node,
      items: NodeDefinition[],
      options: WorkflowOptions
    ) => {
      // Look for any items which are a child of the parent node.
      for (let i = 0; i < items.length; i++) {
        // Get the current item.
        const item = items[i];
        const itemParentId = item[options.nodeParentField];

        // If this items parent is the parent node then hook them up.
        if (itemParentId && itemParentId === parent.id()) {
          // Create the child node.
          const childNode = new Node(item, options, layoutDirection);

          // Set the depth of the node.
          childNode.depth = parent.depth + 1;

          // Add the child node as a child of the parent.
          parent.children.push(childNode);

          // Create and append child nodes to this child node.
          createAndAppendChildNodes(childNode, items, options);
        }
      }
    };

    // Firstly, we need to find the root nodes.
    const rootNodes = [];
    for (let i = 0; i < dataItems.length; i++) {
      // Get the current item.
      const item = dataItems[i];

      // If this item has no parent then we treat it as a root node.
      if (!item[this.options.nodeParentField || 'parent']) {
        // Create the root node.
        const rootNode = new Node(item, this.options, layoutDirection);

        // Create and append child nodes to this root node.
        createAndAppendChildNodes(rootNode, dataItems, this.options);

        // Add the root node.
        rootNodes.push(rootNode);
      }
    }

    // Set the root nodes.
    this._rootNodes = rootNodes;
  }

  /**
   * Populate the root node container with nested node containers based on our node tree.
   */
  populateRootNodeContainer() {
    const fill = function (
      children: Array<Node>,
      childContainer: HTMLDivElement
    ) {
      for (let i = 0; i < children.length; i++) {
        // Get the current child.
        const child = children[i];

        // Create a node container for this child.
        const container = new NodeContainer();

        // Create the parent node element and inject it into parent-container.
        child.attachToParentContainer(container.parentContainer);

        // Inject the node-container into the outer child container.
        childContainer.appendChild(container.nodeContainer);

        // Repeat this process for ever child of the current child, if there are any.
        if (child.children.length > 0) {
          fill(child.children, container.childContainer);

          // Draw the connectors for this child.
          child.drawConnectors();
        }
      }
    };

    // Populate the target container with the nested node containers.
    fill(this._rootNodes, this._rootNodeContainer);
  }

  /**
   * Refresh the instance.
   */
  refresh(data) {
    // Empty the root node container.
    this._rootNodeContainer.innerHTML = '';

    // Re-populate the node tree.
    this.populateNodeTree(data || this.options.data || []);

    // Populate the root node container with nested node containers based on our node tree.
    this.populateRootNodeContainer();
  }

  destroy() {
    return;
  }
}
