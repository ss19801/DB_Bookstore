const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 모든 고객 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customer');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 고객 조회
router.get('/:CustomerID', async (req, res) => {
  const { CustomerID } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM customer WHERE CustomerID = ?', [CustomerID]);
    if (rows.length === 0) {
      res.status(404).json({ error: '고객을 찾을 수 없습니다.' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 고객 추가
router.post('/', async (req, res) => {
  const { Name, Email, Phone, Address, BasketID } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO customer (Name, Email, Phone, Address, BasketID) VALUES (?, ?, ?, ?, ?)',
      [Name, Email, Phone, Address, BasketID]
    );
    res.status(201).json({ message: '고객이 추가되었습니다.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 고객 정보 수정
router.put('/:CustomerID', async (req, res) => {
  const { CustomerID } = req.params;
  const { Name, Email, Phone, Address, BasketID } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE customer SET Name = ?, Email = ?, Phone = ?, Address = ?, BasketID = ? WHERE CustomerID = ?',
      [Name, Email, Phone, Address, BasketID, CustomerID]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '고객을 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '고객 정보가 수정되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 고객 삭제
router.delete('/:CustomerID', async (req, res) => {
  const { CustomerID } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM customer WHERE CustomerID = ?', [CustomerID]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '고객을 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '고객이 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
