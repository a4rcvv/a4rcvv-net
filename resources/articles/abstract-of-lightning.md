---
title: PyTorch Lightningについて整理したい
createdDate: 2023-05-08
updatedDate: 2023-05-08
tags:
- Lightning
- PyTorch Lightning
- PyTorch
- Python
---

PyTorch Lightningを久しぶりに触ったらよく分からなくなってしまったので整理してみる．

## PyTorch Lightning is 何

PyTorchを基盤としたMLフレームワーク．

PyTorchそのままでは，データセットダウンロードや学習ループなどを1つの処理として書き連ねる必要がある．これをクラス/関数に分割することでコードを書きやすくする．

## パッケージについて整理

気づいたら似たような名前のパッケージが大量発生して訳が分からないことになっていた．初めにこれらのパッケージについて整理してみる．

- (旧)PyTorch Lightning
  - https://www.pytorchlightning.ai/index.html
  - パッケージ名は`pytorch_lightning`
  - 1.8.0リリースの時にdeprecatedになったらしい．現在も一応アップデートは続いている．
- Lightning
  - https://lightning.ai/pytorch-lightning
  - パッケージ名は`lightning`
  - 1.8.0からはこのパッケージをインストールするのが正しい．`lightning.pytorch`, `lightning.fabric`, `lightning.app` の3つのサブパッケージを持つ．
- (新)PyTorch Lightning
  - パッケージ名は`lightning.pytorch`
  - インポート方法以外は(旧)PyTorch Lightningと同じ．
- Lightning Fabric
  - https://lightning.ai/fabric
  - パッケージ名は`lightning.fabric`
  - PyTorch Lightningよりも薄めのラッパーで，素のPyTorchから最小限の変更でLightningの機能を使えるようにしたらしい．
- Lightning App
  - https://lightning.ai/lightning-apps
  - パッケージ名は`lightning.app`
  - MLアプリを作るためのフレームワークらしい．(あまりよくわかってない)

単に"Lightning"と呼ぶと"PyTorch Lightning" か "Lightning"かの区別がつかなくなってしまった．
この記事で扱うのは"PyTorch Lightning"．

("PyTorch Lightning"でググると(旧)PyTorch Lightningのページが一番上に出てくるのでつらい)

### PyTorch Lightningのインポート方法

パッケージ名が変わったので，インポート方法と推奨される別名も変わっている．

(旧)PyTorch Lightningが次の通りで，

```python
import pytorch_lightning as pl
import polars as pl # 衝突💥
```

そしてLightningは次の通り

```python
import lightning as L
import polars as pl
```

データフレームライブラリ[Polars](https://www.pola.rs/)と衝突しなくなったので少し嬉しい．

## PyTorch Lightningのコンポーネントの整理

PyTorch Lightningの主要(と思われる)コンポーネントは`LightningModule`, `LightningDataModule`, `Trainer`の3つ．
多分この3つの概要を知っておけば理解が早いはず．

### LightningModule

ドキュメント: https://lightning.ai/docs/pytorch/stable/common/lightning_module.html

`nn.Module`を継承していて，さらに

- モデル初期化(`__init__()`, `setup()`)
- 計算(`forward()`)
- 学習ループ(`training_step()`)
- バリデーションループ(`validation_step()`)
- テストループ(`test_step()`)
- 予測ループ(`predict_step()`)
- オプティマイザ・学習率スケジューラの定義(`configure_optimizer()`)

のためのメソッドを実装できるようになっている．

#### モデル初期化

`__init__()`と`setup()`でモデル定義を行ったりする．

なぜ2つあるのかについてはあまり分かってない．(`__init__()`で実装すれば十分な気がする)

#### 計算

`forward()`で実装する．作成したモデルにバッチを入れてTensorを返す．

#### 学習/バリデーション/テスト/予測ループ

それぞれ`training_step()`，`validation_step()`，`test_step()`，`predict_step()`で実装する．

`training_step()`ではミニバッチが`batch`として渡されるので，`forward()`などを用いて計算した後にlossを返す．
他のメソッドも大体同じだと思う(ちゃんと調べてない)．

### LightningDataModule

ドキュメント: https://lightning.ai/docs/pytorch/stable/data/datamodule.html

PyTorchの`Dataset`と`DataLoader`をラップするコンポーネント．それぞれのメソッドで以下の処理を行う．

- データセットのダウンロード(`setup()`)
- 学習用DataLoaderの定義(`train_dataloader()`)
- バリデーション用DataLoaderの定義(`val_dataloader()`)
- テスト用DataLoaderの定義(`test_dataloader()`)

Datasetはデータの読み込みとTensorへの変換(+Data Augmentationなど)，DataLoaderはDatasetからデータを読み込んでミニバッチにする役目のコンポーネントと覚えておくのが良さそう．

...ここまで書いて気づいたが，`LightningDataModule`は公式ドキュメントの"Core API"として紹介されていない．もしかしたらあまり推奨されてないかもしれない．
(実際，`LightningDataModule`を使わなくてもなんとかなる．)

### Trainer

ドキュメント: https://lightning.ai/docs/pytorch/stable/common/trainer.html

学習を回すためのコンポーネント．

最大エポック数やEarlyStoppingのためのコールバックなどを渡して作成し，`LightningDataModule`と`LightningModule`を`fit()`に渡せば学習を回してくれる．

```py
trainer = pl.Trainer(
    max_epochs=100,
    callbacks=[
        EarlyStopping(monitor="val_loss", patience=3), # val_lossが3回連続で更新されなければ終了
        RichProgressBar(),
        RichModelSummary(),
    ],
)
trainer.fit(compiled_model, datamodule=datamodule)
```

同様にvalidate/test用のメソッドも存在する．

また，`LightningDataModule`ではなく`DataLoader`を直接渡しても良い．（公式ドキュメントは`DataLoader`を直接渡している）
