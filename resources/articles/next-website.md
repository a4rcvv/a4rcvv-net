---
title: Next.jsでウェブサイトを作った話
createdDate: 2023-01-31
updatedDate: 2023-01-31
tags:
  - React
  - TypeScript
  - Next.js
  - Material UI
---

フロントエンドを書きたい発作に駆られてウェブサイトを作った．すなわちこのサイトのことである

## 使っているもの

### React

[React](https://ja.reactjs.org/)は[Meta](https://about.meta.com/)がメンテナンスを主導しているJavaScript用のUIライブラリ．

### Next.js

[Next.js](https://nextjs.org/)は[Vercel](https://vercel.com/home)がメンテナンスを主導しているWebアプリケーションフレームワーク．
Reactの上に作られていて，ルーティングやServer Side Rendering(SSR)などの機能を提供してくれる．このサイトはStatic Site Generation(SSG)を利用している．

### TypeScript

動的型付け言語を見るとアレルギー反応が出るので，通常のJavaScriptではなく[TypeScript](https://www.typescriptlang.org/)を使っている．静的(漸進的)型付け最高！

### Material UI (MUI)

[MUI](https://mui.com/)はMaterial Design用のコンポーネントを提供してくれるReact用ライブラリ．簡単に良い感じのデザインを作れるので好き．

## 仕組み

### 配信システム

WordPressだとサーバーを借りて管理しないといけないし，セキュリティ的にも色々面倒．ということで本サイトはJamstackを採用している．

`main`ブランチにPushしたら静的なhtml・jsファイルを生成するCIが走る．サーバーはGETリクエストに対して静的ファイルを配信するだけ．

ちなみに本サイトはGithub ActionsとGithub Pagesを使っている．

### 記事フォーマット

ブログ記事はMarkdownで書けるようにした．

ソースコードを書いたらシンタックスハイライトをつけてくれるようにしたり，MUI/Next.jsと親和性が出るようにカスタマイズしている．

```typescript
export const showExample = ()=>{
  console.log("こんな感じ");
}
```

