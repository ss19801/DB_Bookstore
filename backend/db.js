const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost", // MySQL 호스트
  user: "root", // MySQL 사용자 이름
  password: "your_password", // MySQL 비밀번호
  database: "your_database", // 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;