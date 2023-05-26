import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  FormControl,
  InputRightElement,
  Text,
  Center,
  LightMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as HomeLogo } from "../images/FYFLogo.svg";

export const Login = ({ setToken }) => {
  const [username, set] = useState("");
  const [password, setP] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isUnsuccessful, setisUnsuccessful] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => {
      if ("valid" in res && res.valid) {
        setToken(res.token);
        navigate("/");
      } else {
        setisUnsuccessful(true);
      }
    });
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
            Please sign in
          </Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleLogin}>
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
                      type="username"
                      value={username}
                      onChange={(evt) => set(evt.target.value)}
                      className="form-control"
                      placeholder="username"
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
                      value={password}
                      onChange={(evt) => setP(evt.target.value)}
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
                <Button
                  p="2"
                  m="2"
                  type="submit"
                  variant="solid"
                  borderRadius={0}
                  colorScheme="teal"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Center>
          Not a member yet?{" "}
          <Link to="/register">
            <Text ml="2" fontWeight="bold" color="#56638A">
              Register
            </Text>
          </Link>
        </Center>
      </Flex>
    </LightMode>
  );
};
