const PREFIX = process.env.REACT_APP_API_ENDPOINT + "/api/emails";

export const GET_EMAILS = PREFIX + "/";
export const READ_EMAIL = (id) => PREFIX + `/${id}/read`;
export const UNREAD_EMAIL = (id) => PREFIX + `/${id}/unread`;
export const READ_EMAILS = (ids) => PREFIX + `/read?` + new URLSearchParams({ids}).toString();
export const UNREAD_EMAILS = (ids) => PREFIX + `/unread?` + new URLSearchParams({ids}).toString();