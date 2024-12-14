const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 모든 창고 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM warehouse');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 창고 조회
router.get('/:Code', async (req, res) => {
  const { Code } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM warehouse WHERE Code = ?', [Code]);
    if (rows.length === 0) {
      res.status(404).json({ error: '창고를 찾을 수 없습니다.' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 창고 추가
router.post('/', async (req, res) => {
  const { Address, Phone } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO warehouse (Address, Phone) VALUES (?, ?)',
      [Address, Phone]
    );
    res.status(201).json({ message: '창고가 추가되었습니다.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 창고 정보 수정
router.put('/:Code', async (req, res) => {
  const { Code } = req.params;
  const { Address, Phone } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE warehouse SET Address = ?, Phone = ? WHERE Code = ?',
      [Address, Phone, Code]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '창고를 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '창고 정보가 수정되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 창고 삭제
router.delete('/:Code', async (req, res) => {
  const { Code } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM warehouse WHERE Code = ?', [Code]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '창고를 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '창고가 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
