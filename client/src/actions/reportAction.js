import axios from "axios";
import {
    GET_ERRORS,
    USER_ADD,
    USER_UPDATE
} from "./types";

export const uploadReport = async (body, history) => {
    console.log(body);
    const uploadFile = axios.post("/api/report-data", body, { headers: { "Content-Type": "multipart/form-data" } });

    return  await uploadFile;
};