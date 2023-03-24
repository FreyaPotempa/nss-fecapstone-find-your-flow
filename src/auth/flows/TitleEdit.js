import {
  ButtonGroup,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { FlowContext } from "./FlowProvider";

export const TitleEdit = ({ columnTitle, saveNewTitle }) => {
  const saveTitle = (userTitle) => {
    saveNewTitle(userTitle);
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          }
          {...getSubmitButtonProps()}
        />
        <IconButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          }
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      //   <Flex justifyContent="center">
      <IconButton
        size="sm"
        ml="2"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        }
        {...getEditButtonProps()}
      />
      //   </Flex>
    );
  }

  return (
    <Container>
      <Editable
        textAlign="left"
        defaultValue={columnTitle}
        fontSize="3xl"
        isPreviewFocusable={false}
        onSubmit={(e) => {
          saveTitle(e);
        }}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} onBlur={null} />
        <EditableControls />
      </Editable>
    </Container>
  );
};
