// // app/lib/browser.ts

// // src/contentScripts/utils/browser/device.ts

// // async function detectBrowser() {
// // function detectBrowser() {
// //   let browser;

// //   if (navigator.userAgent.indexOf('Chrome') !== -1) {
// //     browser = 'chrome';
// //   } else if (navigator.userAgent.indexOf('Edg') !== -1) {
// //     browser = 'edge';
// //   } else if (navigator.userAgent.indexOf('Brave') !== -1) {
// //     browser = 'brave';
// //   } else if (
// //     navigator.userAgent.indexOf('Opera') !== -1 ||
// //     navigator.userAgent.indexOf('OPR') !== -1
// //   ) {
// //     browser = 'opera';
// //   } else {
// //     browser = 'chrome';
// //   }
// //   return browser;
// // }
// // type DeviceType = {
// //   ChromeBrowser: 'ChromeBrowser',
// //   FirefoxBrowser: 'FirefoxBrowser',
// //   OperaBrowser: 'OperaBrowser',
// //   EdgeBrowser: 'EdgeBrowser',
// //   IEBrowser: 'IEBrowser',
// //   UnknownBrowser: 'UnknownBrowser',
// //   SafariBrowser: 'SafariBrowser',
// //   VivaldiBrowser: 'VivaldiBrowser',
// // }

// export enum DeviceType {
//   ChromeBrowser = 'ChromeBrowser',
//   FirefoxBrowser = 'FirefoxBrowser',
//   OperaBrowser = 'OperaBrowser',
//   EdgeBrowser = 'EdgeBrowser',
//   IEBrowser = 'IEBrowser',
//   UnknownBrowser = 'UnknownBrowser',
//   SafariBrowser = 'SafariBrowser',
//   VivaldiBrowser = 'VivaldiBrowser',
// }

// type BrowserUtils = {
//   browserCache: DeviceType | null;
//   detectBrowser: () => DeviceType;
// };

// const browserUtils: BrowserUtils = {
//   browserCache: null,

//   detectBrowser(): DeviceType {
//     if (this.browserCache != null) {
//       return this.browserCache;
//     }

//     if (
//       navigator.userAgent.indexOf(' Firefox/') !== -1 ||
//       navigator.userAgent.indexOf(' Gecko/') !== -1
//     ) {
//       this.browserCache = DeviceType.FirefoxBrowser;
//     } else if (navigator.userAgent.indexOf(' OPR/') >= 0) {
//       this.browserCache = DeviceType.OperaBrowser;
//     } else if (navigator.userAgent.indexOf(' Edg/') !== -1) {
//       this.browserCache = DeviceType.EdgeBrowser;
//     } else if (navigator.userAgent.indexOf(' Vivaldi/') !== -1) {
//       this.browserCache = DeviceType.VivaldiBrowser;
//     } else if (
//       navigator.userAgent.indexOf(' Safari/') !== -1 &&
//       navigator.userAgent.indexOf('Chrome') === -1
//     ) {
//       this.browserCache = DeviceType.SafariBrowser;
//     } else if (
//       (window as any).chrome &&
//       navigator.userAgent.indexOf(' Chrome/') !== -1
//     ) {
//       this.browserCache = DeviceType.ChromeBrowser;
//     } else if (navigator.userAgent.indexOf(' Trident/') !== -1) {
//       this.browserCache = DeviceType.IEBrowser;
//     } else {
//       this.browserCache = DeviceType.UnknownBrowser;
//     }

//     return this.browserCache;
//   },
// };

// export default browserUtils;
