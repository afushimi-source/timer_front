import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { VFC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import { Router } from "./router/Router";

const App: VFC = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};

export default App;
