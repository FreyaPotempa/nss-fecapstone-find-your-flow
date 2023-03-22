import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as HomeLogo } from "../images/FYFLogo.svg";
import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  LightMode,
  Stack,
  Text,
} from "@chakra-ui/react";

export const Register = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    isInstructor: false,
  });
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const registerNewUser = () => {
    return fetch(`http://localhost:8088/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "yoga_user",
            JSON.stringify({
              id: createdUser.id,
              instructor: createdUser.isInstructor,
            })
          );
          navigate("/");
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length > 0) {
          window.alert("Account with that email address already exists");
        } else {
          registerNewUser();
        }
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <LightMode>
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <HomeLogo />
        <Heading as="h4" size="md">
          Register for Find Your Flow
        </Heading>
        <form onSubmit={handleRegister}>
          <Stack
            width="350"
            spacing={4}
            p="1rem"
            backgroundColor="whiteAlpha.900"
            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.400"
                  children={
                    <svg
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
                <Input
                  onChange={updateUser}
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                  autoFocus
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.400"
                  children={
                    <svg
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  }
                />
                <Input
                  onChange={updateUser}
                  type="email"
                  id="email"
                  placeholder="Email address"
                  required
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.400"
                  children={
                    <svg
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  onChange={updateUser}
                  className="form-control"
                  required
                  autoFocus
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <Checkbox
                onChange={(evt) => {
                  const copy = { ...user };
                  copy.isInstructor = evt.target.checked;
                  setUser(copy);
                }}
                type="checkbox"
                id="isInstructor"
              >
                I am a teacher{" "}
              </Checkbox>
            </FormControl>
            <Button
              type="submit"
              p="2"
              m="2"
              variant="solid"
              borderRadius={0}
              colorScheme="teal"
            >
              {" "}
              Register{" "}
            </Button>
          </Stack>
        </form>
      </Stack>
      <Center>
        Already a member?{" "}
        <Link to="/login">
          <Text ml="2" fontWeight="bold" color="#56638A">
            Login
          </Text>{" "}
        </Link>
      </Center>
    </Flex>
    </LightMode>
  );
};
