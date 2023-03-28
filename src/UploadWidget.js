import { Button, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const toast = useToast();
  const [userPhoto, setUserPhoto] = useState({
    userId: 0,
    url: "",
  });

  const localYogaUserObj = JSON.parse(localStorage.getItem("yoga_user"));

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dndff6clf",
        uploadPreset: "khfuxtzq",
        sources: ["local", "url"],
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          toast({
            title: "Image Uploaded",
            description: "Your image has been uploaded successfully!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          savePhoto(result);
        }
      }
    );
  }, []);

  const savePhoto = (result) => {
    const newPhotoInfo = { ...userPhoto };
    newPhotoInfo.userId = localYogaUserObj.id;
    newPhotoInfo.url = result.info.url;
    console.log(newPhotoInfo);
    setUserPhoto(newPhotoInfo);
  };

  return (
    <>
      {userPhoto.userId !== "0" ? <img height={250} src={userPhoto.url} /> : ""}
      <Button colorScheme="teal" onClick={() => widgetRef.current.open()}>
        Upload Image
      </Button>
    </>
  );
};
