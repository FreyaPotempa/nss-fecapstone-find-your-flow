import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FlowContext } from "./FlowProvider";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 175px;
`;

export const PoseStatic = ({ pose }) => {
  const { flows, getFlows } = useContext(FlowContext)
  const [poseWithFlows, setPosewithFlows ] = useState([])

  useEffect(() => {
    getFlows()
  },[])

  useEffect(() => {
    if (flows.length > 0) {
    let flowsByPoseArray = []
    flows.map((flow) => {
      if (flow.poseColumnIdList.includes(String(pose.id))) {
        flowsByPoseArray.push(flow)
      }
    })
    setPosewithFlows(flowsByPoseArray)
  }
  },[flows])


  return <Container>
      <img src={pose.img_url} height={100} width={100} />
      <br />
      <h3>{pose.sanskrit_name}</h3>
      <br />
      {pose.english_name}
      <br />
      <i>{pose.category}</i>
      <br />
      <div>
        { poseWithFlows.length > 0 ? 
        <div>Flows featuring this pose:<br /> {
          poseWithFlows.map((flowByPose) => { 
           return <ul><li key={`flowByPose__${flowByPose.id}`}><Link to={`/flow/detail/${flowByPose.id}`}>{flowByPose?.title}</Link></li></ul>}) }</div>
        : ""
        }</div>
    </Container>
  
};

//For Wes: nutritionist user could create menus that other users can save?