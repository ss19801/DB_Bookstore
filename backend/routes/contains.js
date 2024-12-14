const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 모든 항목 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contains');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 장바구니의 항목 조회 (BasketID 기반)
router.get('/:BasketID', async (req, res) => {
  const { BasketID } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM contains WHERE BasketID = ?', [BasketID]);
    if (rows.length === 0) {
      res.status(404).json({ error: '장바구니를 찾을 수 없습니다.' });
    } else {
      res.status(200).json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 장바구니와 ISBN의 항목 조회
router.get('/:BasketID/:ISBN', async (req, res) => {
  const { BasketID, ISBN } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contains WHERE BasketID = ? AND ISBN = ?',
      [BasketID, ISBN]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: '항목을 찾을 수 없습니다.' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 항목 추가
router.post('/', async (req, res) => {
  const { BasketID, ISBN, Number } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO contains (BasketID, ISBN, Number) VALUES (?, ?, ?)',
      [BasketID, ISBN, Number]
    );
    res.status(201).json({ message: '항목이 추가되었습니다.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 항목 수정
router.put('/:BasketID/:ISBN', async (req, res) => {
  const { BasketID, ISBN } = req.params;
  const { Number } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE contains SET Number = ? WHERE BasketID = ? AND ISBN = ?',
      [Number, BasketID, ISBN]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '항목을 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '항목이 수정되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 항목 삭제
router.delete('/:BasketID/:ISBN', async (req, res) => {
  const { BasketID, ISBN } = req.params;
  try {
    const [result] = await pool.query(
      'DELETE FROM contains WHERE BasketID = ? AND ISBN = ?',
      [BasketID, ISBN]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '항목을 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '항목이 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
