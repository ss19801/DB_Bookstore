import axios from "axios";

const BASE_URL = "http://localhost:5000/api/author"; // Express 서버의 author API 엔드포인트

// 모든 저자 조회
export const getAllAuthors = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("모든 저자 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 저자 조회
export const getAuthorById = async (AuthorID) => {
  try {
    const response = await axios.get(`${BASE_URL}/${AuthorID}`);
    return response.data;
  } catch (error) {
    console.error("특정 저자 조회 중 오류 발생:", error);
    throw error;
  }
};

// 저자 추가
export const addAuthor = async (author) => {
  try {
    const response = await axios.post(BASE_URL, author);
    return response.data;
  } catch (error) {
    console.error("저자 추가 중 오류 발생:", error);
    throw error;
  }
};

// 저자 수정
export const updateAuthor = async (AuthorID, updatedAuthor) => {
  try {
    const response = await axios.put(`${BASE_URL}/${AuthorID}`, updatedAuthor);
    return response.data;
  } catch (error) {
    console.error("저자 수정 중 오류 발생:", error);
    throw error;
  }
};

// 저자 삭제
export const deleteAuthor = async (AuthorID) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${AuthorID}`);
    return response.data;
  } catch (error) {
    console.error("저자 삭제 중 오류 발생:", error);
    throw error;
  }
};
