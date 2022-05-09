/**
 * A node container.
 */
export class NodeContainer {
  constructor(
    public nodeContainer = document.createElement('div'),
    public parentContainer = document.createElement('div'),
    public childContainer = document.createElement('div')
  ) {
    nodeContainer.classList.add('node-container');
    parentContainer.classList.add('parent-container');
    childContainer.classList.add('child-container');
    nodeContainer.appendChild(this.parentContainer);
    nodeContainer.appendChild(this.childContainer);
  }
}
