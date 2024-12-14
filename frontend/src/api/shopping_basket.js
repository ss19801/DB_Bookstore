import axios from "axios";

const BASE_URL = "http://localhost:5000/api/shopping_basket"; // Express 서버의 shopping_basket API 엔드포인트

// 모든 쇼핑 장바구니 조회
export const getAllShoppingBaskets = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("모든 쇼핑 장바구니 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 쇼핑 장바구니 조회
export const getShoppingBasketById = async (BasketID) => {
  try {
    const response = await axios.get(`${BASE_URL}/${BasketID}`);
    return response.data;
  } catch (error) {
    console.error("특정 쇼핑 장바구니 조회 중 오류 발생:", error);
    throw error;
  }
};

// 쇼핑 장바구니 추가
export const addShoppingBasket = async (shoppingBasket) => {
  try {
    const response = await axios.post(BASE_URL, shoppingBasket);
    return response.data;
  } catch (error) {
    console.error("쇼핑 장바구니 추가 중 오류 발생:", error);
    throw error;
  }
};

// 쇼핑 장바구니 수정
export const updateShoppingBasket = async (BasketID, updatedShoppingBasket) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${BasketID}`,
      updatedShoppingBasket
    );
    return response.data;
  } catch (error) {
    console.error("쇼핑 장바구니 수정 중 오류 발생:", error);
    throw error;
  }
};

// 쇼핑 장바구니 삭제
export const deleteShoppingBasket = async (BasketID) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${BasketID}`);
    return response.data;
  } catch (error) {
    console.error("쇼핑 장바구니 삭제 중 오류 발생:", error);
    throw error;
  }
};
