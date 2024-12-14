const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 모든 재고 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventory');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 재고 조회 (Code와 ISBN 기반)
router.get('/:Code/:ISBN', async (req, res) => {
  const { Code, ISBN } = req.params;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM inventory WHERE Code = ? AND ISBN = ?',
      [Code, ISBN]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: '재고를 찾을 수 없습니다.' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 재고 추가
router.post('/', async (req, res) => {
  const { Code, ISBN, Number } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO inventory (Code, ISBN, Number) VALUES (?, ?, ?)',
      [Code, ISBN, Number]
    );
    res.status(201).json({ message: '재고가 추가되었습니다.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 재고 수정
router.put('/:Code/:ISBN', async (req, res) => {
  const { Code, ISBN } = req.params;
  const { Number } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE inventory SET Number = ? WHERE Code = ? AND ISBN = ?',
      [Number, Code, ISBN]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '재고를 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '재고가 수정되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 재고 삭제
router.delete('/:Code/:ISBN', async (req, res) => {
  const { Code, ISBN } = req.params;
  try {
    const [result] = await pool.query(
      'DELETE FROM inventory WHERE Code = ? AND ISBN = ?',
      [Code, ISBN]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '재고를 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '재고가 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
