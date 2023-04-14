# strve-sfc.js

这个 JavaScript 库是用来开发 Strve 单文件组件。

如果你不喜欢模板字符串的书写方式，那么单文件组件将会帮助你。单文件组件将组件的 HTML 模板封装在以`.strve`结尾的文件中，可以更好地获得代码快速补全的体验（需要将其语言模式换成 HTML）。另外，JavaScript 逻辑和 CSS 样式与其分离，使得开发者可以更加方便地维护和修改组件。

请与`vite-plugin-strve`一起使用。

## 版本

最新版本为**5.1.1**。该版本将与 Strve.js 版本相同。

## 使用

在使用之前，请阅读下面的注意事项，以兼容 Strve.js。

- 事件处理

仅支持`@`缩写。另外，事件名称需要绑定命名空间，并且需要用引号包裹。如`@click="myComponent2.btn"`。

- 列表渲染

使用`join('')`去掉渲染结果页面中的多余逗号。如：

```js
${arr.map((todo) => `<li>${todo}</li>`).join('')}
```

- 条件渲染

标签使用` `` `包裹。如：

```js
${isShow ? `<p $key>Strve.js</p>` : `<null $key></null>`}
```

- 属性绑定

绑定属性时，可以不带引号，如：`value=${msg}`。

- 命名功能组件

不支持命名功能组件。

- Web Components

支持 Web Components。

- 组件模式

不支持组件模式。

- 注册组件

调用函数。如：

```js
`${C2()}`;
```

- strveRouter

不支持。

- babelPluginStrve

不支持。
