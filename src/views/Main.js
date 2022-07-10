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
    Group,
    Button,
    ButtonGroup
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {GET_EMAILS, READ_EMAILS, UNREAD_EMAILS} from "../helpers/endpoints";
import random from "../helpers/random";
import {Icon16CheckCircle} from "@vkontakte/icons";
import CategoryEmailsList from "../components/CategoryEmailsList";

export default function Main() {
    const { viewWidth } = useAdaptivity();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [emailsListKey, setEmailsListKey] = useState(null);
    const [categories, setCategories] = useState([]);
    const [activeCategories, setActiveCategories] = useState([]);

    const updateActiveCategories = (category) => {
        if (activeCategories.includes(category)) {
            const updatedActiveCategories = activeCategories.filter(o => o !== category);
            setActiveCategories(updatedActiveCategories);
        } else {
            const updatedActiveCategories = [...activeCategories, category];
            setActiveCategories(updatedActiveCategories);
        }
    }

    const updateCheckedItems = (data) => {
        setCheckedItems(data);
    }

    const checkAllItems = () => {
        setCheckedItems(items.map(o => o.id));
        setEmailsListKey(random());
    }

    const uncheckAllItems = () => {
        setCheckedItems([]);
        setEmailsListKey(random());
    }

    const readCheckedEmails = async() => {
        try {
            const response = await fetch(READ_EMAILS(checkedItems));
            if (response.status !== 204) {
                console.error(`Request is failed with status ${response.status}`);
            } else {
                setItems(items.map(item => {
                    if (checkedItems.includes(item.id)) {
                        item.read = true;
                    }
                    return item;
                }));
                setCheckedItems([]);
                setEmailsListKey(random());
            }
        } catch (error) {
            console.error(error);
        }
    }

    const unreadCheckedEmails = async() => {
        try {
            const response = await fetch(UNREAD_EMAILS(checkedItems));
            if (response.status !== 204) {
                console.error(`Request is failed with status ${response.status}`);
            } else {
                setItems(items.map(item => {
                    if (checkedItems.includes(item.id)) {
                        item.read = false;
                    }
                    return item;
                }));
                setCheckedItems([]);
                setEmailsListKey(random());
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetch(`${GET_EMAILS}?id=${random()}`)
            .then(res => res.json())
            .then((result) => {
                    setIsLoaded(true);
                    let data = [];
                    Object.values(result.categories).forEach(categoryData => {
                        data = [...data, ...categoryData];
                    });
                    setCategories(Object.keys(result.categories));
                    setItems(data);
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
                            {
                                checkedItems.length ? (
                                    <PanelHeader>
                                        <ButtonGroup>
                                            {
                                                checkedItems.length === items.length ? (
                                                    <Button
                                                        color="primary"
                                                        before={(<Icon16CheckCircle/>)}
                                                        mode="tertiary"
                                                        onClick={uncheckAllItems}
                                                    >Отменить выделение</Button>
                                                ) : (
                                                    <Button
                                                        color="primary"
                                                        mode="tertiary"
                                                        onClick={checkAllItems}
                                                    >Выделить все</Button>
                                                )
                                            }
                                            <Button onClick={readCheckedEmails} color="primary">Прочитать</Button>
                                            <Button onClick={unreadCheckedEmails} color="primary">Пометить непрочитанными</Button>
                                        </ButtonGroup>
                                    </PanelHeader>
                                ) : (
                                    <PanelHeader>SOFT SQUAD Почта</PanelHeader>
                                )
                            }
                            {
                                error ? (
                                    <div>Error: {error.message}</div>
                                ) :
                                    !isLoaded ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <Group header={<Header mode="secondary">Письма</Header>}>
                                            {
                                                categories.map(category => {
                                                    return (
                                                        <CategoryEmailsList
                                                            category={category}
                                                            updateCheckedItems={updateCheckedItems}
                                                            updateActiveCategories={updateActiveCategories}
                                                            checkedItems={checkedItems}
                                                            items={items}
                                                            active={activeCategories.includes(category)}
                                                            key={`${emailsListKey}-${category}`}
                                                        />
                                                    )
                                                })
                                            }
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