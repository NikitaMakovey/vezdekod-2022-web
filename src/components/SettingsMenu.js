import {Button, Card, Div} from "@vkontakte/vkui";
import {Icon28SettingsOutline} from "@vkontakte/icons";
import {Dropdown} from "@vkontakte/vkui/unstable";

import "./SettingsMenu.scss";


export default function SettingsMenu({ currentTheme, setTheme = f => f }) {
    const themes = [
        {
            id: 1,
            name: "Классическая",
            preview: "/backgrounds/white.png",
            previewColor: "white",
            options: { backgroundImage: null, appearance: "light" }
        },
        {
            id: 2,
            name: "Тёмная тема",
            preview: "/backgrounds/black.jpeg",
            previewColor: "black",
            options: { backgroundImage: null, appearance: "dark" }
        },
        {
            id: 3,
            name: "Big Floppa",
            preview: "/backgrounds/floppa.png",
            previewColor: "#666666",
            options: { backgroundImage: "/backgrounds/floppa.png", appearance: "dark" }
        },
        {
            id: 4,
            name: "Wave",
            preview: "/backgrounds/wave.jpg",
            previewColor: "#363636",
            options: { backgroundImage: "/backgrounds/wave.jpg", appearance: "light" }
        },
        {
            id: 5,
            name: "Relax",
            preview: "/backgrounds/relax.jpg",
            previewColor: "#363636",
            options: { backgroundImage: "/backgrounds/relax.jpg", appearance: "dark" }
        },
        {
            id: 6,
            name: "Coast",
            preview: "/backgrounds/coast.jpg",
            previewColor: "#363636",
            options: { backgroundImage: "/backgrounds/coast.jpg", appearance: "light" }
        },
        {
            id: 7,
            name: "Sand",
            preview: "/backgrounds/sand.jpg",
            previewColor: "#363636",
            options: { backgroundImage: "/backgrounds/sand.jpg", appearance: "light" }
        },
    ];

    return (
        <Dropdown
            action="click"
            placement="right-start"
            content={
                <Card>
                    <Div className="mb-4">Внешний вид</Div>
                    <Div className="mb-4">Настройки внешнего вида вашей почты и темы оформления</Div>
                    <Div className="flex">
                        {themes.map(theme => (
                            <img
                                onClick={() => setTheme(theme)}
                                key={theme.id}
                                src={theme.preview}
                                style={{
                                    border: "1px solid #666666",
                                    maxHeight: "88px",
                                    minHeight: "88px",
                                    maxWidth: "120px",
                                    minWidth: "120px",
                                    opacity: theme.options.appearance === currentTheme ? 0.5 : 1
                                }}
                                title={theme.name}
                                alt={theme.name}
                            />
                        ))}
                    </Div>
                </Card>
            }
        >
            <Button
                color="primary"
                mode="tertiary"
                title="Настройки"
            >
                <Icon28SettingsOutline />
            </Button>
        </Dropdown>
    )
}