export default [
    {
        role_id: 0,
        role_list_item: [
            "/manage/console/myself",
            "/manage/console/aim",
            "/manage/console/dispatch",
            "/manage/console/goods",
            "/manage/console/admin/warehouse",
            "/manage/console/admin/users",
            "/manage/console/logs"],
        role_list_menu: ["主控舱段", "系统管理", "仓储管理"],
    }, {
        role_id: 1,
        role_list_item: [
            "/manage/console/myself",
            "/manage/console/aim",
            "/manage/console/dispatch",
            "/manage/console/goods",
        ],
        role_list_menu: ["主控舱段", "仓储管理"],
    }, {
        role_id: 2,
        role_list_item: [
            "/manage/console/myself",
            "/manage/console/aim",
            "/manage/console/worker",
        ],
        role_list_menu: ["主控舱段", "我的工作"],
    },
]