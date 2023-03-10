import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  display: flex;
  flex-direction: column;
  width: 120px;
`;


export const Pose = ({pose, index}) => {
    return (
        <Draggable draggableId={String(pose.id)} index={index}>
            {(provided, snapshot) => (
                <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                >
                    <img src={pose.img_url} height={100} width={100} /><br />
                    <h3>{pose.sanskrit_name}</h3><br />
                    {pose.english_name}<br />
                    <i>{pose.category}</i>
                </Container>
            )}
        </Draggable>
    )
}

