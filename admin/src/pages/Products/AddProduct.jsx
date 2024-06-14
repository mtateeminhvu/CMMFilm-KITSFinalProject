import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, DatePicker, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from 'Redux/Actions/ProductActions';

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddProductWrapper = styled.div`
  height: 1000px;
`;

export const AddProduct = () => {
  // const location = useLocation();
  const navigate = useNavigate();
 
  const productList = useSelector((state) => state.productList);
  const {  products } = productList;
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const dispatch = useDispatch();
  // const [key,setKey] =useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new user object
    
    const newProduct = {
      
      title,
      price,
      description,
      discountPercentage
    };
    dispatch(createProduct({...newProduct}));
    products.push(newProduct);
    // console.log(products)
    navigate('/products');
  };
  const handleBack=(e) => {
    e.preventDefault();
    navigate('/products');
  }

  return (
    <AddProductWrapper>
      <h2>Add Product</h2>
      <Form
        // onSubmit={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Product Name">
          <Input type="text" onChange={(e) => setTitle(e.target.value)
          } />
        </Form.Item>
        <Form.Item label="Description">
         <TextArea type="text" onChange={(e) => setDescription(e.target.value)}></TextArea>
        </Form.Item>
        
       
        <Form.Item label="Price">
          <InputNumber onChange={(value) => setPrice(value)} />
        </Form.Item>
        <Form.Item label="DiscountPercentage">
          <InputNumber onChange={(value) => setDiscountPercentage(value)} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Submit New Product">
          <Button  onClick={handleSubmit}>Add</Button>
        </Form.Item>
        <Form.Item label="Cancel">
          <Button  onClick={handleBack}>Back</Button>
        </Form.Item>
      </Form>
    </AddProductWrapper>
  );
};
