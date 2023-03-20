import { Box, Card, CardBody, CardHeader, Center, Divider, Flex, Heading, Select, SimpleGrid, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlowContext } from "./FlowProvider";
import { FlowSearch } from "./FlowSearch";
import { ReactComponent as HomeLogo } from "../../images/FYFLogo.svg";

export const Home = () => {
  const { flows, getFlows, users, getUsers, poses, getPoses, searchTerms, setSearchTerms } =
    useContext(FlowContext);
  const [filteredFlows, setFilteredFlows] = useState([])
  const [instructorFlows, setInstructorFlows] = useState(0)
  const [difficultyFlows, setDifficultyFlows ] = useState(0)

  useEffect(() => {
    getFlows().then(getUsers()).then(getPoses()).then(setSearchTerms(""));
  }, []);

  useEffect(() => {
      const subset = flows.filter((flow) =>
        flow.title.toLowerCase().includes(searchTerms)
      );
      setFilteredFlows(subset);
  }, [poses, searchTerms]);

  useEffect(() => {
 let newFilteredFlows = [...flows]
      if (difficultyFlows > 0) {
      newFilteredFlows = newFilteredFlows.filter(
        (flow) => flow.difficulty === difficultyFlows
      );
    }
    if (instructorFlows > 0) {
      newFilteredFlows = newFilteredFlows.filter(
        (flow) => flow.userId === instructorFlows
      );
    } 
    setFilteredFlows(newFilteredFlows);
  },[instructorFlows, difficultyFlows])

  const handleInstructorChange = (event) => {
    const selected = parseInt(event.target.value);
    setInstructorFlows(selected)
  };

  const handleDifficultyChange = (event) => {
    const selected = parseInt(event.target.value)
    setDifficultyFlows(selected)
  }

  return (
    <>
    <Center>
      <HomeLogo />
    </Center>
    <Center>
      <Heading as='h4' size='md'>Create and share yoga pose flows</Heading>
      </Center>
      <Divider />
      <Heading p='10px' as='h3' size='lg'>All Created Flows</Heading>
      <Flex p='10px'>
      <FlowSearch />
        <Select p="4px" id="difficulty" width={250} onChange={handleDifficultyChange}>
          <option key="diff0" value="0">Choose a Difficulty</option>
          <option key="diff1" value="1">Novice</option>
          <option key="diff2" value="2">Beginner</option>
          <option key="diff3" value="3">Intermediate</option>
          <option key="diff4" value="4">Proficient</option>
          <option key="diff5" value="5">Advanced</option>
        </Select>
        <Select width={250} p="4px" id="instructor" onChange={handleInstructorChange}>
          <option value="0">Choose an Instructor</option>
          {users.map((user) => {
            if (user.isInstructor) {
              return <option key={`instructor__${user.id}`} value={`${user.id}`}>{user.name}</option>;
            }
          })}
        </Select>
        </Flex>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
          {filteredFlows.map((flow) => {
            return <Card boxShadow='xl' p='6' rounded='md' bg='white' maxW='lg' height={300} align="center" key={`Flows-${flow.id}`}>
              <CardHeader>
                <Heading size='md'color="#56203D"
                _hover={{ color: "#53DD6C"}}
                ><Link to={`/flow/detail/${flow.id}`}>
                  {flow.title}
                </Link></Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                <Text pt='2' fontSize='sm'>
                Difficulty: {flow.difficulty}/5</Text>
                </Box>
                <Box>
                <Text pt='2' fontSize='sm'>
                Created by: 
                </Text>
                <Text fontSize='sm' fontWeight="bold">{flow?.user?.name}</Text>
                </Box>
                </Stack>
              </CardBody>
              </Card>
          })}
        </SimpleGrid>
    </>
  );
};
