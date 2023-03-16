
import { Pose } from "./Pose"
import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components"

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius:2px;
width: 100%;
display: flex;
flex-direction: column;
min-height: 100px;`

const Title = styled.div`
padding: 8px;`

const YogaList = styled.div`
padding: 8px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  min-height: 100px;
`

export const Column = ({ column, yogaChoices }) => {
    return (
        <Container>
            <Title>{column.title}</Title>
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