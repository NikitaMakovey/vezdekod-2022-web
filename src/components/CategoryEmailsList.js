import {RichCell, SimpleCell} from "@vkontakte/vkui";
import EmailsList from "./EmailsList";
import React from "react";
import { Link } from "react-router-dom";

import "./CategoryEmailsList.scss";

const CATEGORIES = {
    social: "Социальные сети",
    news: "Новости",
    other: "Другое",
};

export default function CategoryEmailsList({ category, active, updateActiveCategories = f => f, items, updateCheckedItems = f => f, checkedItems }) {
    return (
        <div key={category} style={{position: "relative"}}>
            <RichCell
                className="email-category"
                onClick={() => updateActiveCategories(category)}
            >{CATEGORIES[category]}</RichCell>
            {
                active && (
                    <>
                        <EmailsList
                            items={items.filter(o => o.category === category)}
                            updateCheckedItems={updateCheckedItems}
                            checkedItems={checkedItems}
                        />
                        <SimpleCell className="simple-cell--center">
                            <Link to={`/categories/${category}`}>Перейти в папку «{CATEGORIES[category]}»</Link>
                        </SimpleCell>
                    </>
                )
            }
        </div>
    )
}
