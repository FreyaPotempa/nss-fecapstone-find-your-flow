import { useContext, useEffect, useState } from "react"
import { FlowContext } from "./FlowProvider"


export const FlowCreator = () => {
    const { poses, getPoses } = useContext(FlowContext)

    useEffect(() => {
        getPoses()
    },[])


    //START HERE
    //BUILDING OUT COLUMNS AND POSES
    return (
        <section>
            <h2>Poses</h2>

        </section>
    )
}