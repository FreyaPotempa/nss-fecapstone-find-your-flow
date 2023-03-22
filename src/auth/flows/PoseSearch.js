import { Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FlowContext } from "./FlowProvider";

export const PoseSearch = () => {
  const { setSearchTerms } = useContext(FlowContext);

  return (
    <Input
      mt="3"
      width={350}
      type="text"
      className="input"
      onKeyUp={(event) => setSearchTerms(event.target.value)}
      placeholder="Search for a pose..."
    />
  );
};
