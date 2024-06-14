import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Row, Table, message, Input } from "antd";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Excel from "components/Excel/Excel";
import TableData from "components/Table/Table.jsx";
import Loading from "components/LoadingError/Loading.jsx";
import Search from "antd/es/transfer/search.js";

import { ReactComponent as EditIcon } from "../../assets/images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete-icon.svg";
import { ReactComponent as VisibleIcon } from "../../assets/images/visible-status.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUser, updateUser } from "Redux/Actions/UserActions";
// import Input from "components/Input";
import DropDown from "components/Dropdown/Dropdown";
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
const Users = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "username", headerName: "USERNAME", width: 120, editable: true },
    { field: "email", headerName: "EMAIL", width: 200, editable: true },
    {
      field: "phone",
      headerName: "PHONE",
      type: "number",
      width: 130,
      editable: true,
      renderCell: (params) => (
        <div className="action">
          {params.value ? params.value : "No infornation"}
        </div>
      ),
    },

    {
      field: "gender",
      headerName: "GENDER",
      width: 90,
      editable: true,
      renderCell: (params) => (
        <div className="action">{params.value ? "Nam" : "Nữ"}</div>
      ),
    },
    {
      field: "birthday",
      headerName: "BIRTHDAY",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div className="action">{formatDate(params.value)}</div>
      ),
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
            title="Edit User"
            visible={isModalVisible}
            // onOk={handleModalOk}
            onCancel={handleModalCancel}
            maskStyle={{ background: "rgba(0, 0, 0, 0.2)" }}
            okButtonProps={{ style: { display: "none" } }}
          >
            {selectedUser && (
              <div className="modal-container">
                <div className="input-field">
                  <label>Username:</label>
                  <br />
                  <Input
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={400}
                    type="text"
                    value={selectedUser.username}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-field">
                  <label>Email:</label>
                  <br />
                  <Input
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={400}
                    type="text"
                    value={selectedUser.email}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-field">
                  <label>Phone:</label>
                  <br />
                  <Input
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={400}
                    type="text"
                    // value={}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        // email: e.target.value,
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
                        label: "Nam",
                        key: "1",
                      },
                      {
                        label: "Nữ",
                        key: "0",
                      },
                    ]}
                    label={"Gender"}
                    // defaultValue={getGenderLabel(
                    //   selectedUser && selectedUser.gender
                    // )}
                    defaultValue={selectedUser.gender ? "Nam" : "Nữ"}
                    onChange={(value) =>
                      setSelectedUser({
                        ...selectedUser,
                        gender: value === "Nam" ? true : false,
                      })
                    }
                  />
                </div>
                <div className="input-field">
                  <label>Birthday:</label>
                  <br />
                  <Input
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={400}
                    type="text"
                    value={selectedUser.birthday}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        birthday: e.target.value,
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
                    //   selectedUser && selectedUser.status
                    // )}
                    defaultValue={selectedUser.status === 1 ? "Show" : "Hide"}
                    onChange={(value) =>
                      setSelectedUser({
                        ...selectedUser,
                        status: value === "Show" ? 1 : 0,
                      })
                    }
                  />
                </div>
                <Popconfirm
                  title="Are you sure to update this user?"
                  onConfirm={() => {
                    // updateRow(params.row.id);

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
            onClick={handleEditUser.bind(null, params.row.id)}
          >
            <EditIcon />
          </button>
          {/* </Popconfirm> */}
          {/* <Popconfirm
            title="Update status the task"
            description="Are you sure to update status for this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              // updateRow(params.row.id);
              setConfirmVisible(false);
            }}
            onCancel={() => setConfirmVisible(false)}
          >
            <button className="btn-visible">
              <VisibleIcon />
            </button>
          </Popconfirm> */}
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this user?"
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
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  // const getGenderLabel = (gender) => {
  //   return gender ? "Nam" : "Nữ";
  // };
  // const getStatusLabel = (status) => {
  //   return status === 1 ? "Show" : "Hide";
  // };
  const [data, setData] = useState([]);
  const formatDate = (isoDateString) => {
    const dateObj = new Date(isoDateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  // const handleModalOk = () => {
  //   // Logic xử lý khi nhấp vào nút OK trong modal
  //   // setIsModalVisible(false);
  //   setConfirmUpdate(true);
  // };
  const handlePopconfirmOk = () => {
    if (selectedUser) {
      const updatedUser = {
        ...selectedUser,
        username: selectedUser.username,
        email: selectedUser.email,
        // phone: selectedUser.phone,
        gender: selectedUser.gender,

        birthday: formatDate(selectedUser.birthday),
        status: selectedUser.status,
      };
      console.log(updatedUser);
      // console.log(updatedUser);
      updateRow(updatedUser);
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
  const handleEditUser = useCallback(
    (id) => {
      const user = data.find((user) => user.id === id);
      setSelectedUser({ ...user });
      setIsModalVisible(true);
    },
    [data]
  );

  const updateRow = (updatedUser) => {
    dispatch(updateUser(updatedUser))
      .then(() => {
        dispatch(listUser());
        toast.success("User updated successfully");
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };

  const deleteRow = (id) => {
    dispatch(deleteUser(id))
      .then(() => {
        console.log(id);
        dispatch(listUser());
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };
  useEffect(() => {
    dispatch(listUser())
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  }, [dispatch]);
  useEffect(() => {
    if (users && users.data) {
      setData(users.data);

      console.log(users.data);
    }
  }, [users]);

  return (
    <Wrapper>
      <Row>
        <div className="recent-film">
          <h1>Users List</h1>
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

export default Users;
