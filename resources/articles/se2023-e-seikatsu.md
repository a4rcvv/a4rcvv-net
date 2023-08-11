---
title: インターン記【(株)いい生活編】 または私は如何にしてデザインパターンを開発チームに導入したか
createdDate: 2023-06-11
updatedDate: 2023-06-11
tags:
- インターン
- React
- デザインパターン
isDraft: true
---

[株式会社いい生活]のサマーインターンに参加してきました。





## インターン概要

3~4人のチームで以下の技術を使ったWebアプリケーションを実装します。

- 社内API
- [React](https://ja.react.dev)
- [MUI](https://mui.com)
- [Firebase](https://firebase.google.com)
- [GitLab](https://about.gitlab.com)

## デザインパターン

### Container/Presentationalパターン

冒頭で述べたContainer/Presentationalパターンについて簡単に説明します。

ほぼ[Container/Presentationalパターン再入門](https://zenn.dev/buyselltech/articles/9460c75b7cd8d1)の

このデザインパターンでは、1つのコンポーネントを**Presentational Component** と **Container Component**に分けて実装します。

#### Presentational Component

**UIだけ**に関心を持つコンポーネントです。表示するデータやボタンを押した時のコールバック関数などは、Container ComponentからProps経由で受け取ります。

自身で状態を持ったり、コールバック関数の中身を実装することはありません。API経由で表示するデータを持ってくることもありません。

```tsx
export type PresentationProps = {
  text: string;
  onClick: () => void;
}

export const Presentation = (props: PresentationProps) => {
  return (
    <Box>
      <Button onClick={props.onClick}>{props.text}</Button>
    </Box>
  );
};
```

#### Container Component

**ロジックだけ**に関心を持つコンポーネントです。こちらのコンポーネントでは状態を持ったりします。

Presentational ComponentのPropsにデータを流し込む役割を持ちます。

```tsx
export const Container = () => {
  const text = getText();
  const onClick = () => {
    console.log('clicked');
  };
  return (
    <Presentation text={text} onClick={onClick} />
  )
}
```

### 導入の理由

(多分他にも色々ありますが、本インターン)

#### テストがしやすい

#### 責任範囲が明確になる

あとは開発メンバーを「UI担当」「ロジック担当」に分業することもできます。「React未経験のメンバーがいる」「開発期間3日」という条件下では、分業によって実装負荷を減らすことが有効に働くのではないかと思いました。

#### conflictしにくい

### 導入しなかったもの

Atomic Design(参考: [Atomic Design を分かったつもりになる - DeNA Design](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B))も導入するか考えましたが、以下の理由から紹介しませんでした。

- MUIがあるのでAtom部分は基本的に不要
- 開発期間3日なので開発規模が小さく、導入メリットも少ない
- その割には学習コストが大きすぎる

## 実際にやったこと

### 1日目

### 2日目

### 3日目

### 4日目

### 5日目

## 全体を通して
