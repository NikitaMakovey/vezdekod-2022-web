import "./App.css";
import {
  AdaptivityProvider,
  ConfigProvider
} from "@vkontakte/vkui";
import React from "react";
import Main from "./views/Main";

function App() {
  return (
      <ConfigProvider>
        <AdaptivityProvider>
          <Main />
        </AdaptivityProvider>
      </ConfigProvider>
  );
}

export default App;
