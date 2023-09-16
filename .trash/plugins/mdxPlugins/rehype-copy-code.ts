// import { visit } from 'unist-util-visit';

// export default function attachRawStringToCodeContainers() {
//   return (tree: any) => {
//     visit(tree, (node: any) => {
//       if (
//         node?.type === 'element' &&
//         node?.tagName === 'div' &&
//         node.properties.className.includes('remark-code-container')
//       ) {
//         const titleNode = node.children.length > 1 ? node.children[0] : null;
//         const preNode =
//           node.children.length > 1 ? node.children[1] : node.children[0];

//         const raw = preNode.children[0]?.children[0]?.value;

//         if (titleNode) {
//           titleNode.__rawstring__ = raw;
//         } else {
//           preNode.__rawstring__ = raw;
//         }
//       }
//     });
//   };
// }
