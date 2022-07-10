import "./App.css";
import {
  AdaptivityProvider,
  ConfigProvider
} from "@vkontakte/vkui";
import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Main from "./views/Main";
import Category from "./views/Category";
import SettingsMenu from "./components/SettingsMenu";

function App() {
    const [theme, setTheme] = useState("light");

    const updateTheme = (item) => {
        setTheme(item.options.appearance);
        if (item.options.backgroundImage) {
            document.getElementsByTagName('body')[0].style.backgroundImage = `url(${item.options.backgroundImage})`;
        } else {
            document.getElementsByTagName('body')[0].style.removeProperty('background-image');
        }
    }

    return (
        <Router>
            <ConfigProvider appearance={theme}>
                <AdaptivityProvider>
                    <Routes>
                        <Route path="/categories/:category" element={<Category />} />
                        <Route path="/" element={<Main />} />
                    </Routes>
                    <SettingsMenu setTheme={updateTheme} currentTheme={theme}/>
                </AdaptivityProvider>
            </ConfigProvider>
        </Router>
    );
}

export default App;
