import {SimpleCell} from "@vkontakte/vkui";
import React from "react";
import "./Email.scss";

const SHORT_BODY_LENGTH = 50;

export default function Email({ title, author, text, dateTime }) {
    const shortBody = text.substring(0, SHORT_BODY_LENGTH);
    return (
        <SimpleCell className="email-item">
            <span className="email__sender">{author.name}</span>
            <span className="email__subject">{title}</span>
            <span className="email__body">{shortBody}</span>
            <span className="email__date">{dateTime}</span>
        </SimpleCell>
    );
}