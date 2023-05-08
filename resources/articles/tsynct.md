---
title: 時間割アプリを作ってみた話
createdDate: 2023-05-07
updatedDate: 2023-05-07
tags:
  - TypeScript
  - Material UI
  - Next.js
  - Firebase
isDraft: false
---

Webアプリ実装の練習として[TSynct](https://tsynct.a4rcvv.net/)という時間割管理アプリを作ってみた．

## 機能

### 授業管理

![Class](/images/tsynct-class.jpeg)

授業ごとに以下の項目を保存することができる．

- クラス名
- 担任
- 教室
- メモ
- 表示色

### 時間割管理

![TimeTable](/images/tsynct-timetable.jpeg)

1コマごとに授業を選択して一覧表示できる．授業に設定した表示色を使ってくれるので分かりやすい(本当？)．

## 中身

### フロントエンド

React, Next.js, TypeScript, Material UIといったライブラリは[このWebサイトの構成](blog/entry/next-website)と同じ．さらにSWRというライブラリを追加した．

#### SWR

データフェッチ用のライブラリとして[SWR](https://swr.vercel.app/ja)を利用している．

```typescript
const UserProfile = (props: UserProfileProps) => {
  const {data, error, isLoading} = useSWR("/api/user", fetcher)
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  return <div>Hello, {data.name}</div>
}
```

こんな感じで`useSWR()` hookを利用することで，データ(`data`)とデータ取得状態(`isLoading`)とエラー状態(`error`)を一括して取得することができる．
ついでにローカルへのデータキャッシュも行ってくれる．

axiosやら何やらで細かく書く必要のある部分をスキップできるので嬉しい．また，データ取得だけでなく保存(POST/PUTリクエストなど)にも対応している．

参考: [SWRを使おうぜという話2022](https://zenn.dev/mast1ff/articles/5b48a87242f9f0)

### バックエンド

バックエンドは[Firebase](https://firebase.google.com/?hl=ja)を使っている．

#### Cloud Functions for Firebase

GCPのCloud FunctionsにFirebaseとの連携機能がついた物．バックグラウンドで行うバッチ処理を関数化して実行している．

#### Firebase Authentication

認証機能を提供してくれるサービス．これでGoogleログインの機能を実装している．

#### Firestore Database

NoSQL系のデータベースサービス．[そこそこ大きめの無料枠](https://firebase.google.com/docs/firestore/quotas?hl=ja#free-quota)があるので嬉しい．

Authenticationと連携してアクセス制御してくれたり，Firestoreの変更をトリガーにしてFunctionを呼び出してくれる．

(本当はPostgreSQLを使ってみたいけど，サーバーの維持コストが嵩むので断念した．[Cloud SQL](https://cloud.google.com/sql?hl=ja)に無料枠があったら嬉しいんですが...)

#### Firebase Hosting

せっかくなので(?)GitHub Pagesの代わりにFirebase Hostingを使った．

利点としてはデプロイが楽になったことが挙げられる．
`firebase deploy`コマンド1回で，Cloud Functionの関数もFirestoreのルールもFirebase Hostingで配信する静的ファイルも全てデプロイしてくれる．便利すぎか？？

## 今後の予定

だいぶ即興で作ってしまったので，時間がある時に完成度を上げていきたい．~~時間あるかなぁ~~

- UI/UX改善
  - ダークテーマを導入したい．
  - 実際に使ってみたらUXが微妙な部分があったので修正したい．
- Googleサービスとの連携
  - 今のところGoogle Classroomからのクラスデータインポート，Google Calenderへのエクスポートを考えている．
- PWA対応
  - スマホで見る場合はアプリがあったほうが嬉しそう．
  - `next-pwa`を使えばできそうな気がする(参考: [Next.js環境でのPWA(Progressive Web App)の導入手順](https://zenn.dev/tns_00/articles/next-pwa-install#next-pwa%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB))

来年の4月になったらもう少し真面目に宣伝したいですね．