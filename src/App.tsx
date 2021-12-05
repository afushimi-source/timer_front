import { ChakraProvider } from "@chakra-ui/react";
import { VFC } from "react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import theme from "./theme/theme";
import { Router } from "./router/Router";

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
