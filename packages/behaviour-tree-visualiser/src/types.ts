export type Direction = 'vertical' | 'horizontal';

export type NodeItemData = {
  type: string;
  id: string;
  name: string;
  parent: NodeItemData;
  additional: Array<NodeItemData>;
  template: string | (() => string);
  default: NodeItemData;
};

export type NodeOptions = {
  nodeIdField: keyof NodeItemData;
  nodeNameField: keyof NodeItemData;
  nodeTypeField: keyof NodeItemData;
  nodeParentField: keyof NodeItemData;
  line?: ConnectorLineOption;
  direction: Direction;
  definition: NodeItemData;
  onClick: (item: NodeItemData) => void;
};

export type WorkflowLayout = {
  direction?: Direction;
};
export type WorkflowOptions = {
  layout?: WorkflowLayout;
  data?: NodeItemData[];
} & NodeOptions;

export type ConnectorLineOption = {
  type: 'angled';
  thickness: number;
  colour: string;
  cap: 'square' | 'round';
};
