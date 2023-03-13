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
        <h2>My Favorite Flows</h2>
        {favesByUser.map((fave) => {
           return <> 
            <div key={`flowfave-${fave?.id}`}>
                <Link to={`/flow/detail/${fave?.flow?.id}`}>
                    {fave?.flow?.title}
                </Link>
                <br />
                Difficulty: {fave?.flow?.difficulty}/5 <br />
                Created by: {matchFlowtoCreator(fave?.flow)}

            </div>
            </>
        })}
        </>
    )


}