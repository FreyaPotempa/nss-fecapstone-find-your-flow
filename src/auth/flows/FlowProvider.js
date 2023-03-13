import { createContext, useState } from "react";

export const FlowContext = createContext();

export const FlowProvider = (props) => {
  const [poses, setPoses] = useState([]);
  const [users, setUsers] = useState([]);
  const [flows, setFlows] = useState([]);
  const [flow, setFlow] = useState({})
  const [searchTerms, setSearchTerms] = useState("");

  const getPoses = () => {
    return fetch(`http://localhost:8088/poses`)
      .then((res) => res.json())
      .then(setPoses);
  };

  const getUserById = (userId) => {
    return fetch(`http://localhost:8088/users/${userId}`).then((res) =>
      res.json()
    );
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

  const getFlows = () => {
    return fetch(`http://localhost:8088/flows`)
      .then((res) => res.json())
      .then(setFlows);
  };

  const getFlowById = (flowId) => {
    return fetch(`http://localhost:8088/flows/${flowId}`)
      .then(res => res.json())
      .then(setFlow)

  }

  const deleteFlow = (flowId) => {
    return fetch(`http://localhost:8088/flows/${flowId}`, {
      method: "DELETE",
    }).then(getFlows)
  }

  const addFlow = (flowObj) => {
    return fetch(`http://localhost:8088/flows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flowObj),
    })
      .then((res) => res.json())
      .then(getFlows);
  };

  return (
    <FlowContext.Provider
      value={{
        poses,
        getPoses,
        flow,
        flows,
        getFlows,
        deleteFlow,
        getFlowById,
        getUsers,
        updateUser,
        getUserById,
        addFlow,
        setFlow,
        searchTerms,
        setSearchTerms,
        users,
      }}
    >
      {props.children}
    </FlowContext.Provider>
  );
};
