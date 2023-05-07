---
title: Next.jsでウェブサイトを作った話
createdDate: 2023-01-31
updatedDate: 2023-02-12
tags:
  - React
  - TypeScript
  - Next.js
  - Material UI
---

Next.jsでウェブサイト(すなわちこのサイト)を作った．

## モチベ

- Markdownで記事を書きたい
  - できれば記事をGitリポジトリで管理したい
- WordPressは使いたくない
  - サーバー管理やアップデートやセキュリティ周りが面倒なので
- **フロントエンドを書きたい発作が起きた**
  - 最大の理由はこれである

## 使っているもの

### React

[React](https://ja.reactjs.org/)は[Meta](https://about.meta.com/)がメンテナンスを主導しているJavaScript用のUIライブラリ．

### Next.js

[Next.js](https://nextjs.org/)は[Vercel](https://vercel.com/home)がメンテナンスを主導しているWebアプリケーションフレームワーク．
Reactの上に作られていて，ルーティングやServer Side Rendering(SSR)などの機能を提供してくれる．

### TypeScript

動的型付け言語を見るとアレルギー反応が出るので，通常のJavaScriptではなく[TypeScript](https://www.typescriptlang.org/)を使っている．
静的(漸進的)型付け最高！

### Material UI (MUI)

[MUI](https://mui.com/)はMaterial Design用のコンポーネントを提供してくれるReact用ライブラリ．
簡単に良い感じのデザインを作れるので好き．

## 仕組み

### 配信システム

WordPressだとサーバーを借りて管理しないといけないし，セキュリティ的にも色々面倒．
ということで本サイトは[Jamstack](https://jamstack.org/)を採用している．

Next.jsは，Reactのコードから静的なhtml・jsファイルを生成するStatic Site Generation (SSG)を提供している．
GitHub ActionsでSSGするCIを走らせ，できたファイルをGitHub Pagesで配信している．

2023/2/12追記: CloudflareのCDNでキャッシュしてもらうことにした．大体のファイルはGitHub PagesのサーバーじゃなくてCDNから配信されているはず．

### 記事フォーマット

ブログ記事はMarkdownで書けるようにした．
表示には[react-markdown](https://github.com/remarkjs/react-markdown)を使用している．
記事はリポジトリ内に`.md`ファイルとして保存していて，
SSGする時に記事ファイルを読み込んでいる．

ソースコードを書いたらシンタックスハイライトをつけてくれるようにしたり，MUI/Next.jsと親和性が出るようにカスタマイズしている．

```typescript
export const showExample = ()=>{
  console.log("こんな感じ");
}
```


## 参考資料

- [react-markdownでコードをシンタックスハイライトさせる | Goodlife.tech](https://goodlife.tech/posts/react-markdown-code-highlight.html)
- [Jamstackって何なの？何がいいの？ - Qiita](https://qiita.com/ozaki25/items/4075d03278d1fb51cc37)
