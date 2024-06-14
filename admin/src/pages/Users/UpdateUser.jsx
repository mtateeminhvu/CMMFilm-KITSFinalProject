import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, DatePicker, Upload } from 'antd';
import { useParams } from 'react-router-dom';
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddUserWrapper = styled.div`
  height: 1000px;
`;

export const UpdateUser = () => {
    const location = useLocation();
    const { id } = useParams();
    // console.log(id)
  const navigate = useNavigate();
  const { updateUser } = useUserContext();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('');
  const [age, setAge] = useState('');
  
//   const [key,setKey] =useState(1);
//   console.log(location.state.data);
  
const userToUpdate = location.state.data.find((user) => user.id === parseInt(id));
  useEffect(() => {
    console.log(userToUpdate);
    setName(userToUpdate.name);
    setEmail(userToUpdate.email);
    setDob(userToUpdate.dob);
    setRole(userToUpdate.role);
    setAge(userToUpdate.age);
   
   
//    const list= listUsers.concat(location.state.data);
  }, [userToUpdate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedUser = {
        id: parseInt(id),
        name,
        email,
        dob,
        role,
        age
      };
    // console.log(updatedUser);
      // Thực hiện logic cập nhật người dùng, ví dụ sử dụng hàm updateUser từ context
      
      const dataUsers=location.state.data;
      const dataUpdateUsers=dataUsers.map((user) => {
        if (user.id === userToUpdate.id) {
          return {  ...updatedUser };
        }
        return user;
      });
        console.log(dataUpdateUsers);
      updateUser(dataUpdateUsers);
    //   console.log(listUsers);
    //   let arrayList = listUsers ?? [];
    //   console.log(arrayList)
    //   arrayList=(location.state.data).push(updatedUser);


      
    //   listUsers([...location.state.data],updatedUser);
    //   console.log(updatedUser);
    // Navigate back to the "Users" page
    navigate('/users');
  };

  return (
    <AddUserWrapper>
      <h2>Add User</h2>
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
        <Form.Item label="Full Name">
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)
          } />
        </Form.Item>
        <Form.Item label="Email">
          <Input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Role">
          <Select value={role} onChange={(value) => setRole(value)}>
            <Select.Option value="1">Admin</Select.Option>
            <Select.Option value="2">Quanly</Select.Option>
            <Select.Option value="3">NhanVien</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item value={dob} label="Day of Birth">
          <DatePicker onChange={(date) => setDob(date.format().substring(0,10))} />
        </Form.Item>
        <Form.Item  label="Age">
          <InputNumber value={age} onChange={(value) => setAge(value)} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Submit New User">
          <Button  onClick={handleSubmit}>Update</Button>
        </Form.Item>
      </Form>
    </AddUserWrapper>
  );
};
