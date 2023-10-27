import axios from "axios";

export const api = axios.create({
    baseURL:"https://agendaapi-zei8.onrender.com",
    timeout: 15000,
})