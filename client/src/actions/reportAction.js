import axios from "axios";
import {
    GET_ERRORS,
    USER_ADD,
    USER_UPDATE
} from "./types";

export const uploadReport = (body, history) => dispatch => {
    console.log(body);
    axios
        .post("/api/report-data", body,{ headers: { "Content-Type": "multipart/form-data" }})
        .then(res =>
            dispatch({
                type: USER_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};