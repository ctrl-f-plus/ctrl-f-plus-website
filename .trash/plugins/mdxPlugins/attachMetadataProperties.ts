// // plugins/attachMetadataProperties.ts

// import { visit } from 'unist-util-visit';

// export default function attachMetadataProperties() {
//   return (tree: any) => {
//     visit(tree, (node) => {
//       if (node?.type === 'element' && node?.tagName === 'Title') {
//         node.properties['__withmeta__'] = (
//           node.children.at(0).tagName === 'div'
//         ).toString();

//         node.properties['__rawstring__'] = node.__rawstring__;
//       } else if (node?.type === 'element' && node?.tagName === 'div') {
//         if (!('data-rehype-pretty-code-fragment' in node.properties)) {
//           return;
//         }

//         const preElement = node.children.at(-1);

//         if (preElement.tagName !== 'pre') {
//           return;
//         }

//         preElement.properties['__withmeta__'] = (
//           node.children.at(0).tagName === 'div'
//         ).toString();

//         preElement.properties['__rawstring__'] = node.__rawstring__;
//       }
//     });
//   };
// }
