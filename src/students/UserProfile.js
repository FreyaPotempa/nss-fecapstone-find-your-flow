import { Container, Heading, Text } from "@chakra-ui/react";
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

  console.log("profile id", user.id);
  return (
    <>
      <Heading as="h3" size="lg" m="6">
        {user.name}
      </Heading>
      <Container>
        <UploadWidget currentUser={user} />
      </Container>
      <Text m="4" p="4">
        You've completed {userProgress.length} flows
      </Text>
      <ProgressChart data={userProgress} />
    </>
  );
};
