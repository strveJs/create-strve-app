# strve-sfc.js

This JavaScript library is used to develop Strve single file components.

If you don't like the way template strings are written, the single-file component will help. Single-file components encapsulate the component's HTML template in a file ending in `.strve`, which gives you a better experience of quick code completion (requiring you to change the language mode to HTML). In addition, JavaScript logic and CSS styles are separated, making it easier for developers to maintain and modify components.

Please use it with `vite-plugin-strve`.

## Version

The latest version is **5.1.1** . This version will be the same as the Strve.js version.

## Usage

Before using, please read the following precautions to be compatible with Strve.js.

- Event Handling

Only the `@` abbreviation is supported. In addition, event names need to be bound to a namespace and wrapped in quotation marks. For example, `@click="myComponent2.btn"`.

- List Rendering

Use `join(')` to remove excess commas from the rendered result page. Such as:

```js
${arr.map((todo) => `<li>${todo}</li>`).join('')}
```

- Conditional Rendering

Label using ` `` ` package. Such as:

```js
${isShow ? `<p $key>Strve.js</p>` : `<null $key></null>`}
```

- Property Binding

Properties can be bound without quotation marks, such as: `value=${msg}`.

- Named Function Component

Do not support.

- Web Components

Support.

- Component Mode

Do not support.

- Registered Component

Call a function. Such as:

```js
`${C2()}`;
```

- strveRouter

Do not support.

- babelPluginStrve

Do not support.
