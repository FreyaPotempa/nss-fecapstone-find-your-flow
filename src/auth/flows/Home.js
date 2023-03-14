import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FlowContext } from "./FlowProvider"


export const Home = () => {
    const { flows, getFlows, users, getUsers } = useContext(FlowContext)
    const [ filterdFlows, setFilteredFlows] = useState([])

    useEffect(() => {
        getFlows()
        .then(getUsers())
    },[])

    return <>
    <h1>Find Your Flow</h1>
        <div>Create and share yoga pose flows</div>
    <h2>All Created Flows</h2>
    <section>
    {flows.map((flow) => {
        return <div key={`Flows-${flow.id}`}>
            <Link to={`/flow/detail/${flow.id}`}>
                {flow.title}<br />
            </Link>
                Difficulty: {flow.difficulty}/5<br />
                Created by: {flow?.user?.name}
        </div>
    })
    }
    </section>
    </>
}