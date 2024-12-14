import axios from "axios";

const BASE_URL = "http://localhost:5000/api/customer"; // Express 서버의 customer API 엔드포인트

// 모든 고객 조회
export const getAllCustomers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("모든 고객 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 고객 조회
export const getCustomerById = async (CustomerID) => {
  try {
    const response = await axios.get(`${BASE_URL}/${CustomerID}`);
    return response.data;
  } catch (error) {
    console.error("특정 고객 조회 중 오류 발생:", error);
    throw error;
  }
};

// 고객 추가
export const addCustomer = async (customer) => {
  try {
    const response = await axios.post(BASE_URL, customer);
    return response.data;
  } catch (error) {
    console.error("고객 추가 중 오류 발생:", error);
    throw error;
  }
};

// 고객 수정
export const updateCustomer = async (CustomerID, updatedCustomer) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${CustomerID}`,
      updatedCustomer
    );
    return response.data;
  } catch (error) {
    console.error("고객 수정 중 오류 발생:", error);
    throw error;
  }
};

// 고객 삭제
export const deleteCustomer = async (CustomerID) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${CustomerID}`);
    return response.data;
  } catch (error) {
    console.error("고객 삭제 중 오류 발생:", error);
    throw error;
  }
};
