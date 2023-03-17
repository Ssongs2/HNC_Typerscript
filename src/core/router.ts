import { RouteInfo } from '../types'
import View from './view';

export default class Router {
    routeTable: RouteInfo[];
    defaultRoute: RouteInfo | null;
    // RouteInfo, RouteInfo[]

    constructor() {

        window.addEventListener('hashchange', this.route.bind(this));
        // this.route 라고만 지정해놓으면 window가 작동시키는데 Router context로 인지가 안되서
        // 고정시켜줄려면 bind 사용

        this.routeTable = [];
        this.defaultRoute = null;
    }

    setDefaultPage(page: View) {
        this.defaultRoute = { path: '', page }
    }

    addRoutePath(path: string, page: View): void {
        this.routeTable.push({ path, page });
    }

    route() {
        const routePath = location.hash;

        if (routePath === '' && this.defaultRoute) {
            this.defaultRoute.page.render()
        }

        for (const routeInfo of this.routeTable) {
            if (routePath.indexOf(routeInfo.path) >= 0) {
                routeInfo.page.render();
                break;
            }
        }
    }
}
