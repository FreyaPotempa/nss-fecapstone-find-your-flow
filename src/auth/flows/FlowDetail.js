import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FlowContext } from "./FlowProvider"
import styled from "styled-components"
import { Button, Card, CardBody, Heading, Image, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  width: 120px;
`;

const FlowList = styled.div`
padding: 8px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
min-height: 100px;
`

export const FlowDetail = () => {
    const navigate = useNavigate()
    const { addProgress, getFlowById, poses, getPoses, flow, deleteFlow, addFave, getFavesByUser, favesByUser, deleteFave } = useContext(FlowContext)
    const { flowId } = useParams()
    const [ flowDate, setFlowDate ] = useState("")
    const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"))

    useEffect(() => {
        getFlowById(flowId)
        getPoses()
        getFavesByUser(localYogaUserObj.id)

    },[])

    const handleDelete = () => {
        deleteFlow(flowId).then(() => {
            navigate("/flow/saved")
        })
    }

    const handleEdit = () => {
        navigate(`/flow/edit/${flowId}`)
    }

    const favoriteFlow = (e) => {
        const newFave = {
            userId: localYogaUserObj.id,
            flowId: flowId,
        }

        addFave(newFave)
        .then(navigate("/flow/saved"))
    }

    const deleteFaveFlow = (e) => {
        const userFaveObj = favesByUser.find((fave) => fave.flowId === flow.id)
        deleteFave(userFaveObj.id)
        .then(navigate("/flow/saved"))
    }

    const saveProgress = (e) => {
        const newProgress = {
            userId: localYogaUserObj.id,
            flowId: flowId,
            difficulty: flow.difficulty,
            dateCompleted: flowDate
        }

        addProgress(newProgress)
        .then(navigate("/profile"))
    }

    const handleDate = (e) => {
        const dateCompleted = e.target.value
        setFlowDate(dateCompleted)

    }

    return <>
    <section key={`flow__${flow.id}`}>
        <Heading as='h3' size='lg' color="#56203D">{flow?.title}</Heading>
        <Text fontWeight='bold'>Difficulty: {flow?.difficulty}/5</Text>
            <SimpleGrid border="1px dashed lightgrey" m="12px" p="8px" width="90%" spacing={4} templateColumns='repeat(auto-fill, minmax(150px, 1fr))'>
        {
            flow?.poseColumnIdList?.map((poseId) => {
                const poseObj = poses.find((pose) => pose.id === parseInt(poseId))
                return <Card maxW='175px' align="center" key={`pose__${poseObj?.id}`}>
                    <CardBody>
                <Image src={poseObj?.img_url} height={100} width={100} />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{poseObj?.sanskrit_name}</Heading>
                <Text py='2'>{poseObj?.english_name}</Text>
                </Stack>
                </CardBody>
                </Card>
            })
        }
        </SimpleGrid>
           { localYogaUserObj.instructor ? null :
           <>
                <label>I completed this flow on:</label>
                <Input type="date" m="6px" width={200} onChange={handleDate} />
                <Button m="6px" type="button" onClick={saveProgress}>Mark Completed</Button>
                </>
            }
            {
                favesByUser.find((fave) => fave.flowId === flow.id) ? <Button m="6px" type="button"onClick={deleteFaveFlow}>Remove from Favorites</Button> :
            
            <Button mt="12px" ml="20px" type="button" onClick={favoriteFlow}>Save this flow</Button>
            }
            {
        flow?.userId === localYogaUserObj.id ?
        <> 
        <Button m="6px" type="button" onClick={handleEdit}>edit</Button>
        <Button m="6px" type="button" onClick={handleDelete}>delete</Button>
        </>
        :
         null

    }
    </section>
    </>
}