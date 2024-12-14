// src/api/book.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/book"; // Express 서버의 book API 엔드포인트

// 모든 책 조회
export const getAllBooks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("모든 책 조회 중 오류:", error);
    throw error;
  }
};

// 특정 책 조회
export const getBookByISBN = async (ISBN) => {
  try {
    const response = await axios.get(`${BASE_URL}/${ISBN}`);
    return response.data;
  } catch (error) {
    console.error("특정 책 조회 중 오류:", error);
    throw error;
  }
};

// 책 추가
export const addBook = async (book) => {
  try {
    const response = await axios.post(BASE_URL, book);
    return response.data;
  } catch (error) {
    console.error("책 추가 중 오류:", error);
    throw error;
  }
};

// 책 정보 수정
export const updateBook = async (ISBN, updatedBook) => {
  try {
    const response = await axios.put(`${BASE_URL}/${ISBN}`, updatedBook);
    return response.data;
  } catch (error) {
    console.error("책 정보 수정 중 오류:", error);
    throw error;
  }
};

// 책 삭제
export const deleteBook = async (ISBN) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${ISBN}`);
    return response.data;
  } catch (error) {
    console.error("책 삭제 중 오류:", error);
    throw error;
  }
};
