import { populateConnectorSVG } from './Connector';
import { Direction, NodeItemData, NodeOptions } from './types';

/**
 * A node.
 */
export class Node {
  // The depth of the node in the node tree.
  depth = 1;

  // The children of this node.
  children: Array<Node> = [];

  // The SVG on which to draw node connectors.
  _connectorSVG: SVGElement | null = null;

  // The parent DOM element of this node.
  _parentContainer: HTMLDivElement | null = null;

  _defaultOptions: Pick<
    NodeOptions,
    | 'direction'
    | 'nodeIdField'
    | 'nodeNameField'
    | 'nodeParentField'
    | 'nodeTypeField'
  > = {
    direction: 'horizontal',
    nodeIdField: 'id',
    nodeNameField: 'name',
    nodeParentField: 'parent',
    nodeTypeField: 'type',
  } as const;
  options: NodeOptions;

  constructor(
    public item: NodeItemData,
    options: Partial<NodeOptions>,
    public direction: Direction
  ) {
    this.options = Object.assign(this._defaultOptions, options) as NodeOptions;
  }

  id() {
    return this.item[this.options.nodeIdField] as string;
  }
  name() {
    return this.item[this.options.nodeNameField] as string;
  }
  type() {
    return this.item[this.options.nodeTypeField] as string;
  }
  parent() {
    return this.item[this.options.nodeParentField] as string;
  }
  /**
   * Get the height of this node in the DOM.
   */
  getHeight() {
    return this._parentContainer ? this._parentContainer.offsetHeight : 0;
  }

  /**
   * Get the width of this node in the DOM.
   */
  getWidth() {
    return this._parentContainer ? this._parentContainer.offsetWidth : 0;
  }

  /**
   * Returns whether this is a root node.
   */
  isRoot() {
    return !this.parent();
  }

  onClick() {
    const { onClick } = this.options;
    if (typeof onClick !== 'function') return;

    onClick(this.item);
  }

  /**
   * Appends the node DOM element to a parent element.
   */
  attachToParentContainer(parent: HTMLDivElement) {
    // Grab a reference to the parent container.
    this._parentContainer = parent;

    // Create a wrapper div for the element.
    const wrapper = document.createElement('div');
    wrapper.classList.add('template-wrapper');
    // Use the default template to create the element.
    const templateFn = this.getTemplateFunction(this.options.definition || {});
    wrapper.innerHTML = templateFn(this);

    // If an onclick callback was defined in the options then hook it up to a press of the wrapped div.
    wrapper.addEventListener('click', this.onClick.bind(this));

    // Create the SVG.
    this._connectorSVG = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );

    // Set the initial attributes.
    this._connectorSVG.setAttributeNS(null, 'class', 'connector-svg');

    // Create a wrapper for the SVG.
    const connectorSVGWrapper = document.createElement('div');
    connectorSVGWrapper.classList.add('connector-svg-wrapper');
    connectorSVGWrapper.appendChild(this._connectorSVG);

    // Append the node element to the target container.
    parent.appendChild(wrapper);

    // Append the connectors SVG wrapper the the target container.
    parent.appendChild(connectorSVGWrapper);
  }

  /**
   * Draw the parent -> child connectors for this node.
   */
  drawConnectors() {
    let childPositionOffset = 0;
    const points: string[] = [];

    // How we find the connector points depends on the layout direction.
    if (this.direction === 'horizontal') {
      // Draw a connector for each child of this node.
      for (let i = 0; i < this.children.length; i++) {
        // Get the current child.
        const child = this.children[i];

        // Get the height of the child.
        const childHeight = child.getHeight();

        // Calculate the end point of the connector, which should be aligned with the child element.
        const childConnectorOffset = childPositionOffset + childHeight / 2;

        points.push((childConnectorOffset / this.getHeight()) * 100 + '%');

        // Add the child height to the offset.
        childPositionOffset += childHeight;
      }
    } else {
      // Draw a connector for each child of this node.
      for (let i = 0; i < this.children.length; i++) {
        // Get the current child.
        const child = this.children[i];

        // Get the width of the child.
        const childWidth = child.getWidth();

        // Calculate the end point of the connector, which should be aligned with the child element.
        const childConnectorOffset = childPositionOffset + childWidth / 2;

        points.push((childConnectorOffset / this.getWidth()) * 100 + '%');

        // Add the child width to the offset.
        childPositionOffset += childWidth;
      }
    }

    if (!this._connectorSVG) return;

    populateConnectorSVG(
      this._connectorSVG,
      points,
      this.options.line || {},
      this.direction
    );
  }

  /**
   * Get the template function to use for creating the node element.
   */
  getTemplateFunction(definition: NodeItemData): (node: Node) => string {
    // Firstly, attempt to find a template function based on the node type.
    const matchingType = this.findAdditionalDefinitionByType(
      definition,
      this.type()
    );

    if (
      matchingType &&
      matchingType.template &&
      typeof matchingType.template === 'function'
    ) {
      return matchingType.template;
    } else if (
      definition.default &&
      definition.default.template &&
      typeof definition.default.template === 'function'
    ) {
      return definition.default.template;
    } else {
      // Get the node name.
      const nodeName = this.name();

      return function () {
        return (
          "<div class='workflo-default-node'><p>" + nodeName + '</p></div>'
        );
      };
    }
  }

  /**
   * Find an additional definition by type.
   * Returns undefined if one does not exist.
   */
  findAdditionalDefinitionByType(
    definition: NodeItemData,
    typeValue: NodeItemData['type']
  ) {
    const additional = definition.additional || [];

    for (let i = 0; i < additional.length; i++) {
      if (additional[i].type === typeValue) {
        // We found the additional definition of the specified type.
        return additional[i];
      }
    }

    // There is no additional definition of the specified type.
    return undefined;
  }
}
