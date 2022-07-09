const PREFIX = process.env.REACT_APP_API_ENDPOINT + "/api/emails";

const convertArrayToQueryString = (key, data) => {
    let query = '';
    data.forEach((value, index) => {
        query += `${key}[${index}]=${value}` + (index < data.length - 1 ? '&' : '');
    });
    return query;
}

export const GET_EMAILS = PREFIX + "/";
export const GET_EMAILS_BY_CATEGORY = (category) => PREFIX + `/categories/${category}`;
export const READ_EMAIL = (id) => PREFIX + `/${id}/read`;
export const UNREAD_EMAIL = (id) => PREFIX + `/${id}/unread`;
export const READ_EMAILS = (ids) => PREFIX + `/read?${convertArrayToQueryString('ids', ids)}`;
export const UNREAD_EMAILS = (ids) => PREFIX + `/unread?${convertArrayToQueryString('ids', ids)}`;