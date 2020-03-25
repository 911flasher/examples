import React from "react";
import { Container } from "@material-ui/core";

import Navigation from "../navigation";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container>
        {children}
      </Container>
    </>
  );
};

export default Layout;