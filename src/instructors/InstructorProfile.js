import { Box, Divider, Flex, Heading, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FlowContext } from "../auth/flows/FlowProvider";
import { InstructorGraph } from "./InstructorGraph";

export const InstructorProfile = () => {
  const {
    getFlows,
    getFlowsWithFaves,
    flowsWithFaves,
    flows,
    getUserById,
    user,
  } = useContext(FlowContext);
  const [filteredFlows, setFilteredFlows] = useState([]);
  const [totalFavedFlows, setTotalFaves] = useState([]);
  const [userFlowsWithFaves, setFaves] = useState([])

  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"));

  useEffect(() => {
    getUserById(localYogaUserObj.id).then(getFlows()).then(getFlowsWithFaves());
  }, []);

  useEffect(() => {
    const myFlows = flows.filter((flow) => flow.userId === localYogaUserObj.id);
    setFilteredFlows(myFlows);
  }, [flows]);

  useEffect(() => {
    const myFavedFlows = flowsWithFaves.filter(
      (flowFave) => flowFave.userId === localYogaUserObj.id
    );

      setFaves(myFavedFlows)

    let flowFaveArray = [];
    myFavedFlows.map((popularFlow) => {
      flowFaveArray.push(popularFlow.userFaves.length);
    });

    const TotalFaveSum = flowFaveArray.reduce((x, y) => {
      return x + y;
    }, 0);
    setTotalFaves(TotalFaveSum);

    
  }, [flowsWithFaves]);
  
  useEffect(() => {
      userFlowsWithFaves.sort((a, b) => {
        return b.userFaves.length - a.userFaves.length
      })
    
  },[userFlowsWithFaves])

  return (
    <>
      <Heading as="h3" size="lg" m="6">
        {user.name}
      </Heading>
      <Flex>

      <Box boxShadow="lg" width="sm" p='2'm='4'align='center'>
      <Stat>
        <StatLabel>Created Flows:</StatLabel>
        <StatNumber>{filteredFlows.length}</StatNumber>
      </Stat>
      </Box>
      <Box boxShadow="lg" width="sm" p='2'm='4'align='center'>
      <Stat>
        <StatLabel>Your flows have been favorited:</StatLabel>
        <StatNumber>{totalFavedFlows}</StatNumber>
      </Stat>
      </Box>
      </Flex>
      <Divider mt="4" mb="4" />
      <InstructorGraph data={userFlowsWithFaves} />
    </>
  );
};
