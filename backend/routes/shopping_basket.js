const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 모든 쇼핑 장바구니 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM shopping_basket');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 쇼핑 장바구니 조회
router.get('/:BasketID', async (req, res) => {
  const { BasketID } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM shopping_basket WHERE BasketID = ?', [BasketID]);
    if (rows.length === 0) {
      res.status(404).json({ error: '장바구니를 찾을 수 없습니다.' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 쇼핑 장바구니 추가
router.post('/', async (req, res) => {
  const { Order_date } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO shopping_basket (Order_date) VALUES (?)',
      [Order_date]
    );
    res.status(201).json({ message: '장바구니가 추가되었습니다.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 쇼핑 장바구니 수정
router.put('/:BasketID', async (req, res) => {
  const { BasketID } = req.params;
  const { Order_date } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE shopping_basket SET Order_date = ? WHERE BasketID = ?',
      [Order_date, BasketID]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '장바구니를 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '장바구니가 수정되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 쇼핑 장바구니 삭제
router.delete('/:BasketID', async (req, res) => {
  const { BasketID } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM shopping_basket WHERE BasketID = ?', [BasketID]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '장바구니를 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '장바구니가 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
