import permissionList from "./list/permissionList";

export function checkShowMenuItem(routePath, role) {
    if (role === undefined) return false
    else {
        let len = permissionList.length
        for (let i = 0; i < len; i++) {
            let ff = permissionList[i]
            if (ff.role_id === role) {
                return ff.role_list_item.includes(routePath);
            }
        }
    }
}