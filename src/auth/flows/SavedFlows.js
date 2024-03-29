import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../userProvider";
import { FlowContext } from "./FlowProvider";

export const SavedFlows = () => {
  const { getFavesByUser, favesByUser } = useContext(FlowContext);
  const { users, getUsers } = useContext(UserContext);
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.200");
  const { colorMode } = useColorMode();

  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"));

  useEffect(() => {
    getFavesByUser(localYogaUserObj.id).then(getUsers());
  }, []);

  const matchFlowtoCreator = (flow) => {
    const flowCreator = users?.find((user) => user.id === flow.userId);
    return flowCreator.name;
  };

  return (
    <>
      <Heading as="h3" size="lg" ml="4">
        My Favorite Flows
      </Heading>
      <SimpleGrid ml="6" minChildWidth="190px" spacingX="25px" width="80%">
        {favesByUser.map((fave) => {
          return (
            <Card
              boxShadow="xl"
              p="2"
              rounded="md"
              bg={bgColor}
              width={200}
              m="4"
              maxHeight={250}
              align="center"
              key={`flowfave-${fave?.id}`}
            >
              <CardHeader>
                <Heading
                  size="md"
                  as="u"
                  color={colorMode === "light" ? "#56203D" : "#56638A"}
                  _hover={{ color: "#53DD6C" }}
                >
                  <Link to={`/flow/detail/${fave?.flow?.id}`}>
                    {fave?.flow?.title}
                  </Link>
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Text>
                      Difficulty: {fave?.flow?.difficulty}/5 <br />
                    </Text>
                  </Box>
                  <Box>
                    <Text>Created by: {matchFlowtoCreator(fave?.flow)}</Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};
