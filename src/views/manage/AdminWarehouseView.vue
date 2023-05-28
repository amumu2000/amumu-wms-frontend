<script setup>

import {getWarehouseList, addWarehouse, deleteWarehouse, editWarehouse} from "@/api";
import {reactive, ref} from "vue";

const allWarehouseData = ref()
const currentWarehouseData = ref(null)
const targetWarehouseData = ref({})
const newWarehouseData = reactive({})
const filterForm = reactive({})
const multiSelectionID = ref([])


const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogEditFormVisible = ref(false)
const dialogNewFormVisible = ref(false)
const drawerVisible = ref(false)
const formLabelWidth = "180px"

const updateCurrentWarehouseData = () => {
    currentWarehouseData.value = allWarehouseData.value.filter((item, index) => {
        return index < currentPage.value * pageSize.value &&
            index >= pageSize.value * (currentPage.value - 1)
    })
}
const init = (filter) => {
    getWarehouseList(filter).then((data) => {
        const warehouses = data["warehouses"]
        allWarehouseData.value = warehouses
        targetWarehouseData.value = warehouses[0]
        total.value = warehouses.length
        setTimeout(() => {
            updateCurrentWarehouseData()
        }, 200)
    })
}

const initForm = () => {
    allWarehouseData.value = []
    currentWarehouseData.value = null
    init({})
}

const handleCurrentChange = (e) => {
    currentPage.value = e
    updateCurrentWarehouseData()
};

const handleSizeChange = (e) => {
    pageSize.value = e
    updateCurrentWarehouseData()
};

const handleEdit = (index, row) => {
    targetWarehouseData.value = {...row}
    targetWarehouseData.value.password = ""
    dialogEditFormVisible.value = true
}

const editConfirm = () => {

    editWarehouse({...targetWarehouseData.value}).then(() => {
        dialogEditFormVisible.value = false
        initForm()
    })
}

const handleDelete = (index, row) => {
    deleteWarehouse([row.id]).then(() => {
        initForm()
    })

}

const handleSelectionChange = (val) => {
    multiSelectionID.value = val
}

const handleMultiDelete = () => {
    let IDs = []
    multiSelectionID.value.forEach(it => IDs.push(it["id"]))
    deleteWarehouse(IDs).then(() => {
        initForm()
    })
}
const addWarehouseConfirm = () => {
    dialogNewFormVisible.value = false
    let form = {...newWarehouseData}
    addWarehouse(form).then(() => {
        initForm()
    })
}

const handleFilter = () => {
    let form = {...filterForm}
    if (form.manager_id) {
        form.manager_id = parseInt(form.manager_id)
    }
    init(form)
    drawerVisible.value = false
}

initForm()
</script>

<template>
    <div style="display: flex;flex-direction: column;align-items: flex-start">
        <div>
            <el-table
                :data="currentWarehouseData"
                stripe style="width: 900px"
                @selection-change="handleSelectionChange"
                v-loading="currentWarehouseData===null" class="table"
                height="500">
                <el-table-column type="selection" width="30"/>
                <el-table-column prop="id" label="仓库ID" width="100px"/>
                <el-table-column prop="warehouse_name" label="仓库名"/>
                <el-table-column prop="manager_id" label="管理员ID"/>
                <el-table-column prop="location" label="仓库地址"/>
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
    <el-dialog v-model="dialogEditFormVisible" title="编辑仓库" width="650px">
        <el-form :model="targetWarehouseData">
            <el-form-item label="仓库ID" :label-width="formLabelWidth">
                <el-input v-model="targetWarehouseData.id" autocomplete="off" disabled/>
            </el-form-item>
            <el-form-item label="仓库名" :label-width="formLabelWidth">
                <el-input v-model="targetWarehouseData.warehouse_name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="仓库地址" :label-width="formLabelWidth">
                <el-input v-model="targetWarehouseData.location" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="管理员ID" :label-width="formLabelWidth">
                <el-input v-model="targetWarehouseData.manager_id" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="targetWarehouseData.comment" type="textarea"/>
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


    <el-dialog v-model="dialogNewFormVisible" title="新增仓库" width="650px">
        <el-form :model="newWarehouseData">
            <el-form-item label="仓库名" :label-width="formLabelWidth">
                <el-input v-model="newWarehouseData.warehouse_name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="仓库地址" :label-width="formLabelWidth">
                <el-input v-model="newWarehouseData.location" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="管理员ID" :label-width="formLabelWidth">
                <el-input v-model="newWarehouseData.manager_id" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="newWarehouseData.comment" autocomplete="off" type="textarea"/>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogNewFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addWarehouseConfirm">确定</el-button>
          </span>
        </template>
    </el-dialog>


    <!--    drawer-->
    <el-drawer
        v-model="drawerVisible"
        title="仓库筛选"
    >
        <div>
            <el-form :model="filterForm">
                <el-form-item label="仓库ID" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.id" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="仓库名" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.warehouse_name" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="仓库地址" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.location" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="管理员ID" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.manager_id" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.comment" autocomplete="off" type="textarea"/>
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
.el-textarea{
    width: 350px;
}
</style>