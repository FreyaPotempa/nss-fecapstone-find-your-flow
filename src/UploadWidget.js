import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./userProvider";

export const UploadWidget = ({ currentUser }) => {
  const { updateUser } = useContext(UserContext);
  const [photoUrl, setPhotoUrl] = useState("");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const toast = useToast();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dndff6clf",
        uploadPreset: "khfuxtzq",
        sources: ["local", "url"],
        maxFileSize: 500000,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          setPhotoUrl(result.info.url);
          // toast({
          //   title: "Your avatar has uploaded",
          //   description: "Please wait for loading",
          //   duration: 5000,
          //   isClosable: true,
          // });
        }
      }
    );
  }, []);

  const addUserPhoto = () => {
    console.log(currentUser);
    if (photoUrl) {
      updateUser({
        id: currentUser.id,
        name: currentUser.name,
        password: currentUser.password,
        email: currentUser.email,
        isInstructor: currentUser.isInstructor,
        userPhoto: photoUrl,
      });
      toast({
        title: "Your avatar has been saved.",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const doesUserHavePhoto = () => {
    if (photoUrl.length > 0) {
      return photoUrl;
    } else if (currentUser?.userPhoto) {
      return currentUser.userPhoto;
    } else {
      return "https://bit.ly/broken-link";
    }
  };
  return (
    <>
      <Box mb="4">
        <Avatar mb="3" size="2xl" src={doesUserHavePhoto()} />
        <Flex>
          <Button
            type="button"
            colorScheme="teal"
            size="sm"
            p="2"
            m="1"
            onClick={() => widgetRef.current.open()}
          >
            Upload Image
          </Button>
          <Button
            type="button"
            isDisabled={photoUrl.length > 0 ? false : true}
            size="sm"
            colorScheme="teal"
            p="2"
            m="1"
            onClick={() => addUserPhoto()}
          >
            Save Image
          </Button>
        </Flex>
      </Box>
    </>
  );
};
