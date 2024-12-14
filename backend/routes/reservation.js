const express = require('express');
const router = express.Router();
const pool = require('../db'); // 상대 경로로 db.js 파일을 불러옴


// 모든 예약 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservation');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 특정 예약 조회
router.get('/:ReservationID', async (req, res) => {
  const { ReservationID } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM reservation WHERE ReservationID = ?', [ReservationID]);
    if (rows.length === 0) {
      res.status(404).json({ error: '예약을 찾을 수 없습니다.' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 예약 추가
router.post('/', async (req, res) => {
  const { CustomerID, Reservation_date, Pickup_time } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO reservation (CustomerID, Reservation_date, Pickup_time) VALUES (?, ?, ?)',
      [CustomerID, Reservation_date, Pickup_time]
    );
    res.status(201).json({ message: '예약이 추가되었습니다.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 예약 수정
router.put('/:ReservationID', async (req, res) => {
  const { ReservationID } = req.params;
  const { CustomerID, Reservation_date, Pickup_time } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE reservation SET CustomerID = ?, Reservation_date = ?, Pickup_time = ? WHERE ReservationID = ?',
      [CustomerID, Reservation_date, Pickup_time, ReservationID]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '예약을 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '예약이 수정되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 예약 삭제
router.delete('/:ReservationID', async (req, res) => {
  const { ReservationID } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM reservation WHERE ReservationID = ?', [ReservationID]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: '예약을 찾을 수 없습니다.' });
    } else {
      res.status(200).json({ message: '예약이 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
