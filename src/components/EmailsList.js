import React, {useState} from "react";
import Email from "./Email";

export default function EmailsList({ items, updateCheckedItems = f => f }) {
    const [checked, setChecked] = useState([]);

    const updateChecked = (id) => {
        if (checked.includes(id)) {
            const updatedCheckedItems = checked.filter(o => o !== id);
            setChecked(updatedCheckedItems);
            updateCheckedItems(updatedCheckedItems);
        } else {
            const updatedCheckedItems = [...checked, id];
            setChecked(updatedCheckedItems);
            updateCheckedItems(updatedCheckedItems);
        }
   }

    return (
        <>
            {items.map((item, key) => (
                <Email key={key} {...item} check={updateChecked}/>
            ))}
        </>
    );
}
