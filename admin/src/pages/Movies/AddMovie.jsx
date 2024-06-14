import { createGenre, listGenre } from "Redux/Actions/GenreActions";
import { createMovie } from "Redux/Actions/MovieActions";
import { GENRE_CREATE_RESET } from "Redux/Constants/GenreConstants";
import { DatePicker, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Button } from "components/Button";
import DropDown from "components/Dropdown/Dropdown";
import Input from "components/Input";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
const Wrapper = styled.div`
  padding: 20px;
  color: var(--body_color);
  background-color: var(--body-content-light-background);
  h3 {
    margin: 0 0 20px 0;
    font-size: 20px;
  }
  .ant-input-affix-wrapper textarea {
    border: 1px solid black !important;
    background-color: var(--body-dark-background);
    color: white;
  }
  /* Thay đổi màu placeholder thành màu trắng */
  .ant-input-affix-wrapper textarea::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: #888888;
  }

  .ant-input-affix-wrapper textarea::-moz-placeholder {
    /* Firefox 19+ */
    color: white;
  }

  .ant-input-affix-wrapper textarea:-ms-input-placeholder {
    /* IE 10+ */
    color: white;
  }

  .ant-input-affix-wrapper textarea:-moz-placeholder {
    /* Firefox 18- */
    color: white;
  }
  .ant-input-data-count {
    color: white;
  }
  .radio {
    color: white;
  }
  .btn-group {
    display: flex;
    margin-top: 20px;
    width: 220px;
    justify-content: space-between;
  }
  .part {
    display: flex;
    justify-content: space-between;
  }
  /* CSS tùy chỉnh cho DatePicker */
  .custom-datepicker .ant-picker {
    background-color: var(--body-dark-background);

    color: white;
    height: 40px;
    border: 1px solid black; /* Màu border là đen */
    border-radius: 4px;
  }
  .custom-datepicker .ant-picker input {
    color: white;
  }

  /* CSS tùy chỉnh cho DatePicker khi hover */
  .custom-datepicker .ant-picker:hover {
    background-color: #333; /* Màu nền khi hover (tùy chọn) */
    color: white; /* Màu chữ khi hover (tùy chọn) */
  }
  .custom-datepicker .ant-picker-suffix .ant-picker-clear,
  .custom-datepicker .ant-picker-suffix .ant-picker-icon {
    color: white;
  }
  .custom-datepicker .ant-picker-input input::placeholder {
    color: white;
  }
  .custom-datepicker .anticon-calendar svg {
    fill: white; /* Thay đổi màu của biểu tượng SVG thành màu đỏ */
  }
  .dropdown .ant-select-selector {
    width: 160px !important; /* Chiều dài của Dropdown là 200px */
    background-color: var(--body-dark-background);
    /* background-color: white; */
    color: white; /* Màu chữ là trắng */
    border: 1px solid black; /* Màu border là đen */
    height: 40px;
    display: flex;
    align-items: center;
  }
  .dropdown2 .ant-select-selector {
    width: 160px !important; /* Chiều dài của Dropdown là 200px */
    background-color: var(--body-dark-background);
    /* background-color: white; */
    color: white; /* Màu chữ là trắng */
    border: 1px solid black; /* Màu border là đen */
    height: auto;
    display: flex;
    align-items: center;
  }
  .dropdown .ant-select-arrow svg {
    transform: translateX(40px);
    margin-right: auto;
    fill: white !important;
  }
  .dropdown2 .ant-select-arrow svg {
    fill: white !important;
  }
  .dropdown2 .anticon-close svg {
    fill: white !important;
  }

  /* CSS tùy chỉnh cho giá trị mặc định */
  .dropdown .ant-select-selection-placeholder,
  .dropdown .ant-select-selection-item {
    color: white; /* Màu chữ của giá trị mặc định và giá trị đã chọn là trắng */
  }
  .dropdown2 .ant-select-selection-placeholder,
  .dropdown2 .ant-select-selection-item {
    color: white; /* Màu chữ của giá trị mặc định và giá trị đã chọn là trắng */
  }
`;
const countries = [
  { key: "US", label: "United States" },
  { key: "CA", label: "Canada" },
  { key: "GB", label: "United Kingdom" },
  // Thêm các quốc gia khác vào đây...
];
//Login
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
export const AddMovie = () => {
  const [selectedValue, setSelectedValue] = useState(1);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [movieLink, setMovieLink] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [genresPick, setGenresPick] = useState("");
  const dispatch = useDispatch();
  const genreList = useSelector((state) => state.genreList);
  const { loading, error, genres } = genreList;
  const nameRef = useRef(null); // Thêm refs cho input Name
  const descRef = useRef(null); // Thêm refs cho input Description
  const navigate = useNavigate();

  const [dataGenre, setDataGenre] = useState([]);
  // console.log(name, desc);
  const formData = {
    title: name,
    desc: desc,
    // status: selectedValue,
    movieLink: movieLink,
    movieImage: movieImage,
    duration: duration,
    price: price,
    language: country,
    releaseDate: date,
    genreId: genresPick,
  };

  useEffect(() => {
    dispatch(listGenre())
      .then((response) => {
        setDataGenre(response.data);
        console.log(response);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  }, [dispatch]);
  useEffect(() => {
    if (genres && genres.data) {
      setDataGenre(genres.data);

      console.log(genres.data);
    }
  }, [genres]);
  const handleSubmit = () => {
    // e.preventDefault();
    dispatch(createMovie(formData));
    navigate("/movie/list-movies");
    // console.log(formData);
    // alert("ok");
  };
  const handleCancel = () => {
    // e.preventDefault();
    // nameRef.current.value = "";
    // descRef.current.value = "";
    // alert("ok");
  };
  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const onChangeDatePick = (date, dateString) => {
    console.log(dateString);
    setDate(dateString);
  };
  const handleCountryChange = (selectedCountry) => {
    // console.log(selectedCountry);
    setCountry(selectedCountry);
    // Xử lý sự kiện khi chọn quốc gia ở đây
  };
  const handleGenreChange = (selectedGenre) => {
    console.log(selectedGenre);
    setGenresPick(selectedGenre);
    // Xử lý sự kiện khi chọn quốc gia ở đây
  };
  return (
    <Wrapper>
      <h3>Add Movie</h3>
      <div className="part">
        <Input
          // ref={nameRef} // Sử dụng ref cho input Name
          width={400}
          height={40}
          textColor={"#fff"}
          bgColor={"var(--body-dark-background)"}
          boderColor={"var(--body-dark-background)"}
          fontSize={16}
          borderRadius={5}
          placeholder={"Name For Movie"}
          // id={id}
          name={"name"}
          onChange={(e) => setName(e.target.value)}
          type={"text"}
          // value={value}
          style={{ marginBottom: "20px" }}
        ></Input>
        <div className="custom-datepicker">
          <DatePicker onChange={onChangeDatePick} />
        </div>
      </div>
      <div className="part">
        <Input
          // ref={nameRef} // Sử dụng ref cho input Name
          width={400}
          height={40}
          textColor={"#fff"}
          bgColor={"var(--body-dark-background)"}
          boderColor={"var(--body-dark-background)"}
          fontSize={16}
          borderRadius={5}
          placeholder={"Movie link"}
          // id={id}
          name={"movielink"}
          onChange={(e) => setMovieLink(e.target.value)}
          type={"text"}
          // value={value}
          style={{ marginBottom: "20px" }}
        ></Input>
        <Input
          // ref={nameRef} // Sử dụng ref cho input Name
          width={400}
          height={40}
          textColor={"#fff"}
          bgColor={"var(--body-dark-background)"}
          boderColor={"var(--body-dark-background)"}
          fontSize={16}
          borderRadius={5}
          placeholder={"Movie Image"}
          // id={id}
          name={"movieimage"}
          onChange={(e) => setMovieImage(e.target.value)}
          type={"text"}
          // value={value}
          style={{ marginBottom: "20px" }}
        ></Input>
      </div>
      <TextArea
        // ref={descRef} // Sử dụng ref cho input Name
        className="textarea"
        showCount
        maxLength={10000}
        style={{
          height: 200,

          marginBottom: 24,
          border: "1px solid black",
          color: "#fff",
        }}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description for the movie"
      />
      <div className="part">
        <Input
          // ref={nameRef} // Sử dụng ref cho input Name
          width={400}
          height={40}
          textColor={"#fff"}
          bgColor={"var(--body-dark-background)"}
          boderColor={"var(--body-dark-background)"}
          fontSize={16}
          borderRadius={5}
          placeholder={"Duration"}
          // id={id}
          name={"duration"}
          onChange={(e) => setDuration(e.target.value)}
          type={"number"}
          // value={value}
          style={{ marginBottom: "20px" }}
        ></Input>

        <Input
          // ref={nameRef} // Sử dụng ref cho input Name
          width={400}
          height={40}
          textColor={"#fff"}
          bgColor={"var(--body-dark-background)"}
          boderColor={"var(--body-dark-background)"}
          fontSize={16}
          borderRadius={5}
          placeholder={" Price"}
          // id={id}
          name={"price"}
          onChange={(e) => setPrice(e.target.value)}
          type={"number"}
          // value={value}
          style={{ marginBottom: "20px" }}
        ></Input>
      </div>

      <div
        className="dropdown"
        style={{ marginTop: "-20px", marginBottom: "20px" }}
      >
        <DropDown
          defaultValue={"Select Country"}
          items={countries}
          onChange={handleCountryChange}
        />
      </div>
      <div className="dropdown2" style={{ marginBottom: "20px" }}>
        <Select
          mode="multiple" // Đặt mode là "multiple" để cho phép chọn nhiều mục
          placeholder="Select Genres"
          onChange={handleGenreChange}
          style={{ width: 160 }}
        >
          {dataGenre.map((genre) => (
            <Select.Option key={genre.id} value={genre.id}>
              {genre.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <h3 style={{ marginTop: "20px" }}>Status:</h3>
      <Radio.Group onChange={handleRadioChange} value={selectedValue}>
        <Radio className="radio" value={1}>
          Enable
        </Radio>
        <Radio className="radio" value={0}>
          Disable
        </Radio>
      </Radio.Group>
      <div className="btn-group">
        <Button
          width={100}
          height={40}
          textColor={"#fff"}
          bgColor={"red"}
          // boderColor={boderColor}
          fontSize={16}
          borderRadius={5}
          type={"submit"}
          onClick={() => handleSubmit()}
          // id={id}
          // className={className}
          // borderImage={borderImage}
        >
          Add
        </Button>
        <Button
          width={100}
          height={40}
          textColor={"#000"}
          bgColor={"#fff"}
          // boderColor={boderColor}
          fontSize={16}
          borderRadius={5}
          type={"submit"}
          // id={id}
          // className={className}
          // borderImage={borderImage}
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
      </div>
    </Wrapper>
  );
};
