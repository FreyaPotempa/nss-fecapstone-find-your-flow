import { Flex, Heading, Input, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { FlowContext } from "./FlowProvider"

export const PoseSearch = () => {
    const { setSearchTerms } = useContext(FlowContext)

    return (
        <Flex>
        <Text mt='2px' p='5px' fontWeight='bold'>Pose Search:</Text>
        <Input width={350}
        type="text"
        className="input"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a pose..."
        />
    </Flex>
    )
}