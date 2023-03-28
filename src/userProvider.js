import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  const getUserById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  };

  const getUsers = () => {
    return fetch(`http://localhost:8088/users`)
      .then((res) => res.json())
      .then(setUsers);
  };

  const updateUser = (user) => {
    return fetch(`http://localhost:8088/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(getUsers);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        getUserById,
        getUsers,
        updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
