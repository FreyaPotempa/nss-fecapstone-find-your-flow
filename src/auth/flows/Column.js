
import { Pose } from "./Pose"
import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"
import { Heading } from "@chakra-ui/react"

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius:2px;
width: 100%;
display: flex;
flex-direction: column;
min-height: 100px;
max-height: 800px;
overflow-y: scroll`

const YogaList = styled.div`
padding: 8px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? `#56638A` : "white")};
  min-height: 300px;
`

export const Column = ({ column, yogaChoices }) => {
    return (
        <Container>
            <Heading as='h3' size='xl' color="#56203D">{column.title}</Heading>
            <Droppable droppableId={column.id} direction="horizontal">
                {(provided, snapshot) => (
                    <YogaList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                    >
                        {yogaChoices.map((pose, index) => (
                            <Pose Posekey={pose.id} pose={pose} index={index} />
                        ))}
                        {provided.placeholder}
                    </YogaList>
                )}
            </Droppable>
        </Container>
    )
}