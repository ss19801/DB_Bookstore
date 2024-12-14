import axios from "axios";

const BASE_URL = "http://localhost:5000/api/reservation"; // Express 서버의 reservation API 엔드포인트

// 모든 예약 조회
export const getAllReservations = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("모든 예약 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 예약 조회
export const getReservationById = async (ReservationID) => {
  try {
    const response = await axios.get(`${BASE_URL}/${ReservationID}`);
    return response.data;
  } catch (error) {
    console.error("특정 예약 조회 중 오류 발생:", error);
    throw error;
  }
};

// 예약 추가
export const addReservation = async (reservation) => {
  try {
    const response = await axios.post(BASE_URL, reservation);
    return response.data;
  } catch (error) {
    console.error("예약 추가 중 오류 발생:", error);
    throw error;
  }
};

// 예약 수정
export const updateReservation = async (ReservationID, updatedReservation) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${ReservationID}`,
      updatedReservation
    );
    return response.data;
  } catch (error) {
    console.error("예약 수정 중 오류 발생:", error);
    throw error;
  }
};

// 예약 삭제
export const deleteReservation = async (ReservationID) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${ReservationID}`);
    return response.data;
  } catch (error) {
    console.error("예약 삭제 중 오류 발생:", error);
    throw error;
  }
};
