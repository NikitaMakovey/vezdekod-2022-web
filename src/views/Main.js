import React, {useEffect, useState} from "react";
import {
    useAdaptivity,
    AppRoot,
    SplitLayout,
    SplitCol,
    ViewWidth,
    View,
    Panel,
    PanelHeader,
    Header,
    Group
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import EmailsList from "../components/EmailsList";
import {GET_EMAILS} from "../helpers/endpoints";
import random from "../helpers/random";

export default function Main() {
    const { viewWidth } = useAdaptivity();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${GET_EMAILS}?id=${random()}`)
            .then(res => res.json())
            .then((result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    return (
        <AppRoot>
            <SplitLayout header={<PanelHeader separator={false} />}>
                <SplitCol spaced={viewWidth > ViewWidth.MOBILE}>
                    <View activePanel="main">
                        <Panel id="main">
                            <PanelHeader>SOFT SQUAD Почта</PanelHeader>
                            {
                                error ? (
                                    <div>Error: {error.message}</div>
                                ) :
                                    !isLoaded ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <Group header={<Header mode="secondary">Письма</Header>}>
                                            <EmailsList items={items}/>
                                        </Group>
                                    )
                            }
                        </Panel>
                    </View>
                </SplitCol>
            </SplitLayout>
        </AppRoot>
    );
};