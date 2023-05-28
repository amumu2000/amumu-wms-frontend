import axios from "axios";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies()

export function login(form) {
    return axios.post("/users/login", form).then((data) => {
        const tkn = data["token"]
        if (tkn) {
            cookies.set("token", tkn)
            return true
        }
        return false
    })
}