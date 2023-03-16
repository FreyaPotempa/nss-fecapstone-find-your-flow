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
        <h2>{flow?.title}</h2>
        <div>Difficulty: {flow?.difficulty}/5</div>
        <FlowList>
        {
            flow?.poseColumnIdList?.map((poseId) => {
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
           { localYogaUserObj.instructor ? null :
           <>
                <label>I completed this flow on:</label>
                <input type="date" onChange={handleDate} />
                <button type="button" onClick={saveProgress}>Mark Completed</button>
                </>
            }
            {
                favesByUser.find((fave) => fave.flowId === flow.id) ? <button type="button"onClick={deleteFaveFlow}>Remove from Favorites</button> :
            
            <button type="button" onClick={favoriteFlow}>Save this flow</button>
            }
            {
        flow?.userId === localYogaUserObj.id ?
        <> 
        <button type="button" onClick={handleEdit}>edit</button>
        <button type="button" onClick={handleDelete}>delete</button>
        </>
        :
         null

    }
    </section>
    </>
}