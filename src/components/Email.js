import {Avatar, Checkbox, RichCell} from "@vkontakte/vkui";
import React, {useState} from "react";
import "./Email.scss";

import {Icon12Circle, Icon12CircleOutline, Icon16Bookmark, Icon16BookmarkOutline} from '@vkontakte/icons';
import {READ_EMAIL, UNREAD_EMAIL} from "../helpers/endpoints";

export default function Email({ id, title, author, text, dateTime, read, flag, check = f => f }) {
    const [item, setItem] = useState({ id, title, author, text, dateTime, read, flag });
    const [hover, setHover] = useState(false);
    const [checked, setChecked] = useState(false);

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
                    <Checkbox onClick={checkElement}/>
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

            <div className="email-date__container">
                <div title={dateTime} className="email__date">{dateTime}</div>
            </div>
        </RichCell>
    );
}

