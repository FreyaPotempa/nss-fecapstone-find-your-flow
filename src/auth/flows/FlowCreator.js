import { useContext, useEffect, useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { FlowContext } from "./FlowProvider"
import styled from "styled-components"
import { Column } from "./Column"

// define an absolutely empty "initialData" object here

export const FlowCreator = () => {
    const { poses, getPoses } = useContext(FlowContext)
    const [yogaDndState, setYogaDndState] = useState({
            yogaPoseData: {},
            columns: {
                "column-1": {
                    id: "column-1",
                    title: "Pose Picker",
                    poseInfo: []
                },
                "column-2": {
                    id: "column-2",
                    title: "Flow Creator",
                    poseInfo: []
                }
            },
            columnOrder: ["column-1", "column-2"]
    })

    useEffect(() => {
        getPoses()
    },[])

    useEffect(() => {
        if (poses.length > 0) {
            // make a copy of the "yogaDndState" (initialData) state:
            const newYogaDndState = {... yogaDndState}; 
            // then use what you have below to fill this copy with the data you retrieved 
            // (rather than putting that into separate states)
            let poseIdArray = []
            let yogaPoseList = {}
            poses.forEach((pose) => {
                yogaPoseList[`pose--${pose.id}`] = pose
                poseIdArray.push(`pose--${pose.id}`)})
                // remove these state sets

                newYogaDndState.columns["column-1"].poseInfo = poseIdArray
                newYogaDndState.yogaPoseData = yogaPoseList
               
                
                setYogaDndState(newYogaDndState)
            // set newData into state with setYogaDndState(newData)

            
        }
    },[poses])
 

    const Container = styled.div`
    display: flex`

    // const onDragEnd = (result) => {
    //     const {destination, source, draggableId } = result

    //     if (!destination) {
    //         return ""
    //     } else if (
    //         destination.droppableId === source.droppableId && destination.index === source.index
    //     ) {
    //         return ""
    //     }
    //     const start = yogaDndState.columns[source.droppableId]
    //     const finish = yogaDndState.columns[destination.droppableId]

    //     if (start === finish) {
    //         const newPoseIds = Array.from(start.poseIds)
    //         newPoseIds.splice(source.index, 1)
    //         newPoseIds.splice(destination.index, 0, draggableId)

    //         const newColumn = {
    //             ...start,
    //             poseIds: newPoseIds
    //         }

    //         const newState = {
    //             ...yogaDndState,
    //             columns: {
    //                 ...yogaDndState.columns,
    //                 [newColumn.id]: newColumn
    //             },
    //         }
    //         setYogaData(newState)
    //         return
    //     }
    // }
    return (
        <section>
            <h2>Poses</h2>
            <DragDropContext
            //onDragStart={onDragStart}
            //onDragEnd={onDragEnd}
            >
                <Container>
                    {yogaDndState.columnOrder.map((columnId) => {
                        const column = yogaDndState.columns
                        [columnId]
                        const posesInThisColumn = column.poseInfo.map((poseId) => {
                           // console.log("poseId", poseId)
                            const thingToReturn = yogaDndState.yogaPoseData[poseId];
                           // console.log("thingToReturn", thingToReturn)
                           // dealing with undefined in map, so examine each part. Ultimately I had [] around poseIds so it created a nested array, 
                            return thingToReturn;
                        })

                        

                        return <Column key={column.id} column={column} yogaChoices={posesInThisColumn} />
                    })}
                </Container>
            </DragDropContext>

                
        </section>
    )
}