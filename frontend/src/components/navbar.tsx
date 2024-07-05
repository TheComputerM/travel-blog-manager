import { Container, Divider } from "styled-system/jsx";
import { Heading } from "./ui/heading";

export const Navbar = () => (
  <Divider py="4" bgColor="bg.subtle">
    <Container>
      <Heading textStyle="2xl">Blog Manager</Heading>
    </Container>
  </Divider>
);
