import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Row, Table, message, Input } from "antd";
import styled from "styled-components";
import Excel from "components/Excel/Excel";
import TableData from "components/Table/Table.jsx";
import Loading from "components/LoadingError/Loading.jsx";
import { ReactComponent as EditIcon } from "../../assets/images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete-icon.svg";
import { ReactComponent as VisibleIcon } from "../../assets/images/visible-status.svg";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
// import Input from "components/Input";
import DropDown from "components/Dropdown/Dropdown";
import {
  deleteMovie,
  listMovie,
  updateMovie,
} from "Redux/Actions/MovieActions";
import { TextField } from "@mui/material";
import TextArea from "antd/es/input/TextArea";

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
  .btn-movies {
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
  /* Use a parent class or ID to increase specificity */
`;
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const useStyles = makeStyles((theme) => ({
  customImageCell: {
    width: 100,
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  customImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
const Movies = () => {
  const classes = useStyles();
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "movie", headerName: "MOVIE", width: 120, editable: true },
    // {
    //   field: "movieImage",
    //   headerName: "MOVIE IMAGE",
    //   height: 100,
    //   width: 250,
    //   renderCell: (params) => {
    //     const movieLink =
    //       selectedMovie?.movieLink ||
    //       "https://inkythuatso.com/uploads/thumbnails/800/2022/05/hinh-nen-dien-thoai-anime-ngau-1-25-13-00-30.jpg";
    //     return (
    //       <div className={classes.customImageCell}>
    //         <img
    //           src={movieLink}
    //           alt="Movie Image"
    //           className={classes.customImage}
    //         />
    //       </div>
    //     );
    //   },
    // },
    { field: "genreName", headerName: "GENRE", width: 120, editable: true },
    {
      field: "releaseDate",
      headerName: "RELEASEDATE",
      width: 200,
      editable: true,
    },
    { field: "duration", headerName: "DURATION", width: 100, editable: true },
    {
      field: "desc",
      headerName: "DESCRIPTION",
      width: 200,
      editable: true,
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
            title="Edit Movie"
            visible={isModalVisible}
            // onOk={handleModalOk}
            onCancel={handleModalCancel}
            maskStyle={{ background: "rgba(0, 0, 0, 0.2)" }}
            okButtonProps={{ style: { display: "none" } }}
          >
            {selectedMovie && (
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
                    value={selectedMovie.movie}
                    onChange={(e) =>
                      setselectedMovie({
                        ...selectedMovie,
                        movie: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-field">
                  <label>Genre</label>
                  <br />
                  <Input
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={300}
                    type="text"
                    value={selectedMovie.genreName}
                    onChange={(e) =>
                      setselectedMovie({
                        ...selectedMovie,
                        genreName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-field">
                  <label>Duration:</label>
                  <br />
                  <Input
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={60}
                    type="number"
                    value={selectedMovie.duration}
                    onChange={(e) =>
                      setselectedMovie({
                        ...selectedMovie,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="input-field">
                  <label>Realease Date:</label>
                  <br />
                  <Input
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={200}
                    // type="text"
                    value={selectedMovie.releaseDate.slice(0, 10)}
                    onChange={(e) =>
                      setselectedMovie({
                        ...selectedMovie,
                        releaseDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-field">
                  <label>Description:</label>
                  <br />
                  <TextArea
                    // boderColor={"#000"}
                    // height={36}
                    // borderRadius={10}
                    // width={400}
                    // type="text"
                    value={selectedMovie.desc}
                    onChange={(e) =>
                      setselectedMovie({
                        ...selectedMovie,
                        desc: e.target.value,
                      })
                    }
                  />
                </div>
                {/* <div className="input-field">
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
                    //   selectedMovie && selectedMovie.status
                    // )}
                    defaultValue={selectedMovie.status === 1 ? "Show" : "Hide"}
                    onChange={(value) =>
                      setselectedMovie({
                        ...selectedMovie,
                        status: value === "Show" ? 1 : 0,
                      })
                    }
                  />
                </div> */}
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
            onClick={handleEditMovie.bind(null, params.row.id)}
          >
            <EditIcon />
          </button>

          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this mo?"
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
  const [selectedMovie, setselectedMovie] = useState(null);

  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);
  const { loading, error, movies } = movieList;

  const [data, setData] = useState([]);

  const handlePopconfirmOk = () => {
    if (selectedMovie) {
      const updatedMovie = {
        ...selectedMovie,
        title: selectedMovie.movie,
        genreName: selectedMovie.genreName,
        duration: selectedMovie.duration,
        desc: selectedMovie.desc,
        // // phone: selectedMovie.phone,
        // gender: selectedMovie.gender,

        // birthday: selectedMovie.birthday,
        // status: selectedMovie.status,
      };
      console.log(updatedMovie);
      // console.log(updatedMovie);
      updateRow(updatedMovie);
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
  const handleEditMovie = useCallback(
    (id) => {
      const movie = data.find((movie) => movie.id === id);
      setselectedMovie({ ...movie });
      setIsModalVisible(true);
    },
    [data]
  );

  const updateRow = (updatedMovie) => {
    dispatch(updateMovie(updatedMovie))
      .then(() => dispatch(listMovie()))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };

  const deleteRow = (id) => {
    dispatch(deleteMovie(id))
      .then(() => dispatch(listMovie()))
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  };

  useEffect(() => {
    dispatch(listMovie())
      .then((response) => {
        setData(response.data);
        console.log(response);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  }, [dispatch]);
  useEffect(() => {
    if (movies && movies.data) {
      const formattedData = movies.data.map((movie) => {
        return {
          id: movie.id,
          movie: movie.title,
          desc: movie.desc,
          releaseDate: movie.releaseDate ? movie.releaseDate.slice(0, 10) : "",
          duration: movie.duration,
          genreName: movie.genreName,
          movieLink: movie.movieLink,

          status: movie.status,
          // rating: review.rating,
          // status: review.status,
          // user: review.user.username,
        };
      });
      setData(formattedData);

      console.log(formattedData);
    }

    // if (reviews && reviews.data) {

    //   setData(formattedData);
    //   console.log(formattedData);
    // }
  }, [movies]);

  return (
    <Wrapper>
      <Row>
        <div className="recent-film">
          <h1>Movies List</h1>
        </div>
        <div style={{ display: "none" }} className="">
          {/* {error && toast.error(error)} */}
          {/* {error && <Toast />} */}
          {loading && <Loading />}
        </div>

        <TableData
          id="custom-data-grid"
          className="dataTable"
          rows={data}
          columns={columns}
        />
      </Row>
    </Wrapper>
  );
};
export default Movies;
