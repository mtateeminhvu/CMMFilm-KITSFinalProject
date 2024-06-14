import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CheckIcon from "../../assets/images/checkmark.png";
import CancelIcon from "assets/images/cancelmark.svg";
import { Button } from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { listPack, updatePack } from "Redux/Actions/PackActions";
import { Form, Input, Modal } from "antd";

const Wrapper = styled.div`
  background-color: #191919;

  /* margin: 100px 150px; */
  .container {
    padding: 40px;
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    height: 300px;
  }
  .pack {
  }
  .none-bg {
    background-color: #191919 !important;
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto; /* Adjusted column configuration */
  grid-auto-rows: 0.5fr; /* Adjusted row configuration */
  grid-gap: 24px;
`;

const GridHead = styled.div`
  position: relative;
  background-color: #1b9aa5;
  opacity: 0.9;
  border-radius: 20px;
  padding: 20px;
  height: 120px; /* Updated height value */

  .tag {
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    height: 60px;
    width: 100px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    border-radius: 20px;
  }
  .pack-price {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .price-item {
      font-size: 30px;
      font-weight: bold;
    }
    .time-pack {
      font-size: 26px;
      font-weight: 500;
      margin-top: 20px;
    }
  }
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 20px;

  img {
    height: 40px;
    width: 40px;
  }
  .big-icon {
    height: 55px !important;
    width: 55px !important;
    margin-top: 5px;
  }

  font-size: 16px;
  font-weight: 500;
`;
const PackMovie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State for holding the pack information to be edited
  const [editedPack, setEditedPack] = useState(null);
  const dispatch = useDispatch();
  const packList = useSelector((state) => state.packList);
  const { loading, error, packs } = packList;
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(listPack())
      .then((response) => {
        setData(response.data);
        console.log(response);
      })
      .catch((error) => {
        // Handle error if necessary
      });
  }, [dispatch]);
  useEffect(() => {
    if (packs && packs.data) {
      setData(packs.data);

      console.log(packs.data);
    }
  }, [packs]);
  const handleUpdateClick = (id) => {
    const packToUpdate = data.find((pack) => pack.id === id);
    // console.log(packToUpdate);
    if (packToUpdate) {
      setEditedPack(packToUpdate);
      // console.log(editedPack);
      setIsModalVisible(true);
    }
  };

  // Function to handle form submission when the user clicks the "Update" button in the Modal
  const handleUpdateSubmit = (values) => {
    const formData = { ...values, id: editedPack.id };
    console.log("Updated Pack Information:", formData);
    dispatch(updatePack(formData))
      .then(() => {
        dispatch(listPack());
      })

      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle error if necessary
      });
    // Dispatch the updatePack action with the updated pack data
    // dispatch(updatePackAction({ ...editedPack, ...values }));
    setIsModalVisible(false);
  };
  return (
    <Wrapper>
      <div className="container">
        <GridContainer>
          {/* <GridHead id="1" className="pack">
            <div className="tag">
              <span>FREE</span>
            </div>

            <div className="pack-price">
              <span className="price-item">$0</span>
              <span className="time-pack">/ month</span>
            </div>
          </GridHead> */}

          {data.map((packageItem) => (
            <GridHead key={packageItem.id} className="pack">
              <div className="tag">
                <span>{packageItem.name}</span>
              </div>

              <div className="pack-price">
                <span className="price-item">${packageItem.price}</span>
                <span className="time-pack">/pack</span>
              </div>
              <Button
                onClick={() => handleUpdateClick(packageItem.id)}
                bgColor={"red"}
                boderColor={"red"}
                height={40}
                width={100}
                borderRadius={14}
                textColor={"white"}
                style={{
                  marginTop: "60px",
                  marginLeft: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                Update
              </Button>
            </GridHead>
          ))}
        </GridContainer>
      </div>
      <Modal
        title="Update Pack"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {editedPack && (
          <Form
            layout="vertical"
            onFinish={handleUpdateSubmit}
            initialValues={{
              name: editedPack?.name || "",
              price: editedPack?.price || "",
              // Add other form fields and set their initial values here
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter the price!" }]}
            >
              <Input type="number" />
            </Form.Item>
            {/* Add other form fields here */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
                {/* {console.log(editedPack)} */}
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </Wrapper>
  );
};
export default PackMovie;
