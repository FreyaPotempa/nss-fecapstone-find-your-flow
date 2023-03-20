import { Box, Card, CardBody, CardHeader, Heading, SimpleGrid, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { FlowContext } from "./FlowProvider"


export const SavedFlows = () => {
    const { getFavesByUser, favesByUser, getUsers, users } = useContext(FlowContext)
    
    const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"));

    useEffect(() => {
        getFavesByUser(localYogaUserObj.id)
        .then(getUsers())
    },[])

    const matchFlowtoCreator = (flow) => {
        const flowCreator = users?.find(user => user.id === flow.userId)
        return flowCreator.name
    }

    return (
        <>
        <Heading as='h3' size='lg'>My Favorite Flows</Heading>
        <SimpleGrid spacing={4} templateColumns='repeat (auto-fill, minmax (200px, 1fr))'>
        {favesByUser.map((fave) => {
            return <Card boxShadow='xl' p='2' rounded='md' bg='white' width={200} m='4' maxHeight={250} align='center' key={`flowfave-${fave?.id}`}>
                <CardHeader>
                <Heading size='md' color='#56203D' _hover={{ color: "#53DD6C" }}>
                <Link to={`/flow/detail/${fave?.flow?.id}`}>
                    {fave?.flow?.title}
                </Link>
                </Heading>
                </CardHeader>
                <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                <Text>
                Difficulty: {fave?.flow?.difficulty}/5 <br />
                </Text>
                </Box>
                <Box>
                    <Text>

                Created by: {matchFlowtoCreator(fave?.flow)}
                    </Text>

                </Box>
                </Stack>
                </CardBody>
            </Card>
        })}
        </SimpleGrid>
        </>
    )


}