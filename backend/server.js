const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db.js"); // MySQL 연결

// 라우트 파일 불러오기
const reservationRoutes = require("./routes/reservation.js");
const customerRoutes = require("./routes/customer.js");
const inventoryRoutes = require("./routes/inventory.js");
const warehouseRoutes = require("./routes/warehouse.js");
const awardRoutes = require("./routes/award.js");
const containsRoutes = require("./routes/contains.js");
const shoppingBasketRoutes = require("./routes/shopping_basket.js");
const authorRoutes = require("./routes/author.js");
const bookRoutes = require("./routes/book.js");

const app = express(); // Express 앱 생성

// 미들웨어
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우트 설정
app.use("/api/reservation", reservationRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/award", awardRoutes);
app.use("/api/contains", containsRoutes);
app.use("/api/shopping_basket", shoppingBasketRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/book", bookRoutes);

// 기본 라우트
app.get("/", (req, res) => {
  res.send("API 서버가 실행 중입니다!");
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
