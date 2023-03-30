import { Avatar, Box, Button, useToast } from "@chakra-ui/react";
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
        // maxFileSize: 500000,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log(result);
          setPhotoUrl(result.info.url);
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
    }
  };

  const doesUserHavePhoto = () => {
    console.log(photoUrl);
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
      <Avatar size="2xl" src={doesUserHavePhoto()} />
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
        // isDisabled={
        //   // photoUrl.length > 0 ? "" :
        //   isDisabled
        // }
        size="sm"
        p="2"
        m="1"
        onClick={() => addUserPhoto()}
      >
        Save Photo
      </Button>
    </>
  );
};
