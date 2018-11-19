import * as acorn from 'acorn';

type Variables = {
  [name: string]: any;
};

export const interprete = (code: string, variables: Variables = {}) => {
  const node = acorn.parse(code) as Node;

  return execute(node, variables);
};

type BaseNode = acorn.Node;

type ProgramNode = {
  type: 'Program';
  body: Node[];
} & BaseNode;
type ExpressionStatementNode = {
  type: 'ExpressionStatement';
  expression: Node;
} & BaseNode;
type BinaryExpressionNode = {
  type: 'BinaryExpression';
  operator: string;
  left: Node;
  right: Node;
} & BaseNode;
type CallExpressionNode = {
  type: 'CallExpression';
  callee: Node;
  arguments: Node[];
} & BaseNode;
type LiteralNode = {
  type: 'Literal';
  value: any;
} & BaseNode;
type IdentifierNode = {
  type: 'Identifier';
  name: string;
} & BaseNode;

type Node =
  | ProgramNode
  | ExpressionStatementNode
  | BinaryExpressionNode
  | CallExpressionNode
  | LiteralNode
  | IdentifierNode;

const execute = (node: Node, variables: Variables): any => {
  switch (node.type) {
    case 'Program':
      return execute(node.body[node.body.length - 1], variables);
    case 'ExpressionStatement':
      return execute(node.expression, variables);
    case 'BinaryExpression':
      return executeBinaryExpression(node, variables);
    case 'CallExpression':
      return executeCallExpression(node, variables);
    case 'Literal':
      return node.value;
    case 'Identifier':
      if (node.name in variables) {
        return variables[node.name];
      } else {
        throw new Error(`Missing variable: ${node.name}`);
      }
    default:
      throw new Error(`Unexpected node type: ${(node as BaseNode).type}`);
  }
};

const executeBinaryExpression = (
  node: BinaryExpressionNode,
  variables: Variables
) => {
  switch (node.operator) {
    case '+':
      return execute(node.left, variables) + execute(node.right, variables);
    case '-':
      return execute(node.left, variables) - execute(node.right, variables);
    case '*':
      return execute(node.left, variables) * execute(node.right, variables);
    case '/':
      return execute(node.left, variables) / execute(node.right, variables);
    default:
      throw new Error(`Unexpected operator type: ${node.operator}`);
  }
};

const functions: { [name: string]: Function } = {
  ceil: (x: number) => Math.ceil(x),
  floor: (x: number) => Math.floor(x),
  round: (x: number) => Math.round(x),
};

const executeCallExpression = (
  node: CallExpressionNode,
  variables: Variables
) => {
  if (node.callee.type !== 'Identifier') {
    throw new Error(`Only Identifier are supported as function name`);
  }

  const fn = functions[node.callee.name];

  if (!fn) {
    throw new Error(`Unexpected function: ${node.callee.name}`);
  }

  const args = node.arguments.map(argument => execute(argument, variables));

  return fn(...args);
};
