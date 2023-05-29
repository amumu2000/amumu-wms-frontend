import axios from "axios";

export function getLogsList(data) {
    return axios.post("/logs/list", data
    ).then((res) => {
        return res
    })
}