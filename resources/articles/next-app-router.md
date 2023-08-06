---
title: Next.jsのルーティングをApp Routerに移行した
createdDate: 2023-08-06
updatedDate: 2023-08-06
tags:
- Next.js
---

このサイトで使っているNext.jsのバージョンをv13に更新し、[App Router](https://nextjs.org/docs/app)という新しいルーティングシステムに移行した。移行時に行なったことをメモしておく。

## やったこと

[Next.js公式の移行ガイド](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#migrating-from-pages-to-app)があるのでこれに従う。

### appディレクトリへの移動

`_app.tsx`の内容はルートの`layout.tsx`に、その他のファイルの内容はディレクトリごとの`page.tsx`に置く。

### metadataの設定

v12までは`next/head`の`Head`コンポーネントでメタデータを設定していたが、v13からは`Metadata`オブジェクトをexportすることでメタデータを設定する。

「ページのパスを取得してHeadコンポーネントを動的に生成する」みたいなことができない様子なのでちょっと困った。パスはある程度ハードコードしないといけないらしい。

```tsx
// 本当はやりたかったこと
export const generateMetadata = () => {
  const url = getUrl();
  return {
    openGraph: {
      url: url
    }
  }
};

// 実際の実装イメージ
export const generateMetadata = () => {
  return {
    openGraph: {
      url: "https://www.a4rcvv.net/blog"
    }
  }
};
```

### Routing Hookの改修

v12までは`next/router`の`useRouter()`を使っていたが、v13からは`next/navigation`の`useRouter()`, `usePathname()`, `useSearchParams()`を使うことになる。

v12までの`useRouter()`で取得できていた`pathname`と`query`がそれぞれ`usePathname()`, `useSearchParams()`に分離された形。

### データフェッチ周りの改修

`pages`ディレクトリでは`getServerSideProps()`と`getStaticProps()`をexportしていたが、`app`ディレクトリではこのあたりの記述を全て`Page`コンポーネントに書けるようになった。

```tsx
const Page = async ({ params }: { params: { tag: string } }) => {
  const tag = params.tag;
  const metadata = getMetadata();
  return <BlogTagView tag={tag} metadata={metadata} />;
};
```

また、`getStaticPaths()`は`generateStaticParams()`に置き換えられた。概ね同じようなAPIだが、戻り値の型が若干シンプルになっている。

```tsx
export const generateStaticParams = () => {
  const ids = getAllPostIds().filter((id) => {
    return !getArticleMetadata(id).isDraft;
  });

  return ids.map((id) => {
    return {
      id: id,
    };
  });
};
```

### MUIの設定変更

[MUIの公式ガイド](https://mui.com/material-ui/guides/next-js-app-router/#using-material-ui-with-a-custom-theme)を読むと`ThemeRegistry`を実装すれば良いらしいことが分かるので、実装を追加した。

### ビルドコマンドの変更

v12までは `next build && next export` で静的HTMLを生成していた。

v13では、`next.config.js`に`"output: export"`を追加した上で`next build`だけを実行すれば良い。

参考: [Deploying: Static Exports | Next.js](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)


## 参考リンク

- [Next.js13のApp Routerを試してみたぞ！](https://www.zenryoku-kun.com/post/nextjs-app-router)
- [Next.js 13のappディレクトリの基礎(Layout, Suspense, Data Fetching...) | アールエフェクト](https://reffect.co.jp/react/next-js-13-app/)