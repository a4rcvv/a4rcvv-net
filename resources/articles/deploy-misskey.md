---
title: Misskeyインスタンスを立ててみた
createdDate: 2023-02-12
updatedDate: 2023-02-12
tags:
  - Misskey
  - Docker
  - Docker Compose
  - nginx
isDraft: true
---

青鳥に終わりを感じてきたので[Misskey](https://join.misskey.page/ja-JP/)のインスタンスを立ててみた．

## Misskey is 何

Mastodonなどと同様にActivityPubプロトコルを用いる分散SNSサービスの一種．超リッチなUIで好き．

## アーキテクチャ

![Architecture of Misskey server](/images/misskey-arch.drawio.png)

Web・DBサーバー1台+オブジェクトストレージ+Cloudflare CDNのよくある(?)構成．

サーバーはnginx(リバースプロキシ用)だけをホストにインストールする．その他はDockerで動かす．

### Web・DBサーバー

Misskey本体とPostgres(DB)をDockerで動かす．

また，オブジェクトストレージへのアクセスはオブジェクトストレージに直接飛ばさず，nginxのリバースプロキシを経由させる．
オブジェクトストレージを変更してもURLが変わらないので嬉しい．

### オブジェクトストレージ

添付画像などのメディアファイルはオブジェクトストレージ(Google Cloud Storage)に格納して，サーバー本体のストレージから切り離す．

### Cloudflare

無料でDNSとCDNとDDoS対策とWAFを提供してくれるすごいやつ．

CDNを利用することでサーバー負荷が低減するほか，
オブジェクトストレージへのアクセスが少なくなり，転送コストを低減することができる(転送コスト無料のストレージサービスもあるけど)．

## 手順

概ね[Ubuntu版Misskeyインストール方法詳説 | Misskey Hub](https://misskey-hub.net/docs/install/ubuntu-manual.html)に沿っている．変更した点は次のとおり．

- 全てをホストにインストールするのではなく，[Docker Composeを使ったMisskey構築 | Misskey Hub](https://misskey-hub.net/docs/install/docker.html)に沿ってDockerコンテナを利用．
- Dockerイメージをサーバー内でビルドせず，ビルド済みイメージをダウンロードして利用．
- [Nginxの設定 | Misskey Hub](https://misskey-hub.net/docs/admin/nginx.html)と[Misskeyのサーバを設置する（v11系） - noellabo's tech blog](https://blog.noellabo.jp/entry/2019/08/14/8i3RHuZ1wJNDinIn)に沿って，nginxによるリバースプロキシを追加．
- オブジェクトストレージ関連の設定を追加．

使用したサーバーはRAM2GBで，ホストOSがUbuntu22.04．スワップファイルを設定しておけばRAM1GBでも動くような気がする(未検証)．

### nginxとDockerをインストール

このあたりの記事を参考にしてインストールした．

[Ubuntu 20.04にNginxをインストールする方法 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04-ja)

[Install Docker Engine on Ubuntu | Docker Documentation](https://docs.docker.com/engine/install/ubuntu/)

### ファイアウォールを有効化

`ufw`でポートの設定を行う．

```shell
sudo ufw enable
sudo ufw default deny
sudo ufw limit 22
sudo ufw allow 80
sudo ufw allow 443
```

`sudo ufw status` で状態を確認する．
22番(SSHポート)が `LIMIT` (接続回数制限付きで開放)，80番(HTTPポート)と443番(HTTPSポート)が`ALLOW`になっていればOK．

最後に `sudo systemctl enable ufw` を実行して永続化する．

### Cloudflareの設定

事前にCloudflareのアカウントを作って，ドメインを登録しておく(説明放棄)．

#### DNSの設定

次の2つのAレコードを登録しておく．

- www → (WebサーバーのIPアドレス)
- media → (WebサーバーのIPアドレス)

`www.<ドメイン>` と `media.<ドメイン>`へのアクセスがWebサーバーに向かう．`media.<ドメイン>`へのアクセスはオブジェクトストレージに向かうように後で設定する．

#### SSLの設定

`SSL/TLS → Overview` を開き，`Full(strict)`を選択．
オリジンサーバーまでの全経路がSSL通信になる．
サーバー側にSSL証明書のインストールが必要なので，後でインストールする．

#### キャッシュの設定

`/api/*` 以外のリクエストは全てキャッシュできる([CDNの設定 | Misskey Hub](https://misskey-hub.net/docs/admin/cdn.html))ので，
Cache Rulesから設定する．

### Certbotの設定

サーバー側にLet's Encryptで入手したSSL証明書をインストールするため，Certbotを設定する．

[Misskey Hubの項目](https://misskey-hub.net/docs/install/ubuntu-manual.html#certbot-let-s-encrypt-%E3%81%AE%E8%A8%AD%E5%AE%9A)と同様なので省略．
`.pem`ファイルのパスを控えておくことを忘れずに．

### Misskeyの設定ファイルを用意

リポジトリをGitからダウンロードして設定ファイルを用意する．

```shell
git clone -b master https://github.com/misskey-dev/misskey.git --recurse-submodules
cd misskey
git checkout master
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./docker-compose.yml.example ./docker-compose.yml
```

コピーしたファイルを書き換える．

#### default.yml

- `url`: `https://www.<ドメイン>/`
- `db.db`: 任意のDB名
- `db.user`: 任意のDBユーザー名
- `db.pass`: 任意のDBパスワード

念のためにDB関連の設定値を変えておく(変えなくても動くけど)．

#### docker.env

`POSTGRES_PASSWORD`, `POSTGRES_USER`, `POSTGRES_DB`の3つを`default.yml`で設定した値に変更する．

#### docker-compose.yml

```yaml
services:
  web:
    build: .
    restart: always
```

と書いてあるところを

```yaml
services:
  web:
    image: misskey/misskey:<version>
    build: .
    restart: always
```

に変更(`<version>`の部分は使いたいバージョンの値にしておく)．
サーバーでイメージをビルドするのはしんどいので，ビルド済みイメージをpullしてくる．

### Misskeyの初期化

`sudo docker compose run --rm web pnpm run init` を実行．

### nginxの設定

`/etc/nginx/conf.d/www.(ドメイン).conf` と `/etc/nginx/conf.d/media.(ドメイン).conf`の2つのファイルを作成する．

#### /etc/nginx/conf.d/www.(ドメイン).conf

```conf

```

#### /etc/nginx/conf.d/media.(ドメイン).conf

```conf

```

#### 変更を反映

ファイル作成が終わったら`sudo nginx -t`で設定ファイルが正常な形式か確認．

大丈夫だったら`sudo systemctl restart nginx`でnginxを再起動し，`sudo systemctl status nginx`でステータスを確認する．

### Misskeyの起動

`sudo docker compose up` を実行してしばらく待てばMisskeyが立ち上がるはず．`https://www.(ドメイン)`にアクセスしてみよう．Misskeyの新規登録画面が表示されればOK．Admin用アカウントを作って設定を続ける．

### Misskeyの設定

TODO: 管理者画面の紹介

#### オブジェクトストレージ

参考としてGoogle Cloud Storageの場合の設定値を記載する．

- Base URL: `https://media.<ドメイン>`
- Bucket: GCSのバケット名
- Prefix: 適当(`media`など)
  - このディレクトリの下にメディアファイルが作成される．
- Endpoint: `storage.googleapis.com`
- Region: 空欄

Access key, Secret keyは次の手順で設定する．

1. GCSのバケットを開く．
2. `設定→相互運用性→サービスアカウントHMAC` からkeyを生成する．
3. 作成したkeyの値をコピペ．

TODO: alluserに公開する必要があるかチェック

#### メール

TODO: sendgridの設定

### その他

ほかにも設定する項目があるので，下記を参考に設定を進める．

- [Mastodonセキュリティチェックシート | 鯖缶工場wiki](https://wiki.sabakan.industries/mastodon/security-checksheet)
- [Misskeyインスタンスで最初に設定するべきインスタンス設定とその他設定の説明 | aqz/tamaina](https://hide.ac/articles/Y504SIabp)

## おわりに

Misskeyめちゃくちゃ楽しいので，もっと流行れば良いなぁと思っています．

Misskeyプロジェクトへの支援はこちらから: [syuilo | creating Misskey | Patreon](https://www.patreon.com/syuilo)
