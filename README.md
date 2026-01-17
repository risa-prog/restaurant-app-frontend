# フロントエンド（React） - 飲食店注文アプリ

React と TypeScript で実装されたフロントエンド部分です。  
来店客向けの注文画面や管理画面の操作を提供します。

## 前提条件

- Node.js >= 18
- npm
- バックエンド API が起動していること

## 環境構築

1. リポジトリをクローン

   ```bash
   git clone https://github.com/risa-prog/restaurant-app-frontend.git
   cd restaurant-app-frontend

   ```

2. 依存パッケージをインストール

   ```bash
   npm install

   ```

3. 開発サーバーを起動

   ```bash
   npm run dev

   ```

4. ブラウザで http://localhost:5173 にアクセス

## 主な機能

- 来店客向け注文画面 : メニュー選択・注文機能、カート機能
- 管理者向け管理画面 : 注文状況の確認、メニューの作成・編集
  
## 技術スタック

- React
- TypeScript
- Chakra UI
- React Router
- Vite

## フロントエンド / ローカルでのアクセス URL

| 画面                 | パス          | 説明                         |
| -------------------- | ------------- | ---------------------------- |
| ホーム画面（来店客） | /             | メニュー一覧・注文画面       |
| 会員登録             | /register     | 新規ユーザー登録画面(管理者) |
| 管理者 注文一覧      | /admin/orders | 管理者向け注文管理ページ     |
| 管理者 メニュー一覧  | /admin/menus  | メニュー管理                 |
