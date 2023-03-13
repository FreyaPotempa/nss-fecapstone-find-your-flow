import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FlowContext } from "./FlowProvider"
import styled from "styled-components"

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
    const { getFlowById, poses, getPoses, flow, deleteFlow } = useContext(FlowContext)
    const { flowId } = useParams()
    const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"))

    useEffect(() => {
        getFlowById(flowId)
        getPoses()
    },[])

    const handleDelete = () => {
        deleteFlow(flowId).then(() => {
            navigate("/flow/saved")
        })
    }

    return <>
    <section key={`flow__${flow.id}`}>
        <h2>{flow?.title}</h2>
        <div>Difficulty: {flow?.difficulty}/5</div>
        <FlowList>
        {
            flow?.poseColumIdList?.map((poseId) => {
                const poseObj = poses.find((pose) => pose.id === parseInt(poseId))
                return <Container>
                <div key={`pose__${poseObj?.id}`}>
                <img src={poseObj?.img_url} height={100} width={100} /><br />
                <h3>{poseObj?.sanskrit_name}</h3>
                <div>{poseObj?.english_name}</div>
                </div>
                </Container>
            })
        }
            </FlowList>
        {
        flow?.userId === localYogaUserObj.id ?
        <> 
        <button type="button">edit</button>
        <button type="button" onClick={handleDelete}>delete</button>
        </>
        :
         null

    }
    </section>
    </>
}