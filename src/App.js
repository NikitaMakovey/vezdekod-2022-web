import "./App.css";
import {
  AdaptivityProvider,
  ConfigProvider
} from "@vkontakte/vkui";
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Main from "./views/Main";
import Category from "./views/Category";

function App() {
    return (
        <Router>
            <ConfigProvider>
                <AdaptivityProvider>
                    <Routes>
                        <Route path="/:category" element={<Category />} />
                        <Route path="/" element={<Main />} />
                    </Routes>
                </AdaptivityProvider>
            </ConfigProvider>
        </Router>
    );
}

export default App;
