import { Heading, Text } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { FlowContext } from "../auth/flows/FlowProvider"


export const InstructorProfile = () => {
    const { getFlows, flows,getUserById, user } = useContext(FlowContext)
    const [filteredFlows, setFilteredFlows] = useState([])

    const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"))

    useEffect(() => {
        getUserById(localYogaUserObj.id)
        .then(getFlows())
    },[])
 
    useEffect(() => {
        const myFlows = flows.filter((flow) => flow.userId === localYogaUserObj.id)
        setFilteredFlows(myFlows)

    },[flows])



    return <>
    <Heading as='h3' size='lg' m='6'>{user.name}</Heading>
    <Text m='4' p='4'>You've created {filteredFlows.length} flow(s)</Text>
    <Text>Your flows have been favorited X times</Text>
    <Text>GRAPH OF YOUR POPULAR FLOWS</Text>
    </>
}