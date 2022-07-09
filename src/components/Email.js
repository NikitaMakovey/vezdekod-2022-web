import {Avatar, Checkbox, RichCell, SimpleCell} from "@vkontakte/vkui";
import React, {useEffect, useState} from "react";
import "./Email.scss";

import {
    Icon12Circle,
    Icon12CircleOutline,
    Icon16Bookmark,
    Icon16BookmarkOutline,
    Icon20Attach, Icon20PictureOutline
} from '@vkontakte/icons';
import {READ_EMAIL, UNREAD_EMAIL} from "../helpers/endpoints";
import {Dropdown} from "@vkontakte/vkui/unstable";

export default function Email({ id, title, author, text, dateTime, read, flag, file, check = f => f, active }) {
    const [item, setItem] = useState({ id, title, author, text, dateTime, read, flag });
    const [hover, setHover] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (active) { setHover(true); }
        setChecked(active);
    }, [active]);

    const toggleHover = () => {
        if (!hover || !checked) {
            setHover(!hover);
        }
    }
    const checkElement = () => {
        setChecked(!checked);
        check(id);
    }

    const readEmail = async() => {
        try {
            const response = await fetch(READ_EMAIL(id));
            if (response.status !== 204) {
                console.error(`Request is failed with status ${response.status}`);
            } else {
                setItem({ ...item, read: true });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const unreadEmail = async() => {
        try {
            const response = await fetch(UNREAD_EMAIL(id));
            if (response.status !== 204) {
                console.error(`Request is failed with status ${response.status}`);
            } else {
                setItem({ ...item, read: false });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <RichCell className="email-item" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <div className="email-mark-as-read__container">
                {
                    item.read ? (
                        <Icon12CircleOutline
                            onClick={unreadEmail}
                            className="mark-as-read__item"
                            title="Пометить непрочитанным"
                        />
                    ) : (
                        <Icon12Circle
                            onClick={readEmail}
                            className="mark-as-read__item"
                            title="Пометить прочитанным"
                            fill="blue"
                        />
                    )
                }
            </div>

            {
                hover ? (
                    <Checkbox onClick={checkElement} checked={checked}/>
                ) : (
                    <Avatar className="email-avatar" src={author.avatar} />
                )
            }

            <div className="email-sender__container">
                <span className="sender__item" title={`${author.name} ${author.email}`}>{author.name}</span>
            </div>

            <div className="email-flag__container">
                {
                    flag ? (
                        <Icon16Bookmark
                            className="email-flag__item"
                            fill="red"
                            title="Снять флажок"
                        />
                    ) : (
                        <Icon16BookmarkOutline
                            className="email-flag__item"
                            title="Пометить флажком"
                        />
                    )
                }
            </div>

            <div className="email-text__container">
                <div className="email-subject__container">
                    <span className="email__subject">{title}</span>
                </div>

                <div className="email-body__container">
                    <span className="email__body">{text}</span>
                </div>
            </div>

            <div className="email-secondary__container">
                { file && (
                    <>
                        <Dropdown
                            action="click"
                            placement="left"
                            content={
                                <div className="email-file__dropdown">
                                    <Dropdown
                                        action="hover"
                                        placement="left"
                                        content={
                                            <div className="email-file__dropdown">
                                                <SimpleCell>
                                                    <img src={file.preview} alt="#" />
                                                </SimpleCell>
                                            </div>
                                        }
                                    >
                                        <SimpleCell>
                                            <Icon20PictureOutline/>
                                            <span>{file.filePath}</span>
                                        </SimpleCell>
                                    </Dropdown>
                                </div>
                            }
                        >
                            <Icon20Attach/>
                        </Dropdown>
                    </>
                )}
            </div>

            <div className="email-date__container">
                <div title={dateTime} className="email__date">{dateTime}</div>
            </div>
        </RichCell>
    );
}

