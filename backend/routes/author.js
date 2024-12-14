const express = require('express');
const router = express.Router();
const pool = require('../db'); 


// 모든 저자 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM author');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 저자 조회
router.get('/:AuthorID', async (req, res) => {
  const { AuthorID } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM author WHERE AuthorID = ?', [AuthorID]);
    if (rows.length === 0) {
      res.status(404).json({ error: '저자를 찾을 수 없습니다.' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 저자 추가
router.post('/', async (req, res) => {
  const { Name, URL, Address } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO author (Name, URL, Address) VALUES (?, ?, ?)',
      [Name, URL, Address]
    );
    res.status(201).json({ message: '저자가 추가되었습니다.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 저자 정보 수정
router.put('/:AuthorID', async (req, res) => {
  const { AuthorID } = req.params;
  const { Name, URL, Address } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE author SET Name = ?, URL = ?, Address = ? WHERE AuthorID = ?',
      [Name, URL, Address, AuthorID]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '저자를 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '저자 정보가 수정되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 저자 삭제
router.delete('/:AuthorID', async (req, res) => {
  const { AuthorID } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM author WHERE AuthorID = ?', [AuthorID]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '저자를 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '저자가 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
