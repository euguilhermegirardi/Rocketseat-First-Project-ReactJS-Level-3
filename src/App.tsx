import React from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/global";
import Routes from "./routes/index";

const App: React.FC = () => (
   <BrowserRouter>
      <GlobalStyles />
      <Routes />
   </BrowserRouter>
);

export default App;
