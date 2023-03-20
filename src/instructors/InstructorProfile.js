import { Heading, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FlowContext } from "../auth/flows/FlowProvider";

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

    let flowFaveArray = [];
    myFavedFlows.map((popularFlow) => {
      flowFaveArray.push(popularFlow.userFaves.length);
    });

    const TotalFaveSum = flowFaveArray.reduce((x, y) => {
      return x + y;
    }, 0);
    setTotalFaves(TotalFaveSum);
  }, [flowsWithFaves]);

  return (
    <>
      <Heading as="h3" size="lg" m="6">
        {user.name}
      </Heading>
      <Text m="4" p="4">
        You've created {filteredFlows.length} flow(s)
      </Text>
      <Text>Your flows have been favorited {totalFavedFlows} times</Text>
      <Text>GRAPH OF YOUR POPULAR FLOWS</Text>
    </>
  );
};
