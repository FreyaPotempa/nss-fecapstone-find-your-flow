import { Button, Flex, HStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {ReactComponent as ReactLogo} from '../images/HomeLogo.svg'

export const InstructorNav = () => {
  const navigate = useNavigate();

  return (
    <Flex
        w="100%"
        px="6"
        py="5"
        align="center"
        justify="space-between"
      >
        <Link className="navbar_link" to="/"><ReactLogo/>
        </Link>
        <HStack as="nav" spacing="5">
          
        <Link className="navbar_link" to="/flow/create">
        <svg height={30} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

        </Link>
        <Link className="navbar__link" to="/flow/saved">
        <svg height={30} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>

        </Link>
        <Link className="navbar__link" to="/profile">
        <svg height={30} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

        </Link>
        </HStack>
      {localStorage.getItem("yoga_user") ? (
          <Link
            className="navbar_link"
            to=""
            onClick={() => {
              localStorage.removeItem("yoga_user");
              navigate("/", { replace: true });
            }}
          >
            <Button type="button">Logout</Button>
          </Link>
      ) : (
        ""
      )}
    </Flex>
  );
};
