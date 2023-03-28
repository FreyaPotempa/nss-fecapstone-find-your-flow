import { createContext, useState } from "react";

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
    return fetch(`http://localhost:8088/poses`)
      .then((res) => res.json())
      .then(setPoses);
  };

  const getFavesByUser = (userId) => {
    return fetch(
      `http://localhost:8088/userFaves?_expand=flow&userId=${userId}`
    )
      .then((res) => res.json())
      .then(setFavesByUser);
  };

  const getFlows = () => {
    return fetch(`http://localhost:8088/flows?_expand=user`)
      .then((res) => res.json())
      .then(setFlows);
  };

  const getFlowById = (flowId) => {
    return fetch(`http://localhost:8088/flows/${flowId}?_expand=user`)
      .then((res) => res.json())
      .then(setFlow);
  };

  const updateFlow = (flow) => {
    return fetch(`http://localhost:8088/flows/${flow.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flow),
    }).then(getFlows);
  };

  const deleteFlow = (flowId) => {
    return fetch(`http://localhost:8088/flows/${flowId}`, {
      method: "DELETE",
    }).then(getFlows);
  };

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

  const getFlowsWithFaves = () => {
    return fetch(`http://localhost:8088/flows?_embed=userFaves`)
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
    return fetch(`http://localhost:8088/userFaves/${faveId}`, {
      method: "DELETE",
    });
    //.then(getFaves)
  };

  const addProgress = (newProg) => {
    return fetch(`http://localhost:8088/userProgress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProg),
    }).then((res) => res.json());
  };

  const getUserProgress = (userId) => {
    return fetch(`http://localhost:8088/userProgress?userId=${userId}`)
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
