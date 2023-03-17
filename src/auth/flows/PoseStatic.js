import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlowContext } from "./FlowProvider";
import { Card, CardHeader, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'


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


  return <Card maxW='md' align="center">
  <CardBody>
    <Image
      src={pose.img_url} height={100} width={100} />
      <Stack mt='6' spacing='3'>

      <Heading size='md'>{pose.sanskrit_name}</Heading>
      <Text py='2'>
      {pose.english_name}<br />
        {pose.category}
      </Text>
        { poseWithFlows.length > 0 ? 
        <div>Flows featuring this pose:<br /> {
          poseWithFlows.map((flowByPose) => { 
            return <ul><li key={`flowByPose__${flowByPose.id}`}><Link to={`/flow/detail/${flowByPose.id}`}>{flowByPose?.title}</Link></li></ul>}) }</div>
            : ""
          }
          </Stack>
          </CardBody>
          </Card>
  
};

//For Wes: nutritionist user could create menus that other users can save?