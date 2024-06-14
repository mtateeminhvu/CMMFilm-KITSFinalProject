import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import styled from "styled-components";
import { ReactComponent as EditIcon } from "../../assets/images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete-icon.svg";

const Wrapper = styled.div`
  .dataGrid {
    background: var(--body-content-light-background);
    color: #fff;
    padding: 20px;
    input::placeholder {
      color: #fff; // Set the placeholder color to white
    }
    input {
      color: #fff;
    }
    .MuiDataGrid-toolbarContainer {
      flex-direction: row-reverse;
    }

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .MuiToolbar-root {
      color: #fff; // Set the color of text in the toolbar to white
    }

    .MuiSvgIcon-root {
      fill: #fff; // Set the fill color of SVG icons to white
    }
    .MuiInputBase-adornedStart,
    .MuiInputBase-adornedEnd,
    .MuiDataGrid-checkboxInput,
    .MuiDataGrid-columnHeaderTitleContainer {
      svg {
        fill: #fff;
      }
    }
    .action {
      display: flex;
      gap: 15px;
      .btn-edit svg {
        fill: green;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      .btn-visible svg {
        fill: blue;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      .btn-delete svg {
        fill: red;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      button {
        margin: 0;
        padding: 10px 15px;
        border: none;
        background: transparent;
      }
      /* img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      } */
    }
  }
`;

const CustomPagination = (props) => {
  const { paginationProps, totalRowCount, setPageSize, onPageChange } = props;
  const { pageSize, rowCount } = paginationProps;

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    onPageChange(0, newSize);
  };

  return (
    <div>
      <span>Rows per page:</span>
      <select value={pageSize} onChange={handlePageSizeChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <span>{`Total Rows: ${totalRowCount}`}</span>
    </div>
  );
};
const TableData = ({ rows, columns }) => {
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(5); // Initialize the page size

  useEffect(() => {
    // Set the total row count when the rows change
    setTotalRowCount(rows.length);
  }, [rows]);
  const handlePageChange = (page, newPageSize) => {
    setPageSize(newPageSize);
    // Add your logic to handle page change here if needed
  };
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Wrapper>
        <DataGrid
          className="dataGrid"
          rows={rows}
          columns={columns}
          pagination
          pageSize={5}
          checkboxSelection
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
          onPageChange={handlePageChange}
          components={{
            Toolbar: GridToolbar,
            Pagination: (paginationProps) => (
              <CustomPagination
                paginationProps={paginationProps}
                totalRowCount={totalRowCount}
                setPageSize={setPageSize}
                onPageChange={handlePageChange} // Pass the onPageChange function
              />
            ),
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Wrapper>
    </Box>
  );
};

export default TableData;
