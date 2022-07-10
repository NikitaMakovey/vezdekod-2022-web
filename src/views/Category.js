import React, {useCallback, useEffect, useState} from "react";
import {
    AppRoot,
    Button,
    ButtonGroup,
    Group,
    Header,
    Link,
    Pagination,
    Panel,
    PanelHeader,
    SplitCol,
    SplitLayout,
    useAdaptivity,
    View,
    ViewWidth
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import EmailsList from "../components/EmailsList";
import {GET_EMAILS_BY_CATEGORY, READ_EMAILS, UNREAD_EMAILS} from "../helpers/endpoints";
import random from "../helpers/random";
import {Icon16CheckCircle, Icon24ArrowLeftOutline} from "@vkontakte/icons";
import {useNavigate, useParams} from "react-router-dom";
import "./Category.scss";

export default function Category() {
    const navigate = useNavigate();
    const { category } = useParams();
    const { viewWidth } = useAdaptivity();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [emailsListKey, setEmailsListKey] = useState(null);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchEmails = async (page, limit) => {
        const response = await fetch(`${GET_EMAILS_BY_CATEGORY(category)}?id=${random()}&page=${page}&limit=${limit}`);
        const data = await response.json();
        setTotalPages(Math.round(data.total / limit));
        return data.items;
    }

    useEffect(() => {
        fetch(`${GET_EMAILS_BY_CATEGORY(category)}?id=${random()}`)
            .then(res => res.json())
            .then((result) => {
                    setIsLoaded(true);
                    setTotalPages(Math.round(result.total / limit));
                    setItems(result.items);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [category]);

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalPages, setTotalPages] = useState(10);
    const [disabled, setDisabled] = useState(false);

    const handleChange = useCallback(async (page, max = 20) => {
        setCurrentPage(page);
        setLimit(max);
        const data = await fetchEmails(page, max);
        setItems(data);
    }, [fetchEmails]);

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
                                                        before={(<Icon16CheckCircle/>)}
                                                        mode="tertiary"
                                                        onClick={uncheckAllItems}
                                                    >Отменить выделение</Button>
                                                ) : (
                                                    <Button
                                                        mode="tertiary"
                                                        onClick={checkAllItems}
                                                    >Выделить все</Button>
                                                )
                                            }
                                            <Button onClick={readCheckedEmails}>Прочитать</Button>
                                            <Button onClick={unreadCheckedEmails}>Пометить непрочитанными</Button>
                                        </ButtonGroup>
                                    </PanelHeader>
                                ) : (
                                    <PanelHeader>
                                        <Link onClick={() => navigate(-1)} style={{marginRight: "1rem"}}>
                                            <Icon24ArrowLeftOutline/>
                                        </Link>
                                        <span>SOFT SQUAD Почта</span>
                                    </PanelHeader>
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
                                            <Pagination
                                                currentPage={currentPage}
                                                boundaryCount={3}
                                                totalPages={totalPages}
                                                disabled={disabled}
                                                onChange={handleChange}
                                            />
                                            <EmailsList
                                                items={items}
                                                updateCheckedItems={updateCheckedItems}
                                                checkedItems={checkedItems}
                                                key={emailsListKey}
                                            />
                                            <Pagination
                                                currentPage={currentPage}
                                                boundaryCount={3}
                                                totalPages={totalPages}
                                                disabled={disabled}
                                                onChange={handleChange}
                                            />
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