import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  ignoreFallback,
  Select,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlowContext } from "./FlowProvider";
import { FlowSearch } from "./FlowSearch";
import { ReactComponent as HomeLogo } from "../../images/FYFLogo.svg";
import { UserContext } from "../../userProvider";

export const Home = () => {
  const { flows, getFlows, poses, getPoses, searchTerms, setSearchTerms } =
    useContext(FlowContext);
  const { users, getUsers } = useContext(UserContext);
  const [filteredFlows, setFilteredFlows] = useState([]);
  const [instructorFlows, setInstructorFlows] = useState(0);
  const [difficultyFlows, setDifficultyFlows] = useState(0);
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.200");
  const { colorMode } = useColorMode();

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
    let newFilteredFlows = [...flows];
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
  }, [instructorFlows, difficultyFlows]);

  const handleInstructorChange = (event) => {
    const selected = parseInt(event.target.value);
    setInstructorFlows(selected);
  };

  const handleDifficultyChange = (event) => {
    const selected = parseInt(event.target.value);
    setDifficultyFlows(selected);
  };

  return (
    <>
      <Container>
        <Center>
          <HomeLogo />
        </Center>
        <Center>
          <Heading as="h4" size="md">
            Create and share yoga pose flows
          </Heading>
        </Center>
      </Container>
      <Divider />
      <Container maxW="4xl">
        <Heading p="10px" as="h3" size="lg">
          All Flows
        </Heading>
        <Flex p="10px">
          <FlowSearch />
          <Select
            p="4px"
            id="difficulty"
            width={250}
            onChange={handleDifficultyChange}
          >
            <option key="diff0" value="0">
              Choose a Difficulty
            </option>
            <option key="diff1" value="1">
              Novice
            </option>
            <option key="diff2" value="2">
              Beginner
            </option>
            <option key="diff3" value="3">
              Intermediate
            </option>
            <option key="diff4" value="4">
              Proficient
            </option>
            <option key="diff5" value="5">
              Advanced
            </option>
          </Select>
          <Select
            width={250}
            p="4px"
            id="instructor"
            onChange={handleInstructorChange}
          >
            <option value="0">Choose an Instructor</option>
            {users.map((user) => {
              if (user.isInstructor) {
                return (
                  <option key={`instructor__${user.id}`} value={`${user.id}`}>
                    {user.name}
                  </option>
                );
              }
            })}
          </Select>
        </Flex>
        <SimpleGrid
          width="3xl"
          spacing={8}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {filteredFlows.map((flow) => {
            return (
              <Card
                boxShadow="xl"
                p="6"
                rounded="md"
                bg={bgColor}
                width="xxs"
                align="center"
                key={`Flows-${flow.id}`}
              >
                <CardHeader>
                  <Heading
                    px={0}
                    as="u"
                    size="md"
                    color={colorMode === "light" ? "#56203D" : "#56638A"}
                    _hover={{ color: "#53DD6C" }}
                  >
                    <Link to={`/flow/detail/${flow.id}`}>{flow.title}</Link>
                  </Heading>
                </CardHeader>
                <CardBody padding={0}>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Flex>
                        <Text fontSize="sm">Difficulty:</Text>
                        <Text ml="0.5" fontSize="sm" as="b">
                          {flow.difficulty}/5
                        </Text>
                      </Flex>
                    </Box>
                    <Box>
                      <Text fontSize="sm">Created by:</Text>
                      <Center>
                        <Avatar
                          size="md"
                          m="1.5"
                          name={flow?.user?.name}
                          src={flow?.user?.userPhoto}
                        />
                        <Text fontSize="sm" fontWeight="bold">
                          {flow?.user?.name}
                        </Text>
                      </Center>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </Container>
    </>
  );
};
