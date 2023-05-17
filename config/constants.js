import Cookies from "js-cookie";
export const API_URL = process.env.apiUrl;
export const APP_URL = process.env.appUrl;
export const BASE_URL = process.env.baseUrl;
export const PAGINATION_LIMIT = Cookies.get("rows_per_page") > 0 ? Cookies.get("rows_per_page") : 20;
