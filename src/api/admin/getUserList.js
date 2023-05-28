import axios from "axios";
import {getRoleName} from "@/utils";


export function getUserList(data) {
    return axios.post("/admin/users/list", data
    ).then((res) => {
        res["users"].forEach(it => it.role_name = getRoleName(it.role))
        return res
    })
}