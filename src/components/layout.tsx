import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./header";

const Main = styled.main`
  min-height: 100vh;
  background-image: url("/assets/images/bg-main.jpg");
  background-size: cover;
  background-position: center;
`;

const Layout = () => {
  return (
    <Main>
      <Header />
      <Outlet />
    </Main>
  );
};

export default Layout;
