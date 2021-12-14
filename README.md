# 早餐店點餐 App


## [點擊進入早餐店點餐 App](https://chiuweichung.github.io/OrderApp/)

* 使用 React 框架建立之 SPA
* 使用 Redux 進行狀態管理
* 整合 Firebase Auth 以及 Google OAuth 2.0
* 建立並串接 Firebase Realtime Database

![order-app](https://github.com/ChiuWeiChung/IMGTANK/blob/main/portfolio/order-app/order-app.gif?raw=true)

> 測試時請使用公開帳密 e-mail : demo@demo.com & password : demo123

疫情當下，許多餐廳都推出了許多外送、非接觸式服務，所以建立這個 App 進行 React SPA 的練習，透過這個專案，學習到建立並串接 Firebase 的 Realtime Database 以及 Firebase Auth 的整合。並透過 `localStorage` 實現保持登入的機制。 雖然以 `localStorage` 進行維持登入機制有 XSS 的風險，但由於 React 是接收 JSX 格式，可以幫助我們跳脫 HTML 的功能 ([JSX Prevents Injection Attacks
](https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks))，所以對於 XSS 而言有 "基本" 的保護作用。

