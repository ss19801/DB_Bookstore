import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Style = {
  TableContainer: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;    
  `,

  Table: styled.table`
    width: 100%;
    border-collapse: collapse;
  `,

  TableHeader: styled.thead`
    position: sticky;
    top: 0;
    background-color: pink;
    z-index: 1;
  `,

  TableHeaderCell: styled.th`
    padding: 12px;
    text-align: left;
    border-bottom: 2px solid #ddd;
  `,

  TableBody: styled.tbody`
    overflow-y: auto;
    max-height: 400px;
  `,

  TableRow: styled.tr`
    &:nth-child(even) {
      background-color: #fefefe;
    }
    &:hover {
      background-color: #f5f5f5;
    }
  `,

  TableCell: styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
  `,

  ScrollableContainer: styled.div`
    overflow-y: auto;
    max-height: calc(100% - 50px); // Subtract header height
  `,
};


function TableComponent({
  data,
  column,
  isEdit,
  isAdd,
  isDelete,
  onDataChange,
  onDeleteRows,
  onAddRow,
  resetCheckbox,
  onResetCheckboxComplete,
}) {
  const [checkedRows, setCheckedRows] = useState([]);
  const [newRow, setNewRow] = useState(() =>
    column.reduce((acc, col) => ({ ...acc, [col]: "" }), {})
  );
  
  useEffect(() => {
    if (resetCheckbox) {
      setCheckedRows([]); 
      onResetCheckboxComplete(); 
    }
  }, [resetCheckbox, onResetCheckboxComplete]);

  const handleInputChange = (rowIndex, key, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][key] = value;
    onDataChange(updatedData); 
  };

  const handleCheckboxChange = (rowIndex) => {
    setCheckedRows((prev) => {
      if (prev.includes(rowIndex)) {
        return prev.filter((index) => index !== rowIndex);
      } else {
        return [...prev, rowIndex];
      }
    });
  };

  const handleNewRowChange = (key, value) => {
    setNewRow((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddRowSubmit = () => {
    onAddRow(newRow);
    setNewRow(column.reduce((acc, col) => ({ ...acc, [col]: "" }), {}));
  };

  const handleDelete = () => {
    if (onDeleteRows && isDelete) {
      onDeleteRows(checkedRows);
      setCheckedRows([]); // 선택된 행 초기화
    }
  };  

  return (
    <Style.TableContainer>
      <Style.Table>
        <Style.TableHeader>
          <tr>
            {(isEdit || isDelete) && (
              <Style.TableHeaderCell>Select</Style.TableHeaderCell>
            )}
            {column.map((c, index) => (
              <Style.TableHeaderCell key={index}>{c}</Style.TableHeaderCell>
            ))}
          </tr>
        </Style.TableHeader>
        <Style.ScrollableContainer as="tbody">
          {data.map((item, rowIndex) => (
            <Style.TableRow key={rowIndex}>
              {(isEdit || isDelete) && (
                <Style.TableCell>
                  <input
                    type="checkbox"
                    checked={checkedRows.includes(rowIndex)}
                    onChange={() => handleCheckboxChange(rowIndex)}
                  />
                </Style.TableCell>
              )}
              {column.map((key, colIndex) => (
                <Style.TableCell key={colIndex}>
                  {isEdit && checkedRows.includes(rowIndex) ? (
                    <input
                      type="text"
                      value={item[key]}
                      onChange={(e) =>
                        handleInputChange(rowIndex, key, e.target.value)
                      }
                    />
                  ) : (
                    item[key]
                  )}
                </Style.TableCell>
              ))}
            </Style.TableRow>
          ))}
          {isAdd && (
            <Style.TableRow>
              {column.map((key, index) => (
                <Style.TableCell key={index}>
                  <input
                    type="text"
                    value={newRow[key]}
                    onChange={(e) => handleNewRowChange(key, e.target.value)}
                  />
                </Style.TableCell>
              ))}
              <Style.TableCell>
                <button onClick={handleAddRowSubmit}>추가</button>
              </Style.TableCell>
            </Style.TableRow>
          )}
        </Style.ScrollableContainer>
      </Style.Table>
      {isDelete && (
        <Style.TableContainer>
          <button onClick={handleDelete}>Delete Selected Rows</button>
        </Style.TableContainer>
      )}
    </Style.TableContainer>
  );
}

export default TableComponent;
