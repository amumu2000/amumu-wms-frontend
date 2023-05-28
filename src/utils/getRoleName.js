import roleList from "./list/roleList";

export function getRoleName(id) {
    let name = ""
    let len = roleList.length
    for (let i = 0; i < len; i++) {
        if (roleList[i].role_id === id) {
            name = roleList[i].role_name
            break
        }
    }
    return name
}