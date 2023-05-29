<script setup>

import {getDispatchList, addDispatch, deleteDispatch, editDispatch, confirmDispatch, self} from "@/api";
import {ref} from "vue";
import statusList from "@/utils/list/statusList";
import typeList from "@/utils/list/typeList";

const allDispatchData = ref()
const currentDispatchData = ref(null)
const targetDispatchData = ref({})
const newDispatchData = ref({})
const filterForm = ref({})
const multiSelectionID = ref([])


const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogEditFormVisible = ref(false)
const dialogNewFormVisible = ref(false)
const drawerVisible = ref(false)
const formLabelWidth = "180px"
let role = null;
self({}).then((res) => {
    role = res["user"].role
    console.log(role)
})


const updateCurrentDispatchData = () => {
    currentDispatchData.value = allDispatchData.value.filter((item, index) => {
        return index < currentPage.value * pageSize.value &&
            index >= pageSize.value * (currentPage.value - 1)
    })
}


const init = (filter) => {
    getDispatchList(filter).then((data) => {
        const dispatches = data["dispatches"]
        allDispatchData.value = dispatches
        targetDispatchData.value = dispatches[0]
        total.value = dispatches.length
        setTimeout(() => {
            updateCurrentDispatchData()
        }, 200)
    })
}

const initForm = () => {
    allDispatchData.value = []
    currentDispatchData.value = null
    init({})
}

const handleCurrentChange = (e) => {
    currentPage.value = e
    updateCurrentDispatchData()
};

const handleSizeChange = (e) => {
    pageSize.value = e
    updateCurrentDispatchData()
};

const handleEdit = (index, row) => {
    targetDispatchData.value = {...row}
    dialogEditFormVisible.value = true
}

const editDispatchConfirm = () => {
    let form = {...targetDispatchData.value}
    form.executor_id = parseInt(form.executor_id)
    form.dispatch_id = parseInt(form.id)
    form.src_id = parseInt(form.src_id)
    form.dest_id = parseInt(form.dest_id)
    form.count = parseInt(form.count)
    form.goods_id = parseInt(form.goods_id)
    console.log(form)
    editDispatch(form).then(() => {
        dialogEditFormVisible.value = false
        initForm()
    })
}

const handleDelete = (index, row) => {
    let IDs = [row.id]
    deleteDispatch(IDs).then(() => {
        initForm()
    })

}

const handleDispatchConfirm = (index, row) => {
    confirmDispatch(row.id).then(() => {
        initForm()
    })
}


const handleSelectionChange = (val) => {
    multiSelectionID.value = val
}

const handleMultiDelete = () => {
    let IDs = []
    multiSelectionID.value.forEach(it => IDs.push(it["id"]))
    deleteDispatch(IDs).then(() => {
        initForm()
    })
}
const addDispatchConfirm = () => {
    let form = {...newDispatchData.value}
    if (form.src === undefined) form.src = ""
    if (form.dest === undefined) form.dest = ""
    if (form.dest_id === undefined) form.dest = 0
    if (form.src_id === undefined) form.src_id = 0
    form.start_time = Date.parse(form.start_time.toString()) / 1000
    form.expect_end_time = Date.parse(form.expect_end_time.toString()) / 1000

    form.executor_id = parseInt(form.executor_id)
    form.src_id = parseInt(form.src_id)
    form.dest_id = parseInt(form.dest_id)
    form.count = parseInt(form.count)
    form.goods_id = parseInt(form.goods_id)


    addDispatch(form).then(() => {
        initForm()
        dialogNewFormVisible.value = false
    })
}

const handleFilter = () => {
    let form = {...filterForm.value}
    if (form.dispatch_id) {
        form.dispatch_id = parseInt(form.dispatch_id)
    }
    console.log(form)
    init(form)
    drawerVisible.value = false
    filterForm.value = {}
}

initForm()
</script>

<template>
    <div style="display: flex;flex-direction: column;align-items: flex-start">
        <div>
            <el-table
                :data="currentDispatchData"
                stripe style="width: 1200px"
                @selection-change="handleSelectionChange"
                v-loading="currentDispatchData===null" class="table"
                height="500">
                <el-table-column type="selection" width="30"/>
                <el-table-column prop="id" align="center" label="派遣ID" width="100"/>
                <el-table-column prop="src" label="原仓库"/>
                <el-table-column prop="dest" label="目标仓库"/>
                <el-table-column prop="status_name" align="center" label="派遣状态"/>
                <el-table-column prop="type_name" align="center" label="派遣类型"/>
                <el-table-column label="操作" align="center" v-if="role">
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
                        <el-button
                            size="small"
                            type="success"
                            @click="handleDispatchConfirm(scope.$index, scope.row)">
                            确认
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 10px 0">
                <el-button type="primary" @click="initForm">刷新</el-button>
                <el-button type="primary" @click="drawerVisible = true">筛选</el-button>
                <el-button type="primary" @click="dialogNewFormVisible = true" v-if="role">新增</el-button>
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
    <!--    editDispatch dialog-->
    <el-dialog v-model="dialogEditFormVisible" title="编辑派遣" width="1250px" destroy-on-close>
        <el-form :model="targetDispatchData" :inline="true">
            <div class="form-sub-title">货物配置</div>
            <el-form-item label="源仓库ID" :label-width="formLabelWidth">
                <el-input v-model="targetDispatchData.src_id" autocomplete="off" type="number"/>
            </el-form-item>
            <el-form-item label="源仓库名" :label-width="formLabelWidth">
                <el-input v-model="targetDispatchData.src" autocomplete="off"/>
            </el-form-item>

            <el-form-item label="目标仓库ID" :label-width="formLabelWidth">
                <el-input v-model="targetDispatchData.dest_id" autocomplete="off" type="number"/>
            </el-form-item>
            <el-form-item label="目标仓库名" :label-width="formLabelWidth">
                <el-input v-model="targetDispatchData.dest" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="货物ID" :label-width="formLabelWidth">
                <el-input v-model="targetDispatchData.goods_id" autocomplete="off" type="number"/>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
                <el-input v-model="targetDispatchData.count" autocomplete="off" type="number"/>
            </el-form-item>


            <div class="form-sub-title">派遣配置</div>
            <el-form-item label="派遣人员ID" :label-width="formLabelWidth">
                <el-input v-model="targetDispatchData.executor_id" autocomplete="off" type="number"/>
            </el-form-item>
            <el-form-item label="派遣类型" :label-width="formLabelWidth">
                <el-select v-model="targetDispatchData.type">
                    <el-option
                        v-for="item in typeList"
                        :key="item.type_id"
                        :label="item.type_name"
                        :value="item.type_id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" :label-width="formLabelWidth">
                <el-date-picker style="width: 350px" v-model="targetDispatchData.start_time" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="预计结束时间" :label-width="formLabelWidth">
                <el-date-picker style="width: 350px" v-model="targetDispatchData.expect_end_time" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="派遣状态" :label-width="formLabelWidth">
                <el-select v-model="targetDispatchData.status">
                    <el-option
                        v-for="item in statusList"
                        :key="item.status_id"
                        :label="item.status_name"
                        :value="item.status_id"
                    />
                </el-select>
            </el-form-item>
            <el-col>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="targetDispatchData.comment" autocomplete="off" type="textarea"/>
                </el-form-item>
            </el-col>

        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogEditFormVisible = false">取消</el-button>
            <el-button type="primary" @click="editDispatchConfirm">确定</el-button>
          </span>
        </template>
    </el-dialog>
    <!--    add dialog-->
    <el-dialog v-model="dialogNewFormVisible" title="新增派遣" width="1250px" destroy-on-close>
        <el-form :model="newDispatchData" :inline="true">
            <div class="form-sub-title">货物配置</div>
            <el-form-item label="源仓库ID" :label-width="formLabelWidth">
                <el-input v-model="newDispatchData.src_id" autocomplete="off" type="number"/>
            </el-form-item>
            <el-form-item label="源仓库名" :label-width="formLabelWidth">
                <el-input v-model="newDispatchData.src" autocomplete="off"/>
            </el-form-item>

            <el-form-item label="目标仓库ID" :label-width="formLabelWidth">
                <el-input v-model="newDispatchData.dest_id" autocomplete="off" type="number"/>
            </el-form-item>
            <el-form-item label="目标仓库名" :label-width="formLabelWidth">
                <el-input v-model="newDispatchData.dest" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="货物ID" :label-width="formLabelWidth">
                <el-input v-model="newDispatchData.goods_id" autocomplete="off" type="number"/>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
                <el-input v-model="newDispatchData.count" autocomplete="off" type="number"/>
            </el-form-item>


            <div class="form-sub-title">派遣配置</div>
            <el-form-item label="派遣人员ID" :label-width="formLabelWidth">
                <el-input v-model="newDispatchData.executor_id" autocomplete="off" type="number"/>
            </el-form-item>
            <el-form-item label="派遣类型" :label-width="formLabelWidth">
                <el-select v-model="newDispatchData.type">
                    <el-option
                        v-for="item in typeList"
                        :key="item.type_id"
                        :label="item.type_name"
                        :value="item.type_id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" :label-width="formLabelWidth">
                <el-date-picker style="width: 350px" v-model="newDispatchData.start_time" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="预计结束时间" :label-width="formLabelWidth">
                <el-date-picker style="width: 350px" v-model="newDispatchData.expect_end_time" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="派遣状态" :label-width="formLabelWidth">
                <el-select v-model="newDispatchData.status">
                    <el-option
                        v-for="item in statusList"
                        :key="item.status_id"
                        :label="item.status_name"
                        :value="item.status_id"
                    />
                </el-select>
            </el-form-item>
            <el-col>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="newDispatchData.comment" autocomplete="off" type="textarea"/>
                </el-form-item>
            </el-col>

        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogNewFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addDispatchConfirm">确定</el-button>
          </span>
        </template>
    </el-dialog>


    <!--    drawer-->
    <el-drawer
        v-model="drawerVisible"
        title="派遣筛选"
    >
        <div>
            <el-form :model="filterForm">
                <el-form-item label="派遣ID" :label-width="formLabelWidth">
                    <el-input type="number" v-model="filterForm.dispatch_id" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="管理员ID" :label-width="formLabelWidth">
                    <el-input type="number" v-model="filterForm.manager_id" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="派遣状态" :label-width="formLabelWidth">
                    <el-select v-model="filterForm.status">
                        <el-option
                            v-for="item in statusList"
                            :key="item.status_id"
                            :label="item.status_name"
                            :value="item.status_id"
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

.el-select {
    width: 350px;
}

.el-textarea {
    width: 350px;
}


.form-sub-title {
    padding-left: 50px;
    padding-bottom: 10px;
    border-bottom: 1px #ccc solid;
    margin-bottom: 10px;
}
</style>