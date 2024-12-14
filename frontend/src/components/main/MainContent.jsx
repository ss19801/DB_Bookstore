import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyButton from "../common/StartButton";
import { useNavigate } from "react-router-dom";
import { keyframes } from "styled-components";

const fadeIn1 = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const fadeIn2 = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const Style = {
  Wrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  TextArea: styled.div`
    font-family: NotoSansKR-500;
    font-size: 36px;
    line-height: 50px;
    text-align: center;
    margin: 40px 0px;
    margin-bottom: 150px;
  `,
  ButtonArea: styled.div`
    position: fixed;
    bottom: 95px;
  `,

  Sentence1: styled.div`
    opacity: 0;
    animation-name: ${fadeIn1};
    animation-duration: 3s;
    animation-fill-mode: forwards;
    margin-bottom: 50px;
  `,

  Sentence2: styled.div`
    opacity: 0;
    animation-name: ${fadeIn2};
    animation-duration: 3s;
    animation-delay: 2s;
    animation-fill-mode: forwards;
  `,

  Form: styled.form`
    width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px; /* 입력 필드 간 간격 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: white;
  `,

  Input: styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    &:focus {
      border-color: #007bff; /* 포커스 시 테두리 색상 */
    }
  `,
};

function MainContent() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (id === "admin" || id === "customer") {
      sessionStorage.setItem("id", id);
      if (id === "admin") {
        alert("환영합니다. 관리자님");
        navigate("/admin");
      } else {
        alert("환영합니다. 고객님");
        navigate("/customer")
      }
    } 
    else {
      alert("잘못된 아이디입니다.");
      window.location.reload(); // 새로고침
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // 엔터 키가 눌렸을 때 handleLogin 호출
    }
  };

  return (
    <Style.Wrapper>
      <Style.TextArea>
        <Style.Sentence1>로그인</Style.Sentence1>
        <Style.Form>
          <Style.Input type="text" placeholder="아이디" value={id} onChange={(e)=>setId(e.target.value)}/>
          <Style.Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyPress}/>
        </Style.Form>
      </Style.TextArea>
      <Style.ButtonArea onClick={handleLogin}>
        <MyButton text="로그인" />
      </Style.ButtonArea>
    </Style.Wrapper>
  );
}

export default MainContent;
