import { Button, Popconfirm, Row, Table } from "antd";
import Search from "antd/es/input/Search";
import TableData from "components/Table/Table";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as EditIcon } from "../../assets/images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  deleteReview,
  listReview,
  updateReview,
} from "Redux/Actions/ReviewActions";
import Loading from "components/LoadingError/Loading";
import { toast } from "react-toastify";
const Wrapper = styled.div`
  .custom-table .ant-table-wrapper {
    background-color: var(--body-content-light-background);
  }

  .custom-table .ant-table-thead > tr > th {
    background-color: var(--body-content-light-background);
    color: white;
  }

  .custom-table .ant-table-tbody > tr > td {
    background-color: var(--body-content-light-background);
    color: white;
    border-color: darkgray;
  }

  /* .custom-table .ant-table-tbody > tr {
    background-color: black;
    color: white;
  } */

  .custom-table .ant-table-tbody > tr:hover {
    background-color: darkslategray;
  }

  .custom-table .ant-table-tbody > tr:hover td {
    color: red;
    background-color: darkslategray;
  }
  .recent-film {
    display: flex;
    justify-content: space-between !important;
    width: 100%;
    align-items: center;
    color: white !important;
    .search-input {
      margin-left: auto;
    }
  }
  .btn-users {
    width: 70px;
    height: 40px;
    margin-right: 10px;
  }
  .custom-pagination.ant-pagination {
    .ant-pagination-item {
      background-color: #fff;
    }
    .ant-pagination-item-link {
      color: #fff;
      background-color: #1890ff;
      border-color: #1890ff;
    }

    .ant-pagination-item-active {
      background-color: #1890ff;
      border-color: #1890ff;
    }

    .ant-pagination-item-active a {
      color: #fff;
    }

    .ant-pagination-disabled {
      opacity: 0.5;
    }
    .ant-pagination-total-text {
      color: #fff;
    }
  }

  /* table MUI */
  .dataTable {
  }
`;

let rows = [];
const Rating = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "movieName", headerName: "MOVIE", width: 150, editable: true },
    { field: "user", headerName: "AUTHOR", width: 150, editable: true },
    {
      field: "rating",
      headerName: "RATING",
      type: "number",
      width: 110,
      editable: true,
    },

    {
      field: "content",
      headerName: "CONTENT",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "status",
      headerName: "STATUS",
      // type: "number",
      width: 110,
      editable: true,
      renderCell: (params) => (
        <div className="action">{params.value === 1 ? "Show" : "Hide"}</div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div className="action">
          <Popconfirm
            title="Update status the task"
            description="Are you sure to update status for this rating?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              updateRow(params.row.id);
              setConfirmUpdate(false);
            }}
            onCancel={() => setConfirmUpdate(false)}
          >
            <button className="btn-edit">
              <EditIcon />
            </button>
          </Popconfirm>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this rating?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              deleteRow(params.row.id);
              setConfirmDelete(false);
            }}
            onCancel={() => setConfirmDelete(false)}
          >
            <button className="btn-delete">
              <DeleteIcon />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onSearch = (value) => console.log(value);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews } = reviewList;
  const [data, setData] = useState([]);
  const updateRow = (id) => {
    const updateRow = data.find((row) => row.id === id);
    updateRow.status = updateRow.status === 1 ? 0 : 1;
    // console.log(updateRow);
    dispatch(updateReview(updateRow))
      .then(() => {
        dispatch(listReview());
        toast.success("Review updated status successfully");
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
    // console.log(updateRow);
  };
  const deleteRow = (id) => {
    dispatch(deleteReview(id))
      .then(() => {
        dispatch(listReview());
        toast.success("Deleted review successfully");
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };
  useEffect(() => {
    dispatch(listReview())
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  }, [dispatch]);
  useEffect(() => {
    if (reviews && reviews.data) {
      const formattedData = reviews.data.map((review) => {
        return {
          content: review.content,
          id: review.id,
          movieName: review.movieName,
          rating: review.rating,
          status: review.status,
          user: review.user.username,
        };
      });

      setData(formattedData);
      console.log(formattedData);
    }
  }, [reviews]);

  return (
    <Wrapper>
      <Row>
        <div className="recent-film">
          <h1>Recently Viewed Film</h1>
          {/* <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          /> */}
        </div>
        <div style={{ display: "none" }} className="">
          {/* {error && toast.error(error)} */}
          {/* {error && <Toast />} */}
          {loading && <Loading />}
        </div>

        <TableData
          className="dataTable"
          rows={data}
          columns={columns}
          pageSize={5}
        />
      </Row>
    </Wrapper>
  );
};
export default Rating;
