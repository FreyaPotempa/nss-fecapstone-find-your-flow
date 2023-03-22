import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlowContext } from "./FlowProvider";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  useColorMode,
} from "@chakra-ui/react";

export const PoseStatic = ({ pose }) => {
  const { flows, getFlows } = useContext(FlowContext);
  const { colorMode } = useColorMode();
  const [poseWithFlows, setPosewithFlows] = useState([]);

  useEffect(() => {
    getFlows();
  }, []);

  useEffect(() => {
    if (flows.length > 0) {
      let flowsByPoseArray = [];
      flows.map((flow) => {
        if (flow.poseColumnIdList.includes(String(pose.id))) {
          flowsByPoseArray.push(flow);
        }
      });
      setPosewithFlows(flowsByPoseArray);
    }
  }, [flows]);

  return (
    <Card maxW="175px" align="center">
      <CardBody>
        <Image
          src={pose.img_url}
          sx={colorMode === "light" ? "" : { filter: "invert(1)" }}
          height={100}
          width={100}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{pose.sanskrit_name}</Heading>
          <Text py="2">
            {pose.english_name}
            <br />
            {pose.category}
          </Text>
          {poseWithFlows.length > 0 ? (
            <Accordion allowToggle>
              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Flows with this pose
                    </Box>
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
                  {poseWithFlows.map((flowByPose) => {
                    return (
                      <ul>
                        <li key={`flowByPose__${flowByPose.id}`}>
                          <Link to={`/flow/detail/${flowByPose.id}`}>
                            {flowByPose?.title}
                          </Link>
                        </li>
                      </ul>
                    );
                  })}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ) : (
            ""
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};
