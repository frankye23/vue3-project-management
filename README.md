<!--
 * @Author: yedaf
 * @Date: 2022-02-22 10:45:27
 * @LastEditTime: 2022-03-01 10:20:55
 * @LastEditors: your name
 * @Description: readme 文档
 * @FilePath: \apollo_backend\README.md
 * 可以输入预定的版权声明、个性签名、空行等
-->

# Vue 3 + Typescript + Vite

官方提供模板可以看[script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup).

# 其他技术栈

Antd Design Vue + vue-router + vuex + vue-i18n

- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 套用的框架和对应的文档

- [vue-vben-admin](https://vvbin.cn/next/) - 完整版中文站点
- [vue-vben-admin-gh-pages](https://anncwb.github.io/vue-vben-admin/) - 完整版 github 站点
- [vben-admin-thin-next](https://vvbin.cn/thin/next/) - 简化版中文站点
- [vben-admin-thin-gh-pages](https://anncwb.github.io/vben-admin-thin-next/) - 简化版 github 站点

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## Getting started

```bash
# clone the project
git clone https://github.com/dxpool/apollo_backend.git

# install dependencies
yarn

### install one package
yarn add ''

# serve with hot reload at localhost:8086
yarn dev
```
