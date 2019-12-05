<template>
    <div class="app">
        <div class="content-header">
            <h1>员工管理</h1>
        </div>
        <div class="app-container">
            <div class="box">
                <div class="filter-container">
                    <el-input v-model="pagination.queryString" placeholder="员工姓名" style="width: 200px;"
                              class="filter-item"/>
                    <el-button class="dalfBut" @click="findPage()">查询</el-button>
                    <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>
                </div>
                <el-table :data="dataList" size="small" current-row-key="id" stripe highlight-current-row>
                    <el-table-column type="index" align="center" label="序号"/>
                    <el-table-column prop="name" label="员工姓名" align="center"/>
                    <el-table-column prop="dept" label="部门" align="center" />
                    <el-table-column prop="sex" label="性别" align="center"/>
                    <!--<el-table-column prop="telNum" label="电话" align="center"/>-->
                    <el-table-column prop="time" label="创建时间" align="center"/>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination :current-page="pagination.currentPage" :page-size="pagination.pageSize"
                                   :total="pagination.total" class="pagiantion"
                                   layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
                </div>
                <!-- 新增标签弹层 -->
                <div class="add-form">
                    <el-dialog :visible.sync="dialogFormVisible" title="新增部门人员">
                        <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right"
                                 label-width="100px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="员工姓名" prop="name">
                                        <el-input v-model="formData.name"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="部门" prop="dept">
                                        <el-input v-model="formData.dept"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="性别" prop="sex">
                                        <el-input v-model="formData.sex"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="创建时间" prop="time">
                                        <el-date-picker
                                                v-model="formData.time"
                                                type="date"
                                                placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>

                            </el-row>

                            <!--<el-row>
                                <el-col :span="24">
                                    <el-form-item label="项目说明">
                                        <el-input v-model="formData.remark" type="textarea" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="注意事项">
                                        <el-input v-model="formData.attention" type="textarea" />
                                    </el-form-item>
                                </el-col>
                            </el-row>-->

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取消</el-button>
                            <el-button type="primary" @click="handleAdd()">确定</el-button>
                        </div>
                    </el-dialog>
                </div>

                <!-- 编辑标签弹层 -->
                <div class="add-form">
                    <el-dialog :visible.sync="dialogFormVisible4Edit" title="编辑部门人员">
                        <el-form ref="dataEditForm" :model="formData" :rules="rules" label-position="right"
                                 label-width="100px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="员工姓名" prop="name">
                                        <el-input v-model="formData.name"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="部门" prop="dept">
                                        <el-input v-model="formData.dept"/>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="性别" prop="sex">
                                        <el-input v-model="formData.sex"/>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="创建时间" prop="time">
                                        <el-date-picker
                                                v-model="formData.time"
                                                type="date"
                                                placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>

                            </el-row>

                            <!--<el-row>
                                <el-col :span="24">
                                    <el-form-item label="项目说明">
                                        <el-input v-model="formData.remark" type="textarea" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="注意事项">
                                        <el-input v-model="formData.attention" type="textarea" />
                                    </el-form-item>
                                </el-col>
                            </el-row>-->

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
                            <el-button type="primary" @click="handleEdit()">确定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: '',
        components: {},
        data() {
            return {
                pagination: {
                    // 分页相关模型数据
                    currentPage: 1, // 当前页码
                    pageSize: 10, // 每页显示的记录数
                    total: 0, // 总记录数
                    queryString: null // 查询条件
                },
                dataList: [], // 当前页要展示的分页列表数据
                formData: {}, // 表单数据
                dialogFormVisible: false, // 增加表单是否可见
                dialogFormVisible4Edit: false, // 编辑表单是否可见
                rules: {
                    // 校验规则
                    name: [{ required: true, message: '员工姓名为必填项', trigger: 'blur' }],
                    dept: [{ required: true, message: '部门为必填项', trigger: 'blur' }],
                    sex: [{ required: true, message: '性别为必填项', trigger: 'blur' }],
                    time: [{ required: true, message: '创建时间为必填项', trigger: 'blur' }]
                }
            };
        },
        created() {
            this.findPage(); // VUE对象初始化完成后调用分页查询方法，完成分页查询
        },
        mounted() {
        },
        methods: {
            // 编辑
            handleEdit() {
                // 进行表单校验
                this.$refs['dataEditForm'].validate(valid => {
                    if (valid) {
                        // 表单校验通过，可以提交数据
                        axios
                            .post('/checkitem/edit.do', this.formData)
                            .then(res => {
                                if (res.data.flag) {
                                    // 弹出成功提示信息
                                    this.$message({
                                        type: 'success',
                                        message: res.data.message
                                    });
                                } else {
                                    // 执行失败
                                    this.$message.error(res.data.message);
                                }
                            })
                            .finally(() => {
                                // 不管成功还是失败，都调用分页查询方法
                                this.findPage();
                                // 隐藏编辑窗口
                                this.dialogFormVisible4Edit = false;
                            });
                    } else {
                        // 表单校验不通过
                        this.$message.error('表单数据校验失败!');
                        return false;
                    }
                });
            },
            // 添加
            handleAdd() {
                // 进行表单校验
                this.$refs['dataAddForm'].validate(valid => {
                    if (valid) {
                        // 表单校验通过，发生ajax请求，将录入的数据提交到后台进行处理
                        console.log(this.formData);
                        axios.post('/checkitem/add.do', this.formData).then(res => {
                            // 关闭新增窗口
                            this.dialogFormVisible = false;
                            if (res.data.flag) {
                                // 执行成功
                                // 新增成功后，重新调用分页查询方法，查询出最新的数据
                                this.findPage();
                                // 弹出提示信息
                                this.$message({
                                    message: res.data.message,
                                    type: 'success'
                                });
                            } else {
                                // 执行失败
                                // 弹出提示
                                this.$message.error(res.data.message);
                            }
                        });
                    } else {
                        // 校验不通过
                        this.$message.error('数据校验失败，请检查你的输入信息是否正确！');
                        return false;
                    }
                });
            },
            // 分页查询
            findPage() {
                // 发送ajax请求，提交分页相关请求参数（页码、每页显示记录数、查询条件）
                var param = {
                    currentPage: this.pagination.currentPage,
                    pageSize: this.pagination.pageSize,
                    queryString: this.pagination.queryString
                };
                axios.post('/checkitem/findPage.do', param).then(res => {
                    // 解析Controller响应回的数据，为模型数据赋值
                    this.pagination.total = res.data.total;
                    this.dataList = res.data.rows;
                });
            },
            // 重置表单
            resetForm() {
                this.formData = {}; // 重置数据
            },
            // 弹出添加窗口
            handleCreate() {
                // 弹出新增窗口
                this.dialogFormVisible = true;
                this.resetForm();
            },
            // 弹出编辑窗口
            handleUpdate(row) {
                // 弹出编辑窗口
                this.dialogFormVisible4Edit = true;
                // 回显数据，发送ajax请求根据ID查询当前检查项数据
                axios.get('/checkitem/findById.do?id=' + row.id).then(res => {
                    if (res.data.flag) {
                        // 进行回显，基于VUE的数据绑定实现
                        this.formData = res.data.data;
                    } else {
                        // 查询失败，弹出提示
                        this.$message.error(res.data.message);
                    }
                });
            },
            // 切换页码
            handleCurrentChange(currentPage) {
                // 设置最新的页码
                this.pagination.currentPage = currentPage;
                // 重新调用findPage方法进行分页查询
                this.findPage();
            },
            // 删除
            handleDelete(row) {
                // row其实是一个json对象，json对象的结构为{"age":"0-100","attention":"无","code":"0011","id":38,"name":"白细胞计数","price":10.0,"remark":"白细胞计数","sex":"0","type":"2"}
                // alert(row.id);
                this.$confirm('你确定要删除当前数据吗？', '提示', {
                    // 确认框
                    type: 'warning'
                })
                    .then(() => {
                        // 用户点击确定按钮，发送ajax请求，将检查项ID提交到Controller进行处理
                        axios.get('/checkitem/delete.do?id=' + row.id).then(res => {
                            if (res.data.flag) {
                                // 执行成功
                                // 弹出成功提示信息
                                this.$message({
                                    type: 'success',
                                    message: res.data.message
                                });
                                // 重新进行分页查询
                                this.findPage();
                            } else {
                                // 执行失败
                                this.$message.error(res.data.message);
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '操作已取消'
                        });
                    });
            }
        }
    };
</script>

<style lang='less' scoped>

    /* title */
    .content-header {
        position: relative;
        padding: 15px 15px 0 15px;
        /* margin-top: 70px; */
    }

    .content-header > h1 {
        margin: 0;
        font-size: 24px;
        font-weight: normal;
    }

    .content-header > h1 > small {
        font-size: 15px;
        display: inline-block;
        padding-left: 4px;
        font-weight: 300;
    }

    .content-header > .breadcrumb {
        float: right;
        background: transparent;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 12px;
        padding: 7px 5px;
        position: absolute;
        top: 20px;
        right: 10px;
        border-radius: 2px;
    }

    /*  */
    .app-container {
        background: #fff;
        margin: 15px 30px 15px 15px;

    }

    .pagiantion {
        text-align: right;
        padding: 15px;
    }

    .box {
        position: relative;
        border-radius: 3px;
        background: #ffffff;
        border-top: 3px solid #3c8dbc;
        padding: 10px;
        margin-bottom: 20px;
        width: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }

    .filter-container {
        padding: 10px 0 15px 0;
    }

    .main-container {
        margin-top: 70px;
    }

    .filter-container .el-button, .filter-container .el-input__inner {
        padding: 0 15px;
        height: 34px;
        line-height: 34px;
    }

    .el-aside {
        overflow: hidden;
    }

    .el-submenu .el-menu-item a {
        display: block;
        height: 50px;
    }

    .el-menu--collapse .el-submenu__icon-arrow {
        display: none
    }

    /* .el-container{position: relative;} */


</style>
