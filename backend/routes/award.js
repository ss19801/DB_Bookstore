const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 모든 수상 내역 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM award');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 수상 내역 조회
router.get('/:AwardID', async (req, res) => {
  const { AwardID } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM award WHERE AwardID = ?', [AwardID]);
    if (rows.length === 0) {
      res.status(404).json({ error: '수상 내역을 찾을 수 없습니다.' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 수상 내역 추가
router.post('/', async (req, res) => {
  const { Name, Year, ISBN } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO award (Name, Year, ISBN) VALUES (?, ?, ?)',
      [Name, Year, ISBN]
    );
    res.status(201).json({ message: '수상 내역이 추가되었습니다.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 수상 내역 수정
router.put('/:AwardID', async (req, res) => {
  const { AwardID } = req.params;
  const { Name, Year, ISBN } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE award SET Name = ?, Year = ?, ISBN = ? WHERE AwardID = ?',
      [Name, Year, ISBN, AwardID]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '수상 내역을 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '수상 내역이 수정되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 수상 내역 삭제
router.delete('/:AwardID', async (req, res) => {
  const { AwardID } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM award WHERE AwardID = ?', [AwardID]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '수상 내역을 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '수상 내역이 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
