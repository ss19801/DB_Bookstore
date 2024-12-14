import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TableComponent from "../common/TableComponent";
import {
  bookData,
  bookColumn,
  authorData,
  authorColumn,
  awardData,
  awardColumn,
  warehouseData,
  warehouseColumn,
  inventoryData,
  inventoryColumn,
  containsData,
  containsColumn,
  reservationData,
  reservationColumn,
  shopping_basketColumn,
  shopping_basketData
} from "../../assets/arrays/table";

const Arr = ["Search", "Reservation", "Shopping_Basket"];

const Style = {
  Wrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative; /* 상대 위치를 기준으로 자식 배치 */
  `,

  SideWrapper: styled.div`
    flex: 1; /* 너비 비율 */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Sidebar: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;
  `,
  Button: styled.button`
    width: 100px;
    height: 50px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  `,

  TableWrapper: styled.div`
    flex: 2; /* 더 넓게 설정 */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  ButtonWrapper: styled.div`
    flex: 1; /* 너비 비율 */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center; /* 세로 중앙 정렬 */
    align-items: center; /* 가로 중앙 정렬 */
  `,

  TopWrapper: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  `,
  DropdownWrapper: styled.div`

  `,
  SearchBarWrapper: styled.div`

  `,
};

function CustomerContent() {
  const [activeTable, setActiveTable] = useState("Book");
  const [activeData, setActiveData] = useState(bookData);
  const [activeColumn, setActiveColumn] = useState(bookColumn);
  const [searchText, setSearchText] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  const handleDataChange = (updatedData) => {
    setActiveData(updatedData);
  };
  
  useEffect(() => {
    if (activeTable === "Book" || activeTable === "Search") {
      setIsSearch(true);
      setActiveData(bookData);
      setActiveColumn(bookColumn);
    } else if (activeTable === "Author") {
      setActiveData(authorData);
      setActiveColumn(authorColumn);
    } else if (activeTable === "Award") {
      setActiveData(awardData);
      setActiveColumn(awardColumn);
    } else if (activeTable === "Warehouse") {
      setActiveData(warehouseData);
      setActiveColumn(warehouseColumn);
    } else if (activeTable === "Inventory") {
      setActiveData(inventoryData);
      setActiveColumn(inventoryColumn);
    } else if (activeTable === "Contains") {
      setActiveData(containsData);
      setActiveColumn(containsColumn);
    } else if(activeTable === "Reservation"){
      setActiveData(reservationData);
      setActiveColumn(reservationColumn);
    } else if (activeTable === "Shopping_Basket") {
      setActiveData(containsData);
      setActiveColumn(containsColumn);
    }
  }, [activeTable]);

  const onClickSearch = (text) => {
    // text 검색 함수
  }

  return (
    <Style.Wrapper>
      <Style.SideWrapper>
        <Style.Sidebar>
          {Arr.map((item, index) => (
            <Style.Button
              key={index}
              onClick={() => setActiveTable(item)}
              style={{
                border: activeTable === item ? "black 5px solid" : "none",
              }}
            >
              {item}
            </Style.Button>
          ))}
        </Style.Sidebar>
      </Style.SideWrapper>
      <Style.TableWrapper>
        {(activeTable === "Search" ||
          activeTable === "Book" ||
          activeTable === "Author" ||
          activeTable === "Award") && (
          <Style.TopWrapper>
            <Style.DropdownWrapper>
              <select onChange={(e) => setActiveTable(e.target.value)}>
                <option value="Book">Book</option>
                <option value="Author">Author</option>
                <option value="Award">Award</option>
              </select>
            </Style.DropdownWrapper>
            <Style.SearchBarWrapper>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button type="button" onClick={() => onClickSearch(searchText)}>
                검색
              </button>
            </Style.SearchBarWrapper>
          </Style.TopWrapper>
        )}
        <TableComponent
          data={activeData}
          column={activeColumn}
          onDataChange={handleDataChange}
          isSearch={isSearch}
        />
      </Style.TableWrapper>
      <Style.ButtonWrapper>
        {activeTable === "Search" ? (
          <Style.Button>장바구니</Style.Button>
        ) : activeTable === "Reservation" ? (
          <>
            <Style.Button>submit</Style.Button>
            <Style.Button>delete</Style.Button>
          </>
        ) : (
          <Style.Button>delete</Style.Button>
        )}
      </Style.ButtonWrapper>
    </Style.Wrapper>
  );
}

export default CustomerContent;
