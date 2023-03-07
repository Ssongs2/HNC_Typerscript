import Store from "./store";
import Router from "./core/router";
import { NewsFeedView, NewsDetailView } from "./page";

// Type alias, Interface
// const store: Store = { // share contents // ,구분
//   currentPage: 1,
//   totalPage: 0,
//   feeds: [],
// }

// 쉬운 방법 - 전역 객체로 만드는 방법
// declare global {
//   interface Window {
//     store: Store;
//   }
// }

// window.store = store;
const store = new Store();

const router: Router = new Router();
const newsFeedView = new NewsFeedView('root', store);
const newsDetailView = new NewsDetailView('root', store);


router.setDefaultPage(newsFeedView);
router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);

router.route();


// Mixin
// function applyApiMixins(targetClass: any, baseclasses: any[]): void {
//   baseclasses.forEach(baseclass => {
//     Object.getOwnPropertyNames(baseclass.prototype).forEach(name => {
//       const descriptor = Object.getOwnPropertyDescriptor(baseclass.property, name);

//       if (descriptor) {
//         Object.defineProperty(targetClass.prototype, name, descriptor)
//       }
//     })
//   })
// }

// // compiler 에게 API 상속받은 거라고 알려주기.
// interface NewsFeedApi extends Api { };
// interface NewsDetailApi extends Api { };

// applyApiMixins(NewsFeedApi, [Api]);
// applyApiMixins(NewsDetailApi, [Api]);