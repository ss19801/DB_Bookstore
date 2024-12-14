import axios from "axios";

const BASE_URL = "http://localhost:5000/api/warehouse"; // Express 서버의 warehouse API 엔드포인트

// 모든 창고 조회
export const getAllWarehouses = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("모든 창고 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 창고 조회
export const getWarehouseByCode = async (Code) => {
  try {
    const response = await axios.get(`${BASE_URL}/${Code}`);
    return response.data;
  } catch (error) {
    console.error("특정 창고 조회 중 오류 발생:", error);
    throw error;
  }
};

// 창고 추가
export const addWarehouse = async (warehouse) => {
  try {
    const response = await axios.post(BASE_URL, warehouse);
    return response.data;
  } catch (error) {
    console.error("창고 추가 중 오류 발생:", error);
    throw error;
  }
};

// 창고 수정
export const updateWarehouse = async (Code, updatedWarehouse) => {
  try {
    const response = await axios.put(`${BASE_URL}/${Code}`, updatedWarehouse);
    return response.data;
  } catch (error) {
    console.error("창고 수정 중 오류 발생:", error);
    throw error;
  }
};

// 창고 삭제
export const deleteWarehouse = async (Code) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${Code}`);
    return response.data;
  } catch (error) {
    console.error("창고 삭제 중 오류 발생:", error);
    throw error;
  }
};
