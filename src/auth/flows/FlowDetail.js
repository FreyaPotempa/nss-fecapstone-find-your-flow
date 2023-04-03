import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FlowContext } from "./FlowProvider";
import {
  Button,
  Card,
  CardBody,
  Container,
  Heading,
  Image,
  ignoreFallback,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useColorMode,
  useToast,
} from "@chakra-ui/react";

export const FlowDetail = () => {
  const navigate = useNavigate();
  const {
    addProgress,
    getFlowById,
    poses,
    getPoses,
    flow,
    deleteFlow,
    addFave,
    getFavesByUser,
    favesByUser,
    deleteFave,
  } = useContext(FlowContext);
  const { flowId } = useParams();
  const [flowDate, setFlowDate] = useState("");
  const { colorMode } = useColorMode();
  const toast = useToast();
  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"));

  useEffect(() => {
    getFlowById(flowId);
    getPoses();
    getFavesByUser(localYogaUserObj.id);
  }, []);

  const handleDelete = () => {
    deleteFlow(flowId).then(() => {
      navigate("/flow/saved");
    });
  };

  const handleEdit = () => {
    navigate(`/flow/edit/${flowId}`);
  };

  const favoriteFlow = (e) => {
    const newFave = {
      userId: localYogaUserObj.id,
      flowId: flowId,
    };

    addFave(newFave).then(
      toast({
        title: "Flow saved",
        duration: 5000,
        isClosable: true,
      })
    );
    navigate("/flow/saved");
  };

  const deleteFaveFlow = (e) => {
    const userFaveObj = favesByUser.find((fave) => fave.flowId === flow.id);
    deleteFave(userFaveObj.id).then(navigate("/flow/saved"));
  };

  const saveProgress = (e) => {
    const newProgress = {
      userId: localYogaUserObj.id,
      flowId: flowId,
      difficulty: flow.difficulty,
      dateCompleted: flowDate,
    };

    addProgress(newProgress).then(navigate("/profile"));
  };

  const handleDate = (e) => {
    const dateCompleted = e.target.value;
    setFlowDate(dateCompleted);
  };

  return (
    <>
      <Container key={`flow__${flow.id}`}>
        <Heading
          as="h3"
          size="lg"
          color={colorMode === "light" ? "#56203D" : "#56638A"}
        >
          {flow?.title}
        </Heading>
        <Text fontWeight="bold">Difficulty: {flow?.difficulty}/5</Text>
        <SimpleGrid
          border="1px dashed lightgrey"
          m="12px"
          p="8px"
          width="100%"
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        >
          {flow?.poseColumnIdList?.map((poseId) => {
            const poseObj = poses.find((pose) => pose.id === parseInt(poseId));
            return (
              <Card maxW="175px" align="center" key={`pose__${poseObj?.id}`}>
                <CardBody>
                  <Image
                    src={poseObj?.img_url}
                    sx={colorMode === "light" ? "" : { filter: "invert(1)" }}
                    height={100}
                    width={100}
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{poseObj?.sanskrit_name}</Heading>
                    <Text py="2">{poseObj?.english_name}</Text>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
        {localYogaUserObj.instructor ? null : (
          <>
            <label>I completed this flow on:</label>
            <Input type="date" m="6px" width={200} onChange={handleDate} />
            <Button m="6px" type="button" onClick={saveProgress}>
              Mark Completed
            </Button>
          </>
        )}
        {favesByUser.find((fave) => fave.flowId === flow.id) ? (
          <Tooltip label="Remove from favorites">
            <Button m="6px" type="button" onClick={deleteFaveFlow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height={20}
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Tooltip>
        ) : (
          <Tooltip label="Save this Flow">
            <Button m="6px" type="button" onClick={favoriteFlow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                height={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </Button>
          </Tooltip>
        )}
        {flow?.userId === localYogaUserObj.id ? (
          <>
            <Button m="6px" type="button" onClick={handleEdit}>
              edit
            </Button>
            <Popover>
              {({ isOpen, onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button m="6px" type="button">
                      Delete
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Confirmation!</PopoverHeader>
                    <PopoverBody>
                      Are you sure you want to delete this flow?
                    </PopoverBody>
                    <PopoverFooter display="flex" justifyContent="flex-end">
                      <Button
                        type="button"
                        size="sm"
                        colorScheme="red"
                        onClick={() => {
                          handleDelete(flow.id);
                        }}
                      >
                        Confirm
                      </Button>
                      <Button type="button" size="sm" onClick={onClose}>
                        Cancel
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </>
              )}
            </Popover>
            {/* <Button m="6px" type="button" onClick={handleDelete}>
              delete
            </Button> */}
          </>
        ) : null}
      </Container>
    </>
  );
};
