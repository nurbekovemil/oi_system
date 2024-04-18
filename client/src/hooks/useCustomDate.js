import { useState } from "react";

export const useCustomDateFormat = (initialDateString) => {
    const [dateString, setDateString] = useState(initialDateString);

    const formatCustomDate = () => {
        const date = new Date(dateString);
        const months = [
            "января", "февраля", "марта",
            "апреля", "мая", "июня",
            "июля", "августа", "сентября",
            "октября", "ноября", "декабря"
        ];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        return `${day} ${months[monthIndex]} ${year}`;
    }
    return [formatCustomDate, setDateString];
}