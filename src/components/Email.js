import {SimpleCell} from "@vkontakte/vkui";
import React from "react";
import "./Email.scss";
import { convertDateTimeToLocalTimezone } from "../helpers/datetime";

const SHORT_BODY_LENGTH = 50;

export default function Email({ id, subject, sender, body, sent_at }) {
    const shortBody = body.substring(0, SHORT_BODY_LENGTH);
    const sentAtData = convertDateTimeToLocalTimezone(sent_at);
    return (
        <SimpleCell key={id} className="email-item">
            <span className="email__sender">{sender.name}</span>
            <span className="email__subject">{subject}</span>
            <span className="email__body">{shortBody}</span>
            <span className="email__date" title={sentAtData.source}>{sentAtData.preview}</span>
        </SimpleCell>
    );
}