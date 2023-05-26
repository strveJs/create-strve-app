/**
 * @name strve-sfc
 * @description This JavaScript library is used to develop Strve single file components.
 * @version 6.0.0
 * @author maomincoding
 */

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
const HTML_TAGS =
  "html,body,base,head,link,meta,style,title,address,article,aside,footer," +
  "header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption," +
  "figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code," +
  "data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup," +
  "time,u,var,wbr,area,audio,map,track,video,embed,object,param,source," +
  "canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td," +
  "th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup," +
  "option,output,progress,select,textarea,details,dialog,menu," +
  "summary,template,blockquote,iframe,tfoot";
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element
const SVG_TAGS =
  "svg,animate,circle,clippath,cursor,image,defs,desc,ellipse,filter,font-face" +
  "foreignobject,g,glyph,line,marker,mask,missing-glyph,path,pattern," +
  "polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view," +
  "feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feFlood,feGaussianBlur," +
  "feImage,feMerge,feMorphology,feOffset,feSpecularLighting,feTile,feTurbulence,feDistantLight,fePointLight,feSpotLight," +
  "linearGradient,stop,radialGradient," +
  "animateTransform,animateMotion";
const isHTMLTag = /*#__PURE__*/ makeMap(HTML_TAGS);
const isSVG = /*#__PURE__*/ makeMap(SVG_TAGS);
function isXlink(name) {
  return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
}
function isComplexType(v) {
  const typeData = ["object", "array", "function", "regexp", "date", "math"];
  return typeData.indexOf(getType(v)) !== -1;
}
function getType(v) {
  return Object.prototype.toString
    .call(v)
    .match(/\[object (.+?)\]/)[1]
    .toLowerCase();
}
// Object and array is not supported,But you can use JSON.stringify() to convert it to string type
makeMap(
  "function,regexp,date,math,undefined,null,boolean,string,number,symbol,bigInt"
);
function makeMap(str) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return function (val) {
    return map[val];
  };
}
function isVnode(vnodes) {
  if (
    vnodes.hasOwnProperty("tag") &&
    vnodes.hasOwnProperty("props") &&
    vnodes.hasOwnProperty("children")
  ) {
    return true;
  }
}
function checkVnode(vnodes) {
  if (getType(vnodes) === "array") {
    for (let index = 0; index < vnodes.length; index++) {
      if (isVnode(vnodes[index])) {
        return true;
      }
    }
  } else if (getType(vnodes) === "object") {
    return isVnode(vnodes);
  }
}
const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;
function isSameObject(obj1, obj2) {
  if (!isComplexDataType(obj1) || !isComplexDataType(obj2)) {
    return obj1 === obj2;
  }
  if (obj1 === obj2) {
    return true;
  }
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  for (const key in obj1) {
    const res = isSameObject(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }
  return true;
}
const namespaceMap = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML",
};
const xlinkNS = "http://www.w3.org/1999/xlink";
function getXlinkProp(name) {
  return isXlink(name) ? name.slice(6, name.length) : "";
}
function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return "svg";
  }
  if (tag === "math") {
    return "math";
  }
}
function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}
function setStyleProp(el, prototype) {
  for (let i in prototype) {
    el.style[i] = prototype[i];
  }
}
const _objDataMap = new Map();
function addEvent(el, props) {
  for (let index = 0; index < Object.keys(props).length; index++) {
    const element = Object.keys(props)[index].toString();
    if (element.startsWith("@")) {
      const name = element.split("@")[1];
      if (getType(props[element]) === "function") {
        el.addEventListener(name, props[element]);
      } else if (getType(props[element]) === "string") {
        const _obj = _objDataMap.get(props[element].split(".")[0]);
        const _key = props[element].split(".")[1];
        el.addEventListener(name, _obj[_key]);
      }
    }
  }
}
function removeEvent(el, key, oldProps) {
  if (isXlink(key)) {
    el.removeAttributeNS(xlinkNS, getXlinkProp(key));
  } else {
    el.removeAttribute(key);
  }
  if (key.startsWith("@")) {
    const name = key.split("@")[1];
    if (getType(oldProps[key]) === "function") {
      el.removeEventListener(name, oldProps[key]);
    } else if (getType(oldProps[key]) === "string") {
      const _obj = _objDataMap.get(oldProps[key].split(".")[0]);
      const _key = oldProps[key].split(".")[1];
      el.removeEventListener(name, _obj[_key]);
    }
  }
}
function createNode(tag) {
  // Html
  if (isHTMLTag(tag)) {
    return document.createElement(tag);
  }
  // Svg
  else if (isSVG(tag)) {
    return createElementNS(getTagNamespace(tag), tag);
  }
  // Fragment
  else if (tag === "fragment") {
    return document.createDocumentFragment();
  }
  // Comment
  else if (tag === "comment" || tag === "null") {
    return document.createComment(tag);
  }
  // Web-components
  else if (tag.indexOf("-") !== -1) {
    return document.createElement(tag);
  }
  // Default
  else {
    return document.createElement(tag);
  }
}
function setFragmentNode(dom) {
  const fragment = {
    tag: "fragment",
    props: null,
    children: dom,
  };
  return fragment;
}
function useFragmentNode(dom) {
  return !dom.tag ? setFragmentNode(dom) : dom;
}

const _com_ = Object.create(null);
const _components = new WeakMap();
const flag = ["$key"];
const domInfo = Object.create(null);

function mount(vnode, container, anchor) {
  if (vnode.tag) {
    const el = createNode(vnode.tag);
    if (vnode.props) {
      addEvent(el, vnode.props);
      if (vnode.props.hasOwnProperty(flag[0])) {
        vnode.el = el;
        if (getType(vnode.props[flag[0]]) === "string") {
          domInfo[vnode.props[flag[0]]] = el;
        }
      }
      for (const key in vnode.props) {
        if (vnode.props.hasOwnProperty(key)) {
          if (getType(vnode.props[key]) !== "function") {
            if (isXlink(key)) {
              el.setAttributeNS(xlinkNS, key, vnode.props[key]);
            } else {
              if (!flag.includes(key) && !key.startsWith("@")) {
                el.setAttribute(key, vnode.props[key]);
              }
            }
          }
          if (getType(vnode.props[key]) === "object") {
            setStyleProp(el, vnode.props[key]);
          }
        }
      }
    }
    if (vnode.children) {
      updateChildrenNode(vnode.children, el, mountChildren);
      function mountChildren() {
        if (getType(vnode.children[0]) === "array") {
          vnode.children[0].forEach((child) => {
            if (isVnode(child)) {
              mount(child, el);
            }
          });
        } else {
          if (getType(vnode.children) === "array") {
            vnode.children.forEach((child) => {
              if (isVnode(child)) {
                mount(child, el);
              }
            });
          }
        }
      }
    }
    if (anchor) {
      container.insertBefore(el, anchor);
    } else {
      container.appendChild(el);
    }
  }
}
function patch(n1, n2, status) {
  const oldProps = n1.props || {};
  if (oldProps.hasOwnProperty(flag[0]) && n1.tag !== n2.tag) {
    const parent = n1.el.parentNode;
    const anchor = n1.el.nextSibling;
    parent.removeChild(n1.el);
    mount(n2, parent, anchor);
  } else {
    let el = null;
    if (oldProps.hasOwnProperty(flag[0])) {
      const newProps = n2.props || {};
      el = n2.el = n1.el;
      for (const key in newProps) {
        let [newValue, oldValue] = [newProps[key], oldProps[key]];
        if (newValue !== oldValue) {
          if (newValue !== null) {
            if (getType(newValue) !== "function" && !flag.includes(key)) {
              el[key] && (el[key] = newValue); // property
              if (isXlink(key)) {
                el.setAttributeNS(xlinkNS, key, newValue);
              } else {
                el.setAttribute(key, newValue);
              }
              if (getType(newValue) === "object") {
                setStyleProp(el, newValue);
              }
            } else {
              if (key.startsWith("@")) {
                const name =
                  key.split("@")[1][0].toLowerCase() +
                  key.split("@")[1].substring(1);
                el.addEventListener(name, newValue, false);
              }
            }
          } else {
            removeEvent(el, key, oldProps);
          }
        }
      }
      for (const key in oldProps) {
        if (!(key in newProps)) {
          removeEvent(el, key, oldProps);
        }
      }
    }

    const oc = n1.children[0];
    const nc = n2.children[0];
    const ocs = n1.children;
    const ncs = n2.children;
    if (!isSameObject(ocs, ncs)) {
      updateChildrenNode(ncs, el, patchChildren);
      function patchChildren() {
        if (getType(oc) !== "array" && getType(nc) === "array") {
          el.innerHTML = "";
          nc.forEach((c) => mount(c, el));
        } else if (getType(oc) === "array" && getType(nc) === "array") {
          patchNode(oc, nc, el, status);
        } else {
          patchNode(ocs, ncs, el, status);
        }
      }
    }
  }
}
function patchNode(o, n, el, status) {
  if (status === "useFirstKey") {
    for (let i = 1; i <= Math.max(o.length, n.length); i++) {
      if (!o[o.length - i]) {
        mount(n[n.length - i], o[o.length - 1].el.parentNode, o[0].el);
      } else if (!n[n.length - i]) {
        el.removeChild(o[o.length - i].el);
      } else {
        patch(o[o.length - i], n[n.length - i], status);
      }
    }
  } else {
    for (let i = 0; i < Math.min(o.length, n.length); i++) {
      patch(o[i], n[i], status);
    }
    if (n.length > o.length) {
      n.slice(o.length).forEach((c) => mount(c, el));
    } else if (o.length > n.length) {
      o.slice(n.length).forEach((c) => {
        el.removeChild(c.el);
      });
    }
  }
}
function updateChildrenNode(childNode, el, setChildrenNode) {
  if (childNode.length === 1 && !isComplexType(childNode[0])) {
    el && updateTextNode(childNode, el);
  } else if (childNode.length > 1 && !checkVnode(childNode)) {
    el && updateTextNode(childNode.join().replace(/,/g, ""), el);
  } else if (
    isComplexType(childNode[0]) &&
    !childNode[0].tag &&
    !checkVnode(childNode[0])
  ) {
    el && updateTextNode(childNode[0], el);
  } else {
    setChildrenNode();
  }
}
function updateTextNode(val, el) {
  if (isComplexType(val)) {
    if (
      getType(val) === "function" ||
      getType(val) === "regexp" ||
      getType(val) === "array"
    ) {
      el.textContent = String(val);
    } else {
      el.textContent = JSON.stringify(val, null, 2);
    }
  } else {
    el.textContent = val ? val.toString() : String(val);
  }
}

let mountHook = null;
function onMounted(fn) {
  if (getType(fn) === "function") {
    mountHook = fn;
  }
}

let unMountedHook = null;
function onUnmounted(fn) {
  if (getType(fn) === "function") {
    unMountedHook = fn;
  }
}

let nextTickHook = null;
function nextTick(fn) {
  if (getType(fn) === "function") {
    nextTickHook = fn;
  }
}

function mountNode(dom, selector, status, name) {
  if (!state.isMounted) {
    const _template = useFragmentNode(dom);
    mount(_template, selector);
    state.oldTree = _template;
    state.isMounted = true;
    mountHook && mountHook();
  } else {
    const newTree = useFragmentNode(dom);
    patch(state.oldTree, newTree, status);
    state.oldTree = newTree;
    if (name) {
      _components.set(_com_[name], dom);
    }
  }
}
function setData(callback, options) {
  if (getType(callback) === "function" && getType(Promise) !== "undefined") {
    return Promise.resolve()
      .then(() => {
        callback();
      })
      .then(() => {
        if (options && options.status === "useRouter") {
          unMountedHook && unMountedHook();
          state._el.innerHTML = "";
          unMountedHook = null;
          state.isMounted = false;
          const tem = transformTagFn(state._template())();
          mountNode(tem, state._el);
        } else if (options && options.name === "useCustomElement") {
          const oldTree = _components.get(
            _com_[options.customElement.id]
          ).template;
          const props = _components.get(_com_[options.customElement.id]).props;
          const newTree = useFragmentNode(
            options.customElement.template(props)
          );
          patch(oldTree, newTree, options.status);
        } else {
          const tem = transformTagFn(state._template())();

          const status = options && options.status ? options.status : null;
          mountNode(tem, null, status);
        }
        nextTickHook && nextTickHook();
      })
      .catch((err) => console.error(err));
  }
}
function defineCustomElement(options, tag) {
  class customElement extends HTMLElement {
    shadow;
    props;
    isComMounted;
    comOldTree;
    static get observedAttributes() {
      if (options.attributeChanged && options.attributeChanged.length > 0) {
        return options.attributeChanged;
      }
    }
    constructor() {
      super();
      this.shadow = null;
      this.props = Object.create(null);
      this.isComMounted = false;
      this.comOldTree = Object.create(null);
      if (options.template && options.id) {
        const t = document.createElement("template");
        t.setAttribute("id", options.id);
        const content = t.content.cloneNode(true);
        if (options.styles && Array.isArray(options.styles)) {
          const s = document.createElement("style");
          s.textContent = options.styles.join("");
          content.appendChild(s);
        }
        this.shadow = this.attachShadow({ mode: "open" });
        this.shadow.appendChild(content);
        if (!options.attributeChanged) {
          const tem = useFragmentNode(options.template());
          mount(tem, this.shadow);
          _com_[options.id] = Object.create(null);
          _components.set(_com_[options.id], {
            template: tem,
            props: null,
          });
        }
      }
    }
    // Called when the custom element is first connected to the document DOM.
    connectedCallback() {
      const arg = arguments;
      options.lifetimes &&
        typeof options.lifetimes.connectedCallback === "function" &&
        options.lifetimes.connectedCallback(arg);
    }
    // Called when a custom element is disconnected from the document DOM.
    disconnectedCallback() {
      const arg = arguments;
      options.lifetimes &&
        typeof options.lifetimes.disconnectedCallback === "function" &&
        options.lifetimes.disconnectedCallback(arg);
    }
    // Called when a custom element is moved to a new document.
    adoptedCallback() {
      const arg = arguments;
      options.lifetimes &&
        typeof options.lifetimes.adoptedCallback === "function" &&
        options.lifetimes.adoptedCallback(arg);
    }
    // Called when an attribute of a custom element is added, removed, or changed.
    attributeChangedCallback() {
      const arg = arguments;
      if (options.attributeChanged && options.attributeChanged.length > 0) {
        this.props[arg[0]] = arg[2];
        const tem = useFragmentNode(options.template(this.props));
        if (!this.isComMounted) {
          mount(tem, this.shadow);
          _com_[options.id] = Object.create(null);
          _components.set(_com_[options.id], {
            template: tem,
            props: this.props,
          });
          this.comOldTree = tem;
          this.isComMounted = true;
        } else {
          patch(this.comOldTree, tem);
          _components.set(_com_[options.id], {
            template: tem,
            props: this.props,
          });
          this.comOldTree = tem;
        }
      }
      if (options.immediateProps) {
        options.lifetimes &&
          typeof options.lifetimes.attributeChangedCallback === "function" &&
          options.lifetimes.attributeChangedCallback(arg);
      }
    }
  }
  if (typeof tag === "string" && tag.indexOf("-") !== -1) {
    customElements.define(tag, customElement);
  } else {
    console.warn(
      `[Strve warn]: [${tag}]>> please name the string with "-" as a custom element. `
    );
  }
}

const version = "6.0.0";
const state = {
  _el: null,
  _template: null,
  oldTree: null,
  isMounted: false,
  observer: null,
};
function normalizeContainer(container) {
  if (typeof container === "string") {
    const res = document.querySelector(container);
    if (!res) {
      let elem = null;
      if (container.startsWith("#")) {
        elem = document.createElement("div");
        elem.setAttribute("id", container.substring(1, container.length));
      } else if (container.startsWith(".")) {
        elem = document.createElement("div");
        elem.setAttribute("class", container.substring(1, container.length));
      } else {
        console.warn(
          `[Strve warn]: Failed to mount app: mount target selector "${container}" returned null.`
        );
      }
      document.body.insertAdjacentElement("afterbegin", elem);
      return elem;
    }
    return res;
  } else if (container instanceof HTMLElement) {
    return container;
  } else if (
    window.ShadowRoot &&
    container instanceof window.ShadowRoot &&
    container.mode === "closed"
  ) {
    console.warn(
      `[Strve warn]: mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs.`
    );
    return null;
  } else {
    return null;
  }
}
function createApp(template) {
  const app = {
    mount(el) {
      if (normalizeContainer(el)) {
        const tem = transformTagFn(template())();

        state._template = template;
        state._el = normalizeContainer(el);
        state._el && mountNode(tem, state._el);
      } else {
        console.warn("[Strve warn]: There must be a mount element node.");
      }
    },
  };
  return app;
}

const MODE_SLASH = 0;
const MODE_TEXT = 1;
const MODE_WHITESPACE = 2;
const MODE_TAGNAME = 3;
const MODE_COMMENT = 4;
const MODE_PROP_SET = 5;
const MODE_PROP_APPEND = 6;
const CHILD_APPEND = 0;
const CHILD_RECURSE = 2;
const TAG_SET = 3;
const PROPS_ASSIGN = 4;
const PROP_SET = MODE_PROP_SET;
const PROP_APPEND = MODE_PROP_APPEND;
const evaluate = (h, built, fields, args) => {
  let tmp;
  built[0] = 0;
  for (let i = 1; i < built.length; i++) {
    const type = built[i++];
    const value = built[i]
      ? ((built[0] |= type ? 1 : 2), fields[built[i++]])
      : built[++i];
    if (type === TAG_SET) {
      args[0] = value;
    } else if (type === PROPS_ASSIGN) {
      args[1] = Object.assign(args[1] || {}, value);
    } else if (type === PROP_SET) {
      (args[1] = args[1] || {})[built[++i]] = value;
    } else if (type === PROP_APPEND) {
      args[1][built[++i]] += value + "";
    } else if (type) {
      tmp = h.apply(value, evaluate(h, value, fields, ["", null]));
      args.push(tmp);
      if (value[0]) {
        built[0] |= 2;
      } else {
        built[i - 2] = CHILD_APPEND;
        built[i] = tmp;
      }
    } else {
      args.push(value);
    }
  }
  return args;
};
const build = function (statics) {
  let mode = MODE_TEXT;
  let buffer = "";
  let quote = "";
  let current = [0];
  let char, propName;
  const commit = (field) => {
    if (
      mode === MODE_TEXT &&
      (field || (buffer = buffer.replace(/^\s*\n\s*|\s*\n\s*$/g, "")))
    ) {
      current.push(CHILD_APPEND, field, buffer);
    } else if (mode === MODE_TAGNAME && (field || buffer)) {
      current.push(TAG_SET, field, buffer);
      mode = MODE_WHITESPACE;
    } else if (mode === MODE_WHITESPACE && buffer === "..." && field) {
      current.push(PROPS_ASSIGN, field, 0);
    } else if (mode === MODE_WHITESPACE && buffer && !field) {
      current.push(PROP_SET, 0, true, buffer);
    } else if (mode >= MODE_PROP_SET) {
      if (buffer || (!field && mode === MODE_PROP_SET)) {
        current.push(mode, 0, buffer, propName);
        mode = MODE_PROP_APPEND;
      }
      if (field) {
        current.push(mode, field, 0, propName);
        mode = MODE_PROP_APPEND;
      }
    }
    buffer = "";
  };
  for (let i = 0; i < statics.length; i++) {
    if (i) {
      if (mode === MODE_TEXT) {
        commit();
      }
      commit(i);
    }
    for (let j = 0; j < statics[i].length; j++) {
      char = statics[i][j];
      if (mode === MODE_TEXT) {
        if (char === "<") {
          commit();
          current = [current];
          mode = MODE_TAGNAME;
        } else {
          buffer += char;
        }
      } else if (mode === MODE_COMMENT) {
        if (buffer === "--" && char === ">") {
          mode = MODE_TEXT;
          buffer = "";
        } else {
          buffer = char + buffer[0];
        }
      } else if (quote) {
        if (char === quote) {
          quote = "";
        } else {
          buffer += char;
        }
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (char === ">") {
        commit();
        mode = MODE_TEXT;
      } else if (!mode);
      else if (char === "=") {
        mode = MODE_PROP_SET;
        propName = buffer;
        buffer = "";
      } else if (
        char === "/" &&
        (mode < MODE_PROP_SET || statics[i][j + 1] === ">")
      ) {
        commit();
        if (mode === MODE_TAGNAME) {
          current = current[0];
        }
        mode = current;
        (current = current[0]).push(CHILD_RECURSE, 0, mode);
        mode = MODE_SLASH;
      } else if (
        char === " " ||
        char === "\t" ||
        char === "\n" ||
        char === "\r"
      ) {
        commit();
        mode = MODE_WHITESPACE;
      } else {
        buffer += char;
      }
      if (mode === MODE_TAGNAME && buffer === "!--") {
        mode = MODE_COMMENT;
        current = current[0];
      }
    }
  }
  commit();
  return current;
};
const CACHES = new Map();
const regular = function (statics) {
  let tmp = CACHES.get(this);
  if (!tmp) {
    tmp = new Map();
    CACHES.set(this, tmp);
  }
  tmp = evaluate(
    this,
    tmp.get(statics) || (tmp.set(statics, (tmp = build(statics))), tmp),
    arguments,
    []
  );
  return tmp.length > 1 ? tmp : tmp[0];
};
const vnode = function (tag, props, ...children) {
  return { tag, props, children };
};
const h = regular.bind(vnode);

function parseTemplateStrParse(str) {
  let stringify = JSON.stringify,
    open = 0,
    close = 0,
    counter = 0,
    i = 0,
    length = str.length,
    chunks = i < length ? [] : ['""'],
    values = [];
  while (i < length) {
    open = str.indexOf("${", i);
    if (-1 < open) {
      chunks.push(stringify(str.slice(i, open)));
      open += 2;
      close = open;
      counter = 1;
      while (close < length) {
        switch (str.charAt(close++)) {
          case "}":
            --counter;
            break;
          case "{":
            ++counter;
            break;
        }
        if (counter < 1) {
          values.push("(" + str.slice(open, close - 1) + ")");
          break;
        }
      }
      i = close;
    } else {
      chunks.push(stringify(str.slice(i)));
      i = length;
    }
  }
  if (chunks.length === values.length) chunks.push('""');
  return { chunks: chunks, values: values };
}
let parseTemplateStrObj = {};
let parseTemplateStrFlag = 0;
function parseTemplateStr(str, object, id) {
  "use strict";
  // reset cache every 32M
  if (33554432 < parseTemplateStrFlag) {
    parseTemplateStrObj = {};
    parseTemplateStrFlag = 0;
  }

  let _ = parseTemplateStrObj,
    known = _.hasOwnProperty(str),
    parsed = known ? _[str] : (_[str] = parseTemplateStrParse(str)),
    chunks = parsed.chunks,
    values = parsed.values,
    strings;

  if (!known) parseTemplateStrFlag += str.length;
  strings = chunks.slice(0, 1);
  for (let i = 1, length = chunks.length; i < length; i++)
    strings.push(values[i - 1], chunks[i]);
  strings = ["with(this)return " + strings.join("+")];

  if (id) {
    _objDataMap.set(id, object);
  }

  return Function.apply(null, strings).apply(object, []);
}

function compilerTemplate(_tem, _data, id) {
  return parseTemplateStr.bind(this, _tem, _data, id);
}

function transformTagFn(...values) {
  const strings = [];

  values.forEach((value) => {
    strings.push(String(value));
  });
  return h.bind(this, strings);
}

// API
export {
  createApp,
  defineCustomElement,
  domInfo,
  h,
  compilerTemplate,
  nextTick,
  onMounted,
  onUnmounted,
  setData,
  version,
};
