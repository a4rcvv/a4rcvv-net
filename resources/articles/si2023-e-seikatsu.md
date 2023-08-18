---
title: インターン記【(株)いい生活編】 または私は如何にしてデザインパターンをチーム開発に導入したか
createdDate: 2023-08-18
updatedDate: 2023-08-18
tags:
- インターン
- React
- デザインパターン
isDraft: false
---

[株式会社いい生活](https://www.e-seikatsu.info)のサマーインターンに参加してきた話です。
Container/Presentationalパターンをチームに導入しようと試みた話もします。

## インターン概要

3~4人のチームで以下の技術を使ったWebアプリケーションを実装します。

- 社内API
- [React](https://ja.react.dev)
- [MUI](https://mui.com)
- [Firebase](https://firebase.google.com)
- [GitLab](https://about.gitlab.com)

## デザインパターン

### Container/Presentationalパターン

冒頭で述べたContainer/Presentationalパターンについて簡単に説明します。~~インターン中ずっとPresentation/Containerパターンって言ってた気がする~~

ほぼ[Container/Presentationalパターン再入門](https://zenn.dev/buyselltech/articles/9460c75b7cd8d1)の前半部分と同じ内容なのでそちらも参照してください。

このデザインパターンでは、コンポーネントを**Presentational Component** と **Container Component**に分けて実装します。

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
  const [text, setText] = useState("not clicked");
  const onClick = () => {
    setText("clicked");
  };
  return (
    <Presentation text={text} onClick={onClick} />
  )
}
```

### 利点

#### テストしやすい

UI部分をテストしたい場合、Presentational ComponentのPropsに適当な値を入れるだけで実現できます。

Container Componentのテストも簡易的なUIを実装すれば良いです。

#### 責任範囲が明確になる

UIはPresentational Componentだけで、ロジックはContainer Componentだけで実装しているため、責任範囲が明確です。改修もしやすくなります。

また、PresentationalとContainerでファイルが分割されるので、コンフリクトが発生しにくいです。2人がPresentationalとContainerに別れて並列実装することもできます。

あとは開発メンバーを「UI担当」「ロジック担当」に分業することもできます。
「React未経験のメンバーがいる」「開発期間3日」という条件下では、分業によって実装負荷を減らすことが有効に働くのではないかと思いました。
導入しようと思った最大の理由はこれです。


### 導入しなかったもの

Atomic Design(参考: [Atomic Design を分かったつもりになる - DeNA Design](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B))も導入するか考えましたが、以下の理由から紹介しませんでした。

- MUIがあるのでAtom部分は基本的に不要
- 開発期間3日なので開発規模が小さく、導入メリットも少ない
- その割には学習コストが大きすぎる

## 実際にやったこと

### 1日目

全チーム参加で、環境構築と使用技術に関する講義が行われました。

(時間が余り気味だったのでContainer/Presentationalパターンの説明用のドキュメントを作ったりしていました)

### 2日目

午前中は要件定義を行い、午後から実装開始です。

実装を始める前にContainer/Presentationalパターンのハンズオンを行いました。また、デザインパターンのサンプルとしてサインイン画面の実装を行いました。~~口で説明するよりも実際のコードを用意する方が分かりやすいので~~

開発チームの技術力はこんな感じでした。

- ReactとFirebaseとMUIの使用経験がある(私)
- React未経験だがデザインとCSSに強い
- Web開発初めて(2名)

ひとまず私以外の3人が1ページずつ実装を行い、私がルーティングやクエリパラメータ周辺などの詳細設計を詰めることにしました。

### 3日目

土日を挟んで実装2日目です。

詳細設計が一段落ついたので本格的に実装を始めました。私の担当した部分は以下の通りです。

- APIからのデータフェッチ部分の実装
- マージリクエストの確認
  - この時点ではContainer/Presentationalパターンに反する実装が見られたので、レビュー時にチェックしていました。

また、適宜ペアプロをしてチーム全体の開発速度を向上させました。特にGit周りの問題についてはメンターさんにも手伝っていただきました(ありがとうございます)。

この日あたりから積極的に開発速度を上げていく意識をし始めました。
進捗確認のための声がけなどを意識的に行いました。

### 4日目

実装3日目です。必死に作業しました。

最低限作るべき機能については午前中の時点で実装できる目処がついていたので、追加機能の実装を開始しました。

- 追加機能の設計、Issue作成、アサイン
  - Issueをなるべく詳細に書いたら「分かりやすい」とのお言葉をメンバーから頂きました。ありがたや...
- 追加機能用のFirestoreモデル定義・hook作成
- マージリクエストの確認
  - サインイン以外のPresentationalの実装はチームメンバーが全てやってくれました。
- データフェッチが関連するContainer Componentの実装
  - 3日目である程度実装できていたし、Presentational Componentが既に用意されていたのでそれほど時間はかかりませんでした。
  - なお、データフェッチが関わらない部分についてはメンバーの1人(React未経験！)がContainer含めて実装してくれました。すごい

終業前にこの日の作業をSlackに纏める作業があるんですが、この日のcontribution数が63になっていて纏めるのが大変でした。

### 5日目

午後に成果発表があるので、それまでに実装と発表資料を仕上げる必要がありました。

1人がPresentational Componentのデザイン修正、2人が発表資料作成、そして私が追加機能の実装の仕上げを行いました。

ローカルでは正常だったリンクが本番環境ではリンク切れしていることに発表直前に気づいて慌てて修正したりしました。本番環境もちゃんと確認しようね。

発表資料作成の後は5日間の振り返りと交流会がありました。

## 全体を通して

リーダーのポジションとして初めてチーム開発に携わりました。
フロントエンドのチーム開発自体も初めてでしたが、ちゃんと動くプロダクトを発表できたので良かったです。
とても良い経験になりました。

Container/Presentationalパターンの導入が上手くいくか正直不安でしたが、
分業による実装負荷の軽減やテストの容易さなど、導入コストを十分上回るリターンが得られたのではないかと思います。
「実践的なデザインパターンを導入したチームは初めて見た :sugosugi:」とのお言葉も頂けました。

とにかく実装に追われていて余裕が無く、開発関連以外のコミュニケーションがあまり取れなかったのが反省点です
(最低限、開発関連のコミュニケーションがしやすい空気は守れたかな...と思います)。
長期のチーム開発ではこの辺りもさらに重要になってくるんだろうなぁ...と思っています。

最後に、開発をサポートしていただいたメンターさんと社員の皆様、そして一緒に開発してくれたチームの皆様に感謝申し上げます。
