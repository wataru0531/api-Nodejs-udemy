
// Express
// Node.js 上で Web アプリケーションや API を構築するための軽量で高速なフレームワーク

const express = require("express");

const app = express();
// console.log(app)
// Express アプリケーションインスタンス
// これを使って、アプリケーション全体の設定や、ルーティング、ミドルウェアの追加などを行う

// Expressアプリケーションに JSONデータを解析するためのミドルウェアを追加
// → Express アプリケーションが受け取るリクエストのボディがJSON形式である場合、
//   そのJSONデータをJavaScriptオブジェクトに変換して扱うことができる
app.use(express.json());

const customers = [
  { title: "田中", id: 1 },
  { title: "斉藤", id: 2 },
  { title: "安川", id: 3 },
  { title: "加藤", id: 4 },
  { title: "笠島", id: 5 },
];

// GET
app.get("/api/customers", (req, res) => {
  // res.send ... 自動的にオブジェクトからjson形式に変換してクライアントに返す
  res.send(customers)
});

// POST
app.post("/api/customers", (req, res) => {
  const customer = {
    title: req.body.title,
    id: customers.length + 1,
  }

  customers.push(customer);

  res.send(customer);
});

// PUT 更新
// put ... すべて置き換え。 patch ... 一部分を編集
app.put("/api/customers/:id", (req, res) => {
  // :id 動的にidが入ってくる

  const customer = customers.find((customer) => {
    return customer.id === parseInt(req.params.id); // parseInt ... 数値に置き換える
  })

  customer.title = req.body.title;

  res.send(customer);
});

// delete 削除
app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find(customer => {
    return customer.id === parseInt(req.params.id);
  });

  // indexOf ... 指定したオブジェクトのインデックスを返す
  const index = customers.indexOf(customer);
  console.log(index)
  customers.splice(index, 1); // そのインデックスから1つ削除
  
  res.send(customers);
})


const PORT = 8000;

// ローカルサーバー立ち上げ
// http://localhost:8000/
app.listen(PORT, () => console.log("サーバーが起動しました", `http://localhost:${PORT}/`));

// ルートパスにアクセス
app.get("/", (req, res) => {
  // res.send
  // → HTTP レスポンスのボディにデータを設定して送信するためのメソッド
  //   res.sendで返されたデータは、ネットーワークタブのレスポンスで確認できる
  //   このデータがJSON形式であれば、ブラウザはそのJSONデータを自動的に解釈して適切に表示される
  //   ブラウザは、受け取ったデータの種類や形式に応じて最適な方法でその内容を表示するように努める
  res.send("udemy講座を受講中")
})