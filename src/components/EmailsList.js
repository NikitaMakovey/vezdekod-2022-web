import React from "react";
import Email from "./Email";

export default function EmailsList({ items }) {
    return (
        <>
            {items.map((item, key) => (
                <Email key={key} {...item}/>
            ))}
        </>
    );
}
