import { createContext, useState } from "react";

const url = `http://localhost:8000`;

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);

  const getUserById = (userId) => {
    return fetch(`${url}/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  };

  const getUsers = () => {
    return fetch(`${url}/users`)
      .then((res) => res.json())
      .then(setUsers);
  };

  const updateUser = (user) => {
    return fetch(`${url}/users/${user.id}`, {
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
