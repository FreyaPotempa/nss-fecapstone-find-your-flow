import { Box, Card, CardBody, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// const Container = styled.div`
//     background-color: ${(props) => (props.isDragging ? "#53DD6C" : "white")}`;
//Honestly this looks and works a lot better with just the styled-components so might change this back for draggy droppys


export const Pose = ({pose, index}) => {
    return (
        <Card width='175px' align="center" border="1px solid lightgrey" m="8px">
        <Draggable draggableId={String(pose.id)} index={index}>
            {(provided, snapshot) => (
                <CardBody
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                bgColor="white"
                >
                    <Image src={pose.img_url} height={100} width={100} />
                    <Stack mt='6' spacing='3'>
                    <Heading size='md'>{pose.sanskrit_name}
                    </Heading>
                    <Text py='2'>
                        {pose.english_name}
                        </Text>
                    <Divider />
                    <i>{pose.category}</i>
                    </Stack>
                </CardBody>
            )}
        </Draggable>
        </Card>
    )
}

