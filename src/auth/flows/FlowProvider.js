import { createContext, useState } from "react";

export const FlowContext = createContext()

export const FlowProvider = (props) => {
    const [poses, setPoses] = useState([])
    const [users, setUsers ] = useState([])
    const [flows, setFlows] = useState([])
    const [ searchTerms, setSearchTerms] = useState("")

    const getPoses = () => {
        return fetch(`http://localhost:8088/poses`)
            .then(res => res.json())
            .then(setPoses)
    }

    const getFlows = () => {
        return fetch(`http://localhost:8088/flows`)
            .then(res => res.json())
            .then(setFlows)
    }

    const addFlow = (flowObj) => {
        return fetch(`http://localhost:8088/flows`,{
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(flowObj)})
        .then(res => res.json())
        .then(getFlows)
    }

    return (
        <FlowContext.Provider
        value={{
            poses, getPoses, flows, getFlows, addFlow, searchTerms, setSearchTerms
        }}>
            {props.children}
        </FlowContext.Provider>
    )
}