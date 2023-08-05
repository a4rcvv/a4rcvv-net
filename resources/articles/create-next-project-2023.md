---
title: Next.jsのプロジェクトを作る(2023)
createdDate: 2023-08-05
updatedDate: 2023-08-05
tags:
- Next.js
- TypeScript
---

Next.jsの環境構築の方法をいつも忘れるのでメモしておく。

## 作る環境

以下のパッケージをインストールする。

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org) (Linter)
- [Prettier](https://prettier.io) (Formatter)
- [Stylelint](https://stylelint.io) (CSS用のFormatter)
- [husky](https://typicode.github.io/husky/) (Gitのコミット前などにコマンドを実行するツール)
- [lint-staged](https://github.com/okonet/lint-staged) (stagingしたファイルに対してLintするツール)
- [Jest](https://jestjs.io/ja/) (テストツール)

## 手順

### create-next-app

プロジェクトディレクトリを作成したい階層で`npx create-next-app@latest` を実行。

質問に答えていくとNext.js + TypeScript + ESLint が設定された環境までは手に入る。

### パッケージの追加インストール

```sh
npm install --save-dev husky lint-staged stylelint stylelint-config-recommended \
prettier eslint-config-prettier @typescript-eslint/eslint-plugin@^5.0.0\
jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

`eslint-plugin`はv6系統だと依存関係を解決できない様子(参考: [eslint-config-nextのdependencyがeslint-plugin-jestとコンフリクトする](https://zenn.dev/k_hojo/scraps/11ae3f1118885a))。
そのうち`eslint-config-next`が更新されたら使えるようになると思う。


### package.jsonの設定

`scripts`の部分を置き換えて、`lint-staged`を追加する。

```json
{
	"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint --dir src",
    "lint:fix": "next lint --dir src --fix",
    "lint:css": "stylelint \"**/*.css\" --fix",
    "format": "prettier --write --ignore-path .gitignore ./**/*.{js,jsx,ts,tsx,json,css}",
    "test": "jest --passWithNoTests",
    "test:ci": "jest --ci --passWithNoTests",
    "prepare": "husky install"
  },
  ...,
  "lint-staged": {
    "*.{ts,tsx}": [
			"npm run lint:fix",
      "npm run format"
    ],
	  "*.{css,less,sass,scss}": [
      "npm run lint:css"
    ]
  }
}
```

### eslintの設定

`.eslintrc.json`を書き換える。TypeScript関連の設定などを追加する。

```json
{
  "extends": [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions":  {
    "project": "./tsconfig.json"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "root": true,
  "rules": {
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc"
        }
      }
    ]
  }
}
```

### prettierの設定

以下の内容を`.prettierrc.json`として保存。中身は好みに応じて変える

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "singleQuote": false,
  "semi": false
}
```

### huskyの設定

最初に `npm run prepare` を実行する。

以下の内容を`.husky/pre-commit`として保存。

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

コミット前に`lint-staged`による自動フォーマットが走るようになる。

### stylelintの設定

以下の内容を`.stylelintrc.json`として保存

```json
{
    "extends":["stylelint-config-recommended"]
}
```

### jestの設定

以下の内容を`jest.config.js`として保存

```js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = createJestConfig(customJestConfig);
```

## 参考リンク

- [【2022年】Next.js + TypeScript + ESLint + Prettier の構成でサクッと環境構築する](https://zenn.dev/hungry_goat/articles/b7ea123eeaaa44)
- [[2023年]Next.js + eslint周りの設定](https://zenn.dev/resistance_gowy/articles/91b4f62b9f48ec#eslint%3Arecommended)
- [Next.js 12でJestの設定がかなり楽になった](https://zenn.dev/miruoon_892/articles/e42e64fbb55137)