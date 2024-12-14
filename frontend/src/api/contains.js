import axios from "axios";

const BASE_URL = "http://localhost:5000/api/contains"; // Express 서버의 contains API 엔드포인트

// 모든 장바구니 항목 조회
export const getAllContains = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("모든 장바구니 항목 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 장바구니 항목 조회
export const getContainsByBasketAndISBN = async (BasketID, ISBN) => {
  try {
    const response = await axios.get(`${BASE_URL}/${BasketID}/${ISBN}`);
    return response.data;
  } catch (error) {
    console.error("특정 장바구니 항목 조회 중 오류 발생:", error);
    throw error;
  }
};

// 장바구니 항목 추가
export const addContains = async (contains) => {
  try {
    const response = await axios.post(BASE_URL, contains);
    return response.data;
  } catch (error) {
    console.error("장바구니 항목 추가 중 오류 발생:", error);
    throw error;
  }
};

// 장바구니 항목 수정
export const updateContains = async (BasketID, ISBN, updatedContains) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${BasketID}/${ISBN}`,
      updatedContains
    );
    return response.data;
  } catch (error) {
    console.error("장바구니 항목 수정 중 오류 발생:", error);
    throw error;
  }
};

// 장바구니 항목 삭제
export const deleteContains = async (BasketID, ISBN) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${BasketID}/${ISBN}`);
    return response.data;
  } catch (error) {
    console.error("장바구니 항목 삭제 중 오류 발생:", error);
    throw error;
  }
};
