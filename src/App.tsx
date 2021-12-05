import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { VFC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import theme from "./theme/theme";
import { Router } from "./router/Router";
import { useAuth } from "hooks/useAuth";

const App: VFC = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </RecoilRoot>
      </ChakraProvider>
    </>
  );
};

export default App;
