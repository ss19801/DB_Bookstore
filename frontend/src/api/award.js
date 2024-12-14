import axios from "axios";

const BASE_URL = "http://localhost:5000/api/award"; // Express 서버의 award API 엔드포인트

// 모든 상 조회
export const getAllAwards = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("모든 상 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 상 조회
export const getAwardById = async (AwardID) => {
  try {
    const response = await axios.get(`${BASE_URL}/${AwardID}`);
    return response.data;
  } catch (error) {
    console.error("특정 상 조회 중 오류 발생:", error);
    throw error;
  }
};

// 상 추가
export const addAward = async (award) => {
  try {
    const response = await axios.post(BASE_URL, award);
    return response.data;
  } catch (error) {
    console.error("상 추가 중 오류 발생:", error);
    throw error;
  }
};

// 상 수정
export const updateAward = async (AwardID, updatedAward) => {
  try {
    const response = await axios.put(`${BASE_URL}/${AwardID}`, updatedAward);
    return response.data;
  } catch (error) {
    console.error("상 수정 중 오류 발생:", error);
    throw error;
  }
};

// 상 삭제
export const deleteAward = async (AwardID) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${AwardID}`);
    return response.data;
  } catch (error) {
    console.error("상 삭제 중 오류 발생:", error);
    throw error;
  }
};
