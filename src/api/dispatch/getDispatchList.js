import axios from "axios";
import {getStatusName, getTypeName} from "@/utils";

export function getDispatchList(data) {
    return axios.post("/dispatch/list", data).then((res) => {
        res["dispatches"].forEach((it) => {
            it.status_name = getStatusName(it.status)
            it.type_name = getTypeName(it.type)
        })
        return res
    })
}