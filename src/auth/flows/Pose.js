import { Box, Card, CardBody, Divider, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ContainerPose = styled.div`
    width: 175px;
    display: flex;
    flex-direction: column;
    border: 1px solid lightgrey;
    border-radius: 5%;
    margin: 8px;
    align-items: center;
    background-color: ${(props) => (props.isDragging ? "#53DD6C" : "white")}`;
//Honestly this looks and works a lot better with just the styled-components so might change this back for draggy droppys

{/* <Card width='175px' align="center" border="1px solid lightgrey" m="8px"> */}

export const Pose = ({pose, index}) => {
    return (
        <Draggable draggableId={String(pose.id)} index={index}>
            {(provided, snapshot) => (
                <ContainerPose
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
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
        </ContainerPose>
            )}
        </Draggable>
    )
}

