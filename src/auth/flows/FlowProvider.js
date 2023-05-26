import { createContext, useState } from "react";

const url = `http://localhost:8000`;

export const FlowContext = createContext();

export const FlowProvider = (props) => {
  const [poses, setPoses] = useState([]);
  const [flows, setFlows] = useState([]);
  const [flow, setFlow] = useState({});
  const [searchTerms, setSearchTerms] = useState("");
  const [favesByUser, setFavesByUser] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [flowsWithFaves, setFlowsWithFaves] = useState([]);

  const getPoses = () => {
    return fetch(`${url}/poses`)
      .then((res) => res.json())
      .then(setPoses);
  };

  const getFavesByUser = (userId) => {
    return fetch(`${url}/userFaves?_expand=flow&userId=${userId}`)
      .then((res) => res.json())
      .then(setFavesByUser);
  };

  const getFlows = () => {
    return fetch(`${url}/flows?_expand=user`)
      .then((res) => res.json())
      .then(setFlows);
  };

  const getFlowById = (flowId) => {
    return fetch(`${url}/flows/${flowId}?_expand=user`)
      .then((res) => res.json())
      .then(setFlow);
  };

  const updateFlow = (flow) => {
    return fetch(`${url}/flows/${flow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flow),
    }).then(getFlows);
  };

  const deleteFlow = (flowId) => {
    return fetch(`${url}/flows/${flowId}`, {
      method: "DELETE",
    }).then(getFlows);
  };

  const addFlow = (flowObj) => {
    return fetch(`${url}/flows`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flowObj),
    })
      .then((res) => res.json())
      .then(getFlows);
  };

  const getFlowsWithFaves = () => {
    return fetch(`${url}/flows?_embed=userFaves`)
      .then((res) => res.json())
      .then(setFlowsWithFaves);
  };

  const addFave = (faveObj) => {
    return fetch(`http://localhost:8088/userFaves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faveObj),
    }).then((res) => res.json());
  };

  const deleteFave = (faveId) => {
    return fetch(`${url}/userFaves/${faveId}`, {
      method: "DELETE",
    });
    //.then(getFaves)
  };

  const addProgress = (newProg) => {
    return fetch(`${url}/userProgress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProg),
    }).then((res) => res.json());
  };

  const getUserProgress = (userId) => {
    return fetch(`${url}/userProgress?userId=${userId}`)
      .then((res) => res.json())
      .then(setUserProgress);
  };

  return (
    <FlowContext.Provider
      value={{
        addFave,
        addProgress,
        poses,
        getPoses,
        flow,
        flows,
        favesByUser,
        getFavesByUser,
        getFlows,
        deleteFave,
        deleteFlow,
        getFlowById,
        getUserProgress,
        userProgress,
        addFlow,
        setFlow,
        searchTerms,
        setSearchTerms,
        updateFlow,
        flowsWithFaves,
        getFlowsWithFaves,
      }}
    >
      {props.children}
    </FlowContext.Provider>
  );
};
