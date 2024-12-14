// routes/book.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// 모든 책 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM book');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 책 조회
router.get('/:ISBN', async (req, res) => {
  const { ISBN } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM book WHERE ISBN = ?', [ISBN]);
    if (rows.length === 0) {
      res.status(404).json({ error: '책을 찾을 수 없습니다.' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 책 추가
router.post('/', async (req, res) => {
  const { ISBN, Title, Price, Category, Year, AuthorID } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO book (ISBN, Title, Price, Category, Year, AuthorID) VALUES (?, ?, ?, ?, ?, ?)',
      [ISBN, Title, Price, Category, Year, AuthorID]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 책 정보 수정
router.put('/:ISBN', async (req, res) => {
  const { ISBN } = req.params;
  const { Title, Price, Category, Year, AuthorID } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE book SET Title = ?, Price = ?, Category = ?, Year = ?, AuthorID = ? WHERE ISBN = ?',
      [Title, Price, Category, Year, AuthorID, ISBN]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '책을 찾을 수 없습니다.' });
    } else {
      res.json({ message: '책 정보가 수정되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 책 삭제
router.delete('/:ISBN', async (req, res) => {
  const { ISBN } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM book WHERE ISBN = ?', [ISBN]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '책을 찾을 수 없습니다.' });
    } else {
      res.json({ message: '책이 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
