import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  LightMode,
  Switch,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../images/LogoNoBG.svg";

export const InstructorNav = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("#483A58", "#56638A");

  return (
    <Flex
      w="100%"
      px="6"
      py="2"
      mb="6"
      align="center"
      justify="space-between"
      bg={bgColor}
    >
      <HStack>
        <Tooltip label="Home">
          <Link className="navbar_link" to="/">
            <ReactLogo />
          </Link>
        </Tooltip>
      </HStack>
      <HStack as="nav" spacing="5">
        <Tooltip label="Create Flow">
          <Link className="navbar_link" to="/flow/create">
            <svg
              height={30}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#eee0d8"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
        </Tooltip>
        <Tooltip label="My Flows">
          <Link className="navbar__link" to="/flow/saved">
            <svg
              height={30}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#eee0d8"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </Link>
        </Tooltip>
        <Tooltip label="Profile">
          <Link className="navbar__link" to="/profile">
            <svg
              height={30}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#eee0d8"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </Tooltip>
      </HStack>
      <HStack>
        <Button onClick={toggleColorMode} colorScheme="teal" size="sm">
          {colorMode === "light" ? (
            <Tooltip label="Dark Mode">
              <svg
                height={20}
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
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </Tooltip>
          ) : (
            <Tooltip label="Light Mode">
              <svg
                height={25}
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
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </Tooltip>
          )}
        </Button>

        {localStorage.getItem("yoga_user") ? (
          <Link
            className="navbar_link"
            to=""
            onClick={() => {
              localStorage.removeItem("yoga_user");
              //make this an "onlogout function that checks for color mode"
              toggleColorMode("light");
              navigate("/", { replace: true });
            }}
          >
            <Button size="sm" type="button">
              Logout
            </Button>
          </Link>
        ) : (
          ""
        )}
      </HStack>
    </Flex>
  );
};
