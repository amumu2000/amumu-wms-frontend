<script setup>

import {getGoodsList, addGoods, deleteGoods, editGoods} from "@/api";
import {ref} from "vue";

const allGoodsData = ref()
const currentGoodsData = ref(null)
const targetGoodsData = ref({})
const newGoodsData = ref({})
const filterForm = ref({})
const multiSelectionID = ref([])


const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogEditFormVisible = ref(false)
const dialogNewFormVisible = ref(false)
const drawerVisible = ref(false)
const drawer2Visible = ref(false)
const formLabelWidth = "180px"

const updateCurrentGoodsData = () => {
    currentGoodsData.value = allGoodsData.value.filter((item, index) => {
        return index < currentPage.value * pageSize.value &&
            index >= pageSize.value * (currentPage.value - 1)
    })
}
const init = (filter) => {
    getGoodsList(filter).then((data) => {
        const goods = data["goods"]
        goods.forEach(it => {
            it.price /= 100
        })
        allGoodsData.value = goods
        targetGoodsData.value = goods[0]
        total.value = goods.length
        setTimeout(() => {
            updateCurrentGoodsData()
        }, 200)
    })
}

const initForm = () => {
    allGoodsData.value = []
    currentGoodsData.value = null
    init({})
}

const handleCurrentChange = (e) => {
    currentPage.value = e
    updateCurrentGoodsData()
};

const handleSizeChange = (e) => {
    pageSize.value = e
    updateCurrentGoodsData()
};

const handleEdit = (index, row) => {
    targetGoodsData.value = {...row}
    dialogEditFormVisible.value = true
}

const editConfirm = () => {
    let form = {...targetGoodsData.value}
    form.goods_id = form.id
    form.price *= 100
    form.price = Math.round(form.price)
    editGoods(form).then(() => {
        dialogEditFormVisible.value = false
        initForm()
    })
}

const handleDelete = (index, row) => {
    let IDs = [row.id]
    deleteGoods(IDs).then(() => {
        initForm()
    })

}

const handleSelectionChange = (val) => {
    multiSelectionID.value = val
}

const handleMultiDelete = () => {
    let IDs = []
    multiSelectionID.value.forEach(it => IDs.push(it["id"]))
    deleteGoods(IDs).then(() => {
        initForm()
    })
}
const addGoodsConfirm = () => {
    dialogNewFormVisible.value = false
    let form = {...newGoodsData.value}
    form.price = parseInt(form.price) * 100
    addGoods(form).then(() => {
        initForm()
    })
}

const handleFilter = () => {
    let form = {...filterForm.value}
    if (form.goods_id) {
        form.goods_id = parseInt(form.goods_id)
    }
    form.price = Math.round(form.price * 100)
    console.log(form)
    init(form)
    drawerVisible.value = false
    filterForm.value = {}
}

const handleVDetail = (index, row) => {
    targetGoodsData.value = {...row}
    console.log(targetGoodsData.value.inventory)
    drawer2Visible.value = true
}

initForm()
</script>

<template>
    <div style="display: flex;flex-direction: column;align-items: flex-start">
        <div>
            <el-table
                :data="currentGoodsData"
                stripe style="width: 900px"
                @selection-change="handleSelectionChange"
                v-loading="currentGoodsData===null" class="table"
                height="500">
                <el-table-column type="selection" width="30"/>
                <el-table-column prop="id" label="货物ID" width="100px"/>
                <el-table-column prop="good_name" label="货物名"/>
                <el-table-column prop="category" label="类别" width="100px"/>
                <el-table-column prop="price" label="价格" width="100px"/>
                <el-table-column prop="total_count" label="总库存" width="100px"/>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" @click="handleVDetail(scope.$index, scope.row)">库存明细</el-button>
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
    <el-dialog v-model="dialogEditFormVisible" title="编辑货物" width="650px" destroy-on-close>
        <el-form :model="targetGoodsData">
            <el-form-item label="货物ID" :label-width="formLabelWidth">
                <el-input v-model="targetGoodsData.id" autocomplete="off" disabled/>
            </el-form-item>
            <el-form-item label="货物名" :label-width="formLabelWidth">
                <el-input v-model="targetGoodsData.good_name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="类别" :label-width="formLabelWidth">
                <el-input v-model="targetGoodsData.category" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
                <el-input v-model="targetGoodsData.price" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="targetGoodsData.comment" type="textarea"/>
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


    <el-dialog v-model="dialogNewFormVisible" title="新增货物" width="650px" destroy-on-close>
        <el-form :model="newGoodsData">
            <el-form-item label="货物名" :label-width="formLabelWidth">
                <el-input v-model="newGoodsData.good_name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="货物类别" :label-width="formLabelWidth">
                <el-input v-model="newGoodsData.category" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="newGoodsData.comment" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="价格(元)" :label-width="formLabelWidth">
                <el-input type="number" v-model="newGoodsData.price" autocomplete="off"/>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogNewFormVisible = false">取消</el-button>
            <el-button type="primary" @click="addGoodsConfirm">确定</el-button>
          </span>
        </template>
    </el-dialog>


    <!--    drawer-->
    <el-drawer
        v-model="drawerVisible"
        title="货物筛选"
    >
        <div>
            <el-form :model="filterForm">
                <el-form-item label="货物ID" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.goods_id" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="仓库名" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.goods_name" autocomplete="off"/>
                </el-form-item>

                <el-form-item label="类别" :label-width="formLabelWidth">
                    <el-input v-model="filterForm.category" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="价格(元)" :label-width="formLabelWidth">
                    <el-input type="number" v-model="filterForm.price" autocomplete="off"/>
                </el-form-item>
                <div style="display: flex;justify-content: right">
                    <el-button type="primary" @click="handleFilter">筛选</el-button>
                    <el-button @click="drawerVisible = false">取消</el-button>
                </div>
            </el-form>
        </div>
    </el-drawer>

    <el-drawer v-model="drawer2Visible" title="库存明细">
        <div>
            <el-table :data="targetGoodsData.inventory" style="margin: 0 auto;width: 240px">
                <el-table-column prop="warehouse_id" align="center" label="仓库ID" width="120px"/>
                <el-table-column prop="count" align="center" label="库存量" width="120px"/>
            </el-table>
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

.el-textarea {
    width: 350px;
}
</style>