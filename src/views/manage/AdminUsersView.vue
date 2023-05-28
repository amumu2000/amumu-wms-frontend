<script setup>

import {getUserList, addUser, deleteUser, editUser} from "@/api";
import {reactive, ref} from "vue";


const allUserData = ref()
const currentUserData = ref(null)
const targetUserData = ref({})
const newUserData = reactive({})
const filterForm = reactive({})
const multiSelectionID = ref([])


const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogEditFormVisible = ref(false)
const dialogNewFormVisible = ref(false)
const drawerVisible = ref(false)
const formLabelWidth = "180px"

const updateCurrentUserData = () => {
    currentUserData.value = allUserData.value.filter((item, index) => {
        return index < currentPage.value * pageSize.value &&
            index >= pageSize.value * (currentPage.value - 1)
    })
}
const init = (filter) => {
    getUserList(filter).then((data) => {
        const users = data["users"]
        allUserData.value = users
        targetUserData.value = users[0]
        total.value = users.length
        setTimeout(() => {
            updateCurrentUserData()
        }, 200)

    })
}

const initForm = () => {
    allUserData.value = []
    currentUserData.value = null
    init({})
}

const handleCurrentChange = (e) => {
    currentPage.value = e
    updateCurrentUserData()
};

const handleSizeChange = (e) => {
    pageSize.value = e
    updateCurrentUserData()
};

const handleEdit = (index, row) => {
    targetUserData.value = {...row}
    targetUserData.value.password = ""
    dialogEditFormVisible.value = true
}

const editConfirm = () => {
    editUser({...targetUserData.value}).then(() => {
        dialogEditFormVisible.value = false
        initForm()
    })
}

const handleDelete = (index, row) => {
    deleteUser([row.id]).then(() => {
        initForm()
    })

}

const handleSelectionChange = (val) => {
    multiSelectionID.value = val
}

const handleMultiDelete = () => {
    let IDs = []
    multiSelectionID.value.forEach(it => IDs.push(it["id"]))
    deleteUser(IDs).then(() => {
        initForm()
    })
}
const addUserConfirm = () => {
    dialogNewFormVisible.value = false
    addUser({...newUserData}).then(() => {
        initForm()
    })
}

const handleFilter = () => {
    let form = {...filterForm}
    form.user_id = parseInt(form.user_id)
    currentUserData.value = null
    init(form)
    drawerVisible.value = false
}

initForm()
</script>

<template>
    <div style="display: flex;flex-direction: column;align-items: flex-start">
        <div>
            <el-table
                :data="currentUserData"
                stripe style="width: 900px"
                @selection-change="handleSelectionChange"
                v-loading="currentUserData===null" class="table"
                height="500">
                <el-table-column type="selection" width="30"/>
                <el-table-column prop="id" label="用户ID" width="100px"/>
                <el-table-column prop="username" label="用户名"/>
                <el-table-column prop="email" label="邮箱"/>
                <el-table-column prop="role_name" label="角色"/>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-popconfirm
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            title="确认删除?"
                            @confirm="handleDelete(scope.$index, scope.row)"
                        >
                            <template #reference>
                                <el-button
                                    size="small"
                                    type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 10px 0">
                <el-button type="primary" @click="initForm">刷新</el-button>
                <el-button type="primary" @click="drawerVisible = true">筛选</el-button>
                <el-button type="primary" @click="dialogNewFormVisible = true">新增</el-button>
                <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    title="确认删除?"
                    @confirm="handleMultiDelete"
                >
                    <template #reference>
                        <el-button type="danger">删除选中</el-button>
                    </template>
                </el-popconfirm>
            </div>
            <el-pagination
                :page-sizes="[10,50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
    <!--    editGoods dialog-->
    <el-dialog v-model="dialogEditFormVisible" title="编辑用户" width="650px">
        <el-form :model="targetUserData">
            <el-form-item label="用户ID" :label-width="formLabelWidth">
                <el-input v-model="targetUserData.id" autocomplete="off" disabled/>
            </el-form-item>
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="targetUserData.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="targetUserData.email" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="targetUserData.password" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="targetUserData.role_name" placeholder="Please select a role">
                    <el-option
                        v-for="item in roleList"
                        :key="item.role_id"
                        :label="item.role_name"
                        :value="item.role_id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogEditFormVisible = false">取消</el-button>
            <el-button type="primary" @click="editConfirm">确定</el-button>
          </span>
        </template>
    </el-dialog>
    <!--    add dialog-->


    <el-dialog v-model="dialogNewFormVisible" title="新增用户" width="650px">
        <el-form :model="newUserData">
            <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="newUserData.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="newUserData.email" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="newUserData.password" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="newUserData.role" placeholder="Please select a role">
                    <el-option
                        v-for="item in roleList"
                        :key="item.role_id"
                        :label="item.role_name"
                        :value="item.role_id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogNewFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addUserConfirm">确定</el-button>
          </span>
        </template>
    </el-dialog>


    <!--    drawer-->
    <el-drawer
        v-model="drawerVisible"
        title="用户筛选"
    >
        <div>
            <el-form :model="filterForm">
                <el-form-item label="用户ID" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.user_id" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.username" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.email" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="filterForm.role">
                        <el-option
                            v-for="item in roleList"
                            :key="item.role_id"
                            :label="item.role_name"
                            :value="item.role_id"
                        />
                    </el-select>
                </el-form-item>
                <div style="display: flex;justify-content: right">
                    <el-button type="primary" @click="handleFilter">筛选</el-button>
                    <el-button @click="drawerVisible = false">取消</el-button>
                </div>

            </el-form>

        </div>
    </el-drawer>
</template>

<style scoped>
.drawer {
    width: 500px;
}

.el-input {
    width: 350px;
}

.el-pagination {
    justify-content: center;
}
</style>