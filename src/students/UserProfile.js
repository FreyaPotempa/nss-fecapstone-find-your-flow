import {
  Box,
  Container,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { FlowContext } from "../auth/flows/FlowProvider";
import { UserContext } from "../userProvider";
import { ProgressChart } from "./ProgressChart";
import { UploadWidget } from "../UploadWidget";

export const UserProfile = () => {
  const { getUserProgress, userProgress } = useContext(FlowContext);
  const { getUserById, user } = useContext(UserContext);
  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"));

  useEffect(() => {
    getUserProgress(localYogaUserObj.id);
    getUserById(localYogaUserObj.id);
  }, []);

  useEffect(() => {
    if (userProgress) {
      userProgress.sort((a, b) => {
        let da = new Date(a.dateCompleted);
        let db = new Date(b.dateCompleted);
        return da - db;
      });
    }
  }, [userProgress]);
  return (
    <>
      <Container maxW="container.lg">
        <Heading as="h3" size="lg" mb="6">
          {user.name}
        </Heading>
        <UploadWidget currentUser={user} />
        <Box boxShadow="lg" width="sm" p="2" mb="8" mt="8" align="center">
          <Stat>
            <StatLabel>Completed Flows</StatLabel>
            <StatNumber>{userProgress.length}</StatNumber>
          </Stat>
        </Box>
        <ProgressChart data={userProgress} />
      </Container>
    </>
  );
};
