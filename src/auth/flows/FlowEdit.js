import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FlowContext } from "./FlowProvider"


export const FlowEdit = () => {
    const navigate = useNavigate()
    const { getFlowById, poses, getPoses, flow } = useContext(FlowContext)
    const [ yogaDndStateUpdate, setYogaDndStateUpdate] = useState({
        yogaPoseData: {},
        columns: {
            "column-1": {
                id: "colum"
            }
        }
    })

    return <></>
}