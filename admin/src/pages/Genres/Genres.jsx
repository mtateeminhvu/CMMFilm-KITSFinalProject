import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Row, Table, message, Input } from "antd";
import styled from "styled-components";
import Excel from "components/Excel/Excel";
import TableData from "components/Table/Table.jsx";
import Loading from "components/LoadingError/Loading.jsx";
import { ReactComponent as EditIcon } from "../../assets/images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete-icon.svg";
import { ReactComponent as VisibleIcon } from "../../assets/images/visible-status.svg";

// import Input from "components/Input";
import DropDown from "components/Dropdown/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGenre,
  listGenre,
  updateGenre,
} from "Redux/Actions/GenreActions";
import TextArea from "antd/es/input/TextArea";
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
  .btn-genres {
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
  /* Container */
  .modal-container {
    display: flex;
    flex-direction: column;
  }

  /* Label */
  .modal-container label {
    margin-bottom: 8px;
  }

  /* Input */

  .input-field {
    display: flex;
    flex-direction: column;
  }
`;
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const Genres = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "NAME", width: 160, editable: true },

    {
      field: "desc",
      headerName: "DESCRIPTION",
      width: 400,
      editable: true,
    },

    {
      field: "countMovies",
      headerName: "MOVIE",
      width: 100,
      editable: true,
    },
    {
      field: "status",
      headerName: "STATUS",
      // type: "number",
      width: 80,
      editable: true,
      renderCell: (params) => (
        <div className="action">{params.value === 1 ? "Show" : "Hide"}</div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="action">
          {/* <Popconfirm
              title="Update status the task"
              description="Are you sure to update status for this user?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                // updateRow(params.row.id);
                setConfirmUpdate(false);
              }}
              onCancel={() => setConfirmUpdate(false)}
            > */}
          <Modal
            title="Edit Genre"
            visible={isModalVisible}
            // onOk={handleModalOk}
            onCancel={handleModalCancel}
            maskStyle={{ background: "rgba(0, 0, 0, 0.2)" }}
            okButtonProps={{ style: { display: "none" } }}
          >
            {selectedGenre && (
              <div className="modal-container">
                <div className="input-field">
                  <label>Name:</label>
                  <br />
                  <Input
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={400}
                    type="text"
                    value={selectedGenre.name}
                    onChange={(e) =>
                      setselectedGenre({
                        ...selectedGenre,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-field">
                  <label>Description:</label>
                  <br />

                  <TextArea
                    name="description"
                    maxLength={10000}
                    // style={{
                    //   height: 200,
                    //   width: 500,
                    //   marginBottom: 24,
                    //   border: "1px solid black",
                    //   color: "#000",
                    // }}
                    type="text"
                    value={selectedGenre.desc}
                    onChange={(e) =>
                      setselectedGenre({
                        ...selectedGenre,
                        desc: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-field">
                  <label>Movie:</label>
                  <br />
                  <Input
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={400}
                    type="text"
                    value={selectedGenre.countMovies}
                    onChange={(e) =>
                      setselectedGenre({
                        ...selectedGenre,
                        countMovies: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="input-field">
                  <br />
                  <DropDown
                    onClick={onClick}
                    items={[
                      {
                        label: "Show",
                        key: "1",
                      },
                      {
                        label: "Hide",
                        key: "0",
                      },
                    ]}
                    label={"Status:"}
                    // defaultValue={getStatusLabel(
                    //   selectedGenre && selectedGenre.status
                    // )}
                    defaultValue={selectedGenre.status === 1 ? "Show" : "Hide"}
                    onChange={(value) =>
                      setselectedGenre({
                        ...selectedGenre,
                        status: value === "Show" ? 1 : 0,
                      })
                    }
                  />
                </div>
                <Popconfirm
                  title="Are you sure to update this genre?"
                  onConfirm={() => {
                    updateRow(params.row.id);

                    handlePopconfirmOk();
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button style={{ marginTop: "20px" }} type="primary">
                    Update
                  </Button>
                </Popconfirm>
                {/* Các trường dữ liệu khác */}
              </div>
            )}
          </Modal>

          <button
            className="btn-edit"
            onClick={handleEditGenre.bind(null, params.row.id)}
          >
            <EditIcon />
          </button>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this genre?"
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
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGenre, setselectedGenre] = useState(null);

  const dispatch = useDispatch();
  const genreList = useSelector((state) => state.genreList);
  const { loading, error, genres } = genreList;

  const [data, setData] = useState([]);

  const handlePopconfirmOk = () => {
    if (selectedGenre) {
      const updatedgenre = {
        ...selectedGenre,
        name: selectedGenre.name,
        desc: selectedGenre.desc,
        // phone: selectedGenre.phone,
        countMovies: selectedGenre.countMovies,

        status: selectedGenre.status,
      };
      console.log(updatedgenre);
      // console.log(updatedgenre);
      updateRow(updatedgenre);
      setIsModalVisible(false);
      setConfirmUpdate(false);
    }
  };
  // const handlePopconfirmCancel = () => {
  //   // Xử lý logic khi nhấp vào Cancel trong pop-up
  //   setConfirmUpdate(false);
  // };
  const handleModalCancel = () => {
    // Logic xử lý khi nhấp vào nút Cancel hoặc nút đóng modal
    setIsModalVisible(false);
  };
  const handleEditGenre = useCallback(
    (id) => {
      const genre = data.find((genre) => genre.id === id);
      setselectedGenre({ ...genre });
      setIsModalVisible(true);
    },
    [data]
  );

  const updateRow = (updatedgenre) => {
    // console.log(updatedgenre.id);
    // toast.success("Updated genre successfully ");
    dispatch(updateGenre(updatedgenre))
      .then(() => {
        dispatch(listGenre());
      })

      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };

  const deleteRow = (id) => {
    // console.log(id);
    dispatch(deleteGenre(id))
      .then(() => {
        dispatch(listGenre());
        const dataDelete = data.find((genre) => genre.id === id);
        if (dataDelete.countMovies === 0) {
          toast.success("Deleted successfully");
        }
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };

  useEffect(() => {
    dispatch(listGenre())
      .then((response) => {
        setData(response.data);
        // console.log(response);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  }, [dispatch]);
  useEffect(() => {
    if (genres && genres.data) {
      setData(genres.data);

      // console.log(genres.data);
    }
  }, [genres]);

  return (
    <Wrapper>
      <Row>
        <div className="recent-film">
          <h1>Genre List</h1>
        </div>
        <div style={{ display: "none" }} className="">
          {/* {error && toast.error(error)} */}
          {/* {error && <Toast />} */}
          {loading && <Loading />}
        </div>

        <TableData className="dataTable" rows={data} columns={columns} />
      </Row>
    </Wrapper>
  );
};
export default Genres;
