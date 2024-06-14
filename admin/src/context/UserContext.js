// UserContext.js
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  // const [listUsers, setListUsers] = useState([]);

  // const addUser = (user) => {
  //   setUsers([...users, user]);
  //   // setListUsers([...listUsers, user]);
  // };
  const addUser = (addedUser) => {
    setUsers(addedUser);
  };
  const updateUser = (updatedUser) => {
    setUsers(updatedUser);
  };
  // console.log(users)
  return (
    <UserContext.Provider value={{ users, addUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
