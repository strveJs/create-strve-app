function filter(str) {
    str += '';
    str = str.replace(/%/g, '%25');
    str = str.replace(/\+/g, '%2B');
    str = str.replace(/ /g, '%20');
    str = str.replace(/\//g, '%2F');
    str = str.replace(/\?/g, '%3F');
    str = str.replace(/&/g, '%26');
    str = str.replace(/\=/g, '%3D');
    str = str.replace(/#/g, '%23');
    return str;
}

function formateObjToParamStr(paramObj) {
    const sdata = [];
    for (let attr in paramObj) {
        sdata.push(`${attr}=${filter(paramObj[attr])}`);
    }
    return sdata.join('&');
}

function getCurrentPath() {
    return location.hash.indexOf('?') !== -1 ? location.hash.split('#')[1].split('?')[0] : location.hash.split('#')[1];
}

function getBaseUrl() {
    const href = window.location.href;
    const i = href.indexOf('#');
    const base = i >= 0 ? href.slice(0, i) : href;
    return `${base}`;
}

function routerHash(path,routes) {
    for (let index = 0; index < routes.length; index++) {
        const item = routes[index];
        if (item.path === path) {
            const a= item.template;
            console.log(a);
            return a;
        }
    }
}

export {
    formateObjToParamStr,
    getCurrentPath,
    getBaseUrl,
    routerHash
}