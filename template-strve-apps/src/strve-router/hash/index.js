import { formateObjToParamStr, getCurrentPath, getBaseUrl, routerHash } from '../utils/index.js'

let viewData = null;
let isHmr = false;
let pathurl = '';
export default class StrveRouter {
    constructor(routes) {
        this.routes = routes;
        this.path = '';
    }

    routerLink(pathData) {
        if (pathData) {
            viewData = null;
            isHmr = false;
            if (typeof pathData === 'string') {
                window.location.href = `${getBaseUrl()}#${pathData}`;
                this.path = pathData;
            } else {
                if (pathData.query) {
                    window.location.href = `${getBaseUrl()}#${pathData.path}?${formateObjToParamStr(pathData.query)}`;
                } else {
                    window.location.href = `${getBaseUrl()}#${pathData.path}`;
                }
                this.path = pathData.path;
            }
        }
    }

    nextUpdateView(view,path) {
        if(viewData){
            viewData = null;
        }
        viewData = view;
        isHmr = true;
        pathurl = path;
    }

    routerView() {
        if(viewData&&isHmr&&getCurrentPath()===pathurl){
            isHmr = false;
            console.log(viewData);
            return viewData;
        } else {
            if (this.path) {
                return routerHash(this.path, this.routes);
            } else {
                if (location.hash) {
                    const path = getCurrentPath();
                    return routerHash(path, this.routes);
                } else {
                    return routerHash(location.pathname, this.routes);
                }
            }
        }
    }

    routerHashUpdate(updateView, fn) {
        window.addEventListener('hashchange', () => {
            this.path = getCurrentPath();
            updateView(() => {
                if (typeof fn === 'function') {
                    fn();
                }
            }, 'useRouter')
        }, false);
    }

    go(n) {
        window.history.go(n);
    }

    back() {
        window.history.go(-1);
    }

    forward() {
        window.history.go(1);
    }

    param2Obj() {
        const search = decodeURIComponent(location.href.split('?')[1]).replace(/\+/g, ' ')
        if (!search) {
            return {}
        }
        const obj = {};
        const searchArr = search.split('&');
        searchArr.forEach(v => {
            const index = v.indexOf('=');
            if (index !== -1) {
                const name = v.substring(0, index);
                const val = v.substring(index + 1, v.length);
                obj[name] = val;
            }
        })
        return obj
    }
}
