import axios from "axios";

const BASE_URL = "http://localhost:5000/api/inventory"; // Express 서버의 inventory API 엔드포인트

// 모든 재고 조회
export const getAllInventories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("모든 재고 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 창고와 ISBN의 재고 조회
export const getInventoryByCodeAndISBN = async (Code, ISBN) => {
  try {
    const response = await axios.get(`${BASE_URL}/${Code}/${ISBN}`);
    return response.data;
  } catch (error) {
    console.error("특정 재고 조회 중 오류 발생:", error);
    throw error;
  }
};

// 재고 추가
export const addInventory = async (inventory) => {
  try {
    const response = await axios.post(BASE_URL, inventory);
    return response.data;
  } catch (error) {
    console.error("재고 추가 중 오류 발생:", error);
    throw error;
  }
};

// 재고 수정
export const updateInventory = async (Code, ISBN, updatedInventory) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${Code}/${ISBN}`,
      updatedInventory
    );
    return response.data;
  } catch (error) {
    console.error("재고 수정 중 오류 발생:", error);
    throw error;
  }
};

// 재고 삭제
export const deleteInventory = async (Code, ISBN) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${Code}/${ISBN}`);
    return response.data;
  } catch (error) {
    console.error("재고 삭제 중 오류 발생:", error);
    throw error;
  }
};
