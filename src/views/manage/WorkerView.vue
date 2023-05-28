<script setup>

import {getDispatchList, completeDispatch, rejectDispatch} from "@/api";
import {ref} from "vue";
import statusList from "@/utils/list/statusList";
import typeList from "@/utils/list/typeList";

const allDispatchData = ref()
const currentDispatchData = ref(null)
const targetDispatchData = ref({})
const rejectDispatchData = ref({})
const filterForm = ref({})
const multiSelectionID = ref([])


const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogDetailFormVisible = ref(false)
const dialogRejectFormVisible = ref(false)

const drawerVisible = ref(false)
const formLabelWidth = "180px"

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

const handleDetail = (index, row) => {
    targetDispatchData.value = {...row}
    dialogDetailFormVisible.value = true
}

const handleReject = (index, row) => {
    dialogRejectFormVisible.value = true
    rejectDispatchData.value.dispatch_id = row.id
}

const rejectConfirm = () => {
    let form = {...rejectDispatchData.value}
    rejectDispatch(form).then(() => {
        dialogRejectFormVisible.value = false
    })
}

const handleCompleteDispatch = (index, row) => {
    completeDispatch([row.id]).then(() => {
        initForm()
    })
}


const handleSelectionChange = (val) => {
    multiSelectionID.value = val
}

const handleMultiComplete = () => {
    let IDs = []
    multiSelectionID.value.forEach(it => IDs.push(it["id"]))
    console.log(IDs)
    completeDispatch(IDs).then(() => {
        initForm()
    })
}

const handleFilter = () => {
    let form = {...filterForm.value}
    if (form.Dispatch_id) {
        form.Dispatch_id = parseInt(form.Dispatch_id)
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
                stripe style="width: 900px"
                @selection-change="handleSelectionChange"
                v-loading="currentDispatchData===null" class="table"
                height="500">
                <el-table-column type="selection" width="30"/>
                <el-table-column prop="id" label="派遣ID" width="100px"/>
                <el-table-column prop="src" label="原仓库" width="180px"/>
                <el-table-column prop="dest" label="目标仓库" width="180px"/>
                <el-table-column prop="status_name" align="center" label="派遣状态" width="80px"/>
                <el-table-column prop="type_name" align="center" label="派遣类型" width="80px"/>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                        <el-button size="small" type="danger" @click="handleReject(scope.$index, scope.row)">无法完成
                        </el-button>
                        <el-button
                            size="small"
                            type="success"
                            @click="handleCompleteDispatch(scope.$index, scope.row)">
                            完成
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 10px 0">
                <el-button type="primary" @click="initForm">刷新</el-button>
                <el-button type="primary" @click="drawerVisible = true">筛选</el-button>
                <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    title="确认全部完成?"
                    @confirm="handleMultiComplete"
                >
                    <template #reference>
                        <el-button type="success">批量完成</el-button>
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
    <el-dialog v-model="dialogDetailFormVisible" title="派遣详情" width="1250px">
        <el-form :model="targetDispatchData" :inline="true" :disabled="true">
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
            <el-button @click="dialogDetailFormVisible = false">关闭</el-button>
          </span>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogRejectFormVisible" title="详情" width="650px">
        <el-form :model="rejectDispatchData">
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="rejectDispatchData.reject_comment" autocomplete="off" type="textarea"/>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogRejectFormVisible = false">取消</el-button>
            <el-button @click="rejectConfirm">确定</el-button>
          </span>
        </template>
    </el-dialog>
    <!--    派遣筛选-->
    <el-drawer v-model="drawerVisible" title="派遣筛选">
        <div>
            <el-form :model="filterForm">
                <el-form-item label="派遣ID" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.dispatch_id" autocomplete="off" type="number"/>
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