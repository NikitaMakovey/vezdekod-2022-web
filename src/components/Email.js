import {Avatar, SimpleCell} from "@vkontakte/vkui";
import React from "react";
import "./Email.scss";

import { Icon12Circle, Icon12CircleOutline, Icon16BookmarkOutline, Icon16Bookmark } from '@vkontakte/icons';

const SHORT_BODY_LENGTH = 50;

export default function Email({ title, author, text, dateTime, read, flag }) {
    const shortBody = text.substring(0, SHORT_BODY_LENGTH);

    return (
        <SimpleCell className="email-item">
            <div className="email-mark-as-read__container">
                {
                    read ? (
                        <Icon12CircleOutline className="mark-as-read__item" title="Пометить непрочитанным"/>
                    ) : (
                        <Icon12Circle className="mark-as-read__item" title="Пометить прочитанным"/>
                    )
                }
            </div>

            <Avatar className="email-avatar" src={author.avatar} />

            <div className="email-sender__container">
                <span className="sender__item" title={`${author.name} ${author.email}`}>{author.name}</span>
            </div>

            <div className="email-flag__container">
                {
                    flag ? (
                        <Icon16Bookmark title="Снять флажок"/>
                    ) : (
                        <Icon16BookmarkOutline title="Пометить флажком"/>
                    )
                }
            </div>

            <div className="email-subject__container">
                <span className="email__subject">{title}</span>
            </div>

            <div className="email-body__container">
                <span className="email__body">{shortBody}</span>
            </div>

            <div className="email-date__container">
                <div title={dateTime} className="email__date">{dateTime}</div>
            </div>
        </SimpleCell>
    );
}

