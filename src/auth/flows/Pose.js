import {
  Card,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";



export const Pose = ({ pose, index }) => {
  const { colorMode } = useColorMode();
  return (
    <Draggable draggableId={String(pose.id)} index={index}>
      {(provided, snapshot) => (
        <Card
          width="175px"
          align="center"
          border="1px solid lightgrey"
          m="8px"
          // bg={{ background: `${(props) => (props.isDragging ? "#53DD6C" : 'lightgray')}`}}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Image
            src={pose.img_url}
            sx={colorMode === "light" ? "" : { filter: "invert(1)" }}
            height={100}
            width={100}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{pose.sanskrit_name}</Heading>
            <Text py="2">{pose.english_name}</Text>
            <Divider />
            <i>{pose.category}</i>
          </Stack>
        </Card>
      )}
    </Draggable>
  );
};
