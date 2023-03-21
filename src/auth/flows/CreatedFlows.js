import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FlowContext } from "./FlowProvider";

export const CreatedFlows = () => {
  const { flows, getFlows, deleteFlow } = useContext(FlowContext);
  const [filteredFlows, setFilteredFlows] = useState([]);
  const navigate = useNavigate();
  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"));

  useEffect(() => {
    getFlows();
  }, []);

  useEffect(() => {
    const myFlows = flows.filter((flow) => flow.userId === localYogaUserObj.id);
    setFilteredFlows(myFlows);
  }, [flows]);

  const handleEdit = (flowId) => {
    navigate(`/flow/edit/${flowId}`);
  };

  const handleDelete = (flowId) => {
    deleteFlow(flowId).then(() => {
      navigate("/flow/saved");
    });
  };
  return (
    <>
      <Heading as="h3" size="lg" ml='4'>
        My Created Flows
      </Heading>
      <SimpleGrid
      ml='6'
      minChildWidth='190px'
        spacing={4}
        width="80%"
        
      >
        {filteredFlows.map((flow) => {
          return (
            <Card
              boxShadow="xl"
              p="2"
              rounded="md"
              bg="white"
              width={200}
              m="4"
              height={200}
              align="center"
              key={`flowList-${flow.id}`}
            >
              <CardHeader>
                <Heading
                  size="md"
                  color="#56203D"
                  _hover={{ color: "#53DD6C" }}
                >
                  <Link to={`/flow/detail/${flow.id}`}>
                    {flow.title}
                    <br />
                  </Link>
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="2">
                  <Box>
                    <Text pt="2" fontSize="sm">
                      Difficulty: {flow.difficulty}/5
                    </Text>
                  </Box>
                  <Box>
                    <Button
                      size="xs"
                      m="0.5"
                      type="button"
                      onClick={() => {
                        handleEdit(flow.id);
                      }}
                    >
                      {" "}
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      m="0.5"
                      type="button"
                      onClick={() => {
                        handleDelete(flow.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
      <Divider m='2' p='2' /> 
    </>
  );
};
