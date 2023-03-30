import { Pose } from "./Pose";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Heading, useColorMode } from "@chakra-ui/react";
import { TitleEdit } from "./TitleEdit";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100px;
  max-height: 800px;
  overflow-y: scroll;
`;

const YogaList = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? `#56638A` : "")};
  min-height: 300px;
`;

export const Column = ({ column, columnId, saveNewTitle, yogaChoices }) => {
  const { colorMode } = useColorMode();
  return (
    <Container>
      <Heading
        as="h3"
        size="xl"
        color={colorMode === "light" ? "#56203D" : "#56638A"}
      >
        {column.id === "column-2" ? (
          <TitleEdit columnTitle={column.title} saveNewTitle={saveNewTitle} />
        ) : (
          column.title
        )}
      </Heading>
      <Droppable droppableId={column.id} direction="horizontal">
        {(provided, snapshot) => (
          <YogaList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {yogaChoices.map((pose, index) => (
              <Pose key={pose.id} pose={pose} index={index} />
            ))}
            {provided.placeholder}
          </YogaList>
        )}
      </Droppable>
    </Container>
  );
};
