import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import TableComponent from "../common/TableComponent";
import axios from "axios"; // Axios 추가

import {  bookData,  bookColumn,  authorData,  authorColumn,  awardData, awardColumn, warehouseData, warehouseColumn, inventoryData, inventoryColumn, containsData, containsColumn} from "../../assets/arrays/table";

const Arr = ["Book", "Author", "Award", "Warehouse", "Inventory", "Contains"];

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
};

function AdminContent() {
  const [activeTable, setActiveTable] = useState("Book");
  const [activeData, setActiveData] = useState(bookData);
  const [activeColumn, setActiveColumn] = useState(bookColumn);

  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [resetCheckbox, setResetCheckbox] = useState(false);

  const handleDataChange = (updatedData) => {
    setActiveData(updatedData);
  };  
  
  const handleAddRow = (newRow) => {
    setActiveData((prevData) => [...prevData, newRow]);
  };

  const handleDeleteRows = (rowsToDelete) => {
    setActiveData((prevData) =>
      prevData.filter((_, index) => !rowsToDelete.includes(index))
    );  
    setIsDelete(false); // 삭제 모드 종료
  };  
  

  useEffect(() => {
    if (activeTable === "Book") {
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
    }
    setResetCheckbox(true);
  }, [activeTable])
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
        <TableComponent
          data={activeData}
          column={activeColumn}
          isEdit={isEdit}
          isAdd={isAdd}
          isDelete={isDelete}
          onDataChange={handleDataChange}
          onDeleteRows={handleDeleteRows}
          onAddRow={handleAddRow}
          resetCheckbox={resetCheckbox}
          onResetCheckboxComplete={() => setResetCheckbox(false)}
        />
      </Style.TableWrapper>
      <Style.ButtonWrapper>
        <Style.Button onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Stop Editing" : "Edit"}
        </Style.Button>
        <Style.Button onClick={() => setIsAdd(!isAdd)}>
          {isAdd ? "Stop Adding" : "Add"}
        </Style.Button>
        <Style.Button onClick={() => setIsDelete(!isDelete)}>
          {isDelete ? "Confirm Delete" : "Delete"}
        </Style.Button>
      </Style.ButtonWrapper>
    </Style.Wrapper>
  );
}

export default AdminContent
