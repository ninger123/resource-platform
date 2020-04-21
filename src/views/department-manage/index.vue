<template>
  <div class="department-manage-container">
      <div class="title"><span>部门管理</span></div>
      <div class="content">
      <el-button style="background:#42b983;color:white;width:120px;" class="new-add" @click="dialogVisible = true">新增部门</el-button>
        <div class="table" style="width:1252px">
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              :current-page.sync="currentPage"
              style="width: 100%">
              <el-table-column
                prop="did"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="name"
                label="部门"
                width="250">
              </el-table-column>
              <el-table-column
                prop="introduce"
                label="介绍"
                width="350">
              </el-table-column>
              <el-table-column
                prop="regTime"
                label="时间"
                width="200">
              </el-table-column>
              <el-table-column
                prop="modify"
                label="操作"
                width="250">
                <template slot-scope="scope">
                  <el-button style="background:#42b983;color:white;margin:0 30px;" @click="alterDepartment(scope.row)">修改</el-button>
                  <el-popover
                      placement="top"
                      title="确定删除此用户吗？"
                      width="200"
                      trigger="click"
                      v-model="scope.row.visible"
                    >
                        <div style="text-align: right; margin: 0">
                          <el-button type="primary" size="mini" @click="deleteUser(scope.row)">确定</el-button>
                          <el-button size="mini" @click="scope.row.visible = false">取消</el-button>
                        </div>
                        <el-button type="danger" slot="reference">删除</el-button>
                    </el-popover>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-size="pagesize"
                  background
                  layout="total, prev, pager, next, jumper"
                  :total="total">
              </el-pagination>
            </div>
        </div>
    <el-dialog
        title="新增部门信息"
        :visible.sync="addVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="addForm" :model="addForm" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input type="textarea" v-model="addForm.introduce"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addSubmit">确定</el-button>
                <el-button @click="addVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
        title="修改主机信息"
        :visible.sync="alterVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="alterForm" :model="alterForm" label-width="80px">
            <el-form-item label="名称">
                <el-input v-model="alterForm.name"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input type="textarea" v-model="alterForm.introduce"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="alterSubmit">确定</el-button>
                <el-button @click="alterVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { getDepartmentList,addDepartment,updateDepartment } from '@/api/department'

export default {
  name: 'DepartmentManage',
  data() {
    return {
      addVisible: false,
      alterVisible:false,
      currentPage:1,
      pagesize:9,
      total:12,
      tableData: [],
      addForm: {
        name:'',
        introduce:''
      },
      alterForm: {
        did:'',
        name:'',
        introduce:''
      }
    }
  },
  created() {
    getDepartmentList().then(response => {
      if(response.code === 200) {
        this.tableData = response.data
      }
    })
  },
  methods: {
    // 新增部门信息,打开弹窗
    addHost() {
      this.addVisible = true
    },
    // 确认新增部门信息
    addSubmit() {
      addDepartment(this.addForm).then(response => {
        if(response.code === 200 ){
          console.log('部门新增成功')
        }
      })
    },
    // 修改部门信息,打开弹窗
    alterDepartment(row) {
      this.alterForm.did = row.did
      this.alterForm.name = row.name
      this.alterForm.introduce = row.introduce
      this.alterVisible = true
    },
    // 确认修改部门信息
    alterSubmit() {
      updateDepartment(this.alterForm).then(response => {
        if(response.code === 200 ){
          console.log('部门修改成功')
        }
      })
    },
    handleSizeChange(val) {
      this.pagesize=val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  }
}
</script>

<style lang="scss" scoped>
  .department-manage-container {
    min-height: 100vh;
    background-color: rgb(240, 242, 245);
    position: relative;
    .title{
      height: 45px;
      background-color: white;
      border-bottom:1px solid rgb(204, 202, 202);
      font-weight: bold;
      font-size: 20px;
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
    .content{
      margin-left: 40px;
      margin-top: 20px;

      .table{
        margin-top: 20px;

        .pagination{
          width: 600px;
          margin:25px auto;
        }
      }
    }
  }
</style>



