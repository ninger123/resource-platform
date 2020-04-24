<template>
  <div class="auditing-user-container">
      <div class="title"><span>人员审核</span></div>
      <div class="content">
        <div class="table" style="width:952px">
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              :current-page.sync="currentPage"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="姓名"
                width="200">
              </el-table-column>
              <el-table-column
                prop="eMail"
                label="邮箱"
                width="300">
              </el-table-column>
              <el-table-column
                prop="department"
                label="部门"
                width="200">
              </el-table-column>
              <el-table-column
                prop="modify"
                label="操作"
                width="250">
                <template slot-scope="scope">
                  <el-button style="background:#42b983;color:white;margin-left:30px;" @click="agreeUser(scope.row)">通过</el-button>
                  <el-button style="margin-left:30px;" type="danger" @click="rejectUser(scope.row)">拒绝</el-button>
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
          title="拒绝申请"
          :visible.sync="refuseVisible"
          width="30%"
          :before-close="handleClose">
            <el-form ref="refuseForm" :model="refuseForm" label-width="80px">
                <el-form-item label="拒绝理由">
                    <el-input v-model="refuseForm.reason"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitRefuse">确定</el-button>
                    <el-button @click="refuseVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { getExamineList,examineUser } from '@/api/user'

export default {
  name: 'AuditingUser',
  data() {
    return {
      refuseVisible: false,
      currentPage:1,
      pagesize:9,
      total:0,
      tableData: [],
      refuseForm: {
        id:'',
        reason:''
      },
    }
  },
  created() {
    getExamineList().then(response => {
      if(response.code === 200) {
        this.tableData = response.data
        this.total = response.data.length
      }
    })
  },
  methods: {
    // 用户注册申请通过
    agreeUser(row) {
      examineUser({id:row.id,result:'pass',reason:''}).then(response => {
        if(response.code === 200) {
          console.log('已同意申请')
        }
      })
    },

    // 点击拒绝按钮,打开弹框填写原因
    rejectUser(row) {
      // examineUser({id: row.id,result:'refuse',response})
      this.refuseVisible = true
      this.refuseForm.id = row.id
    },
    
    // 填写完原因后点击确认按钮
    submitRefuse() {
      const {id,reason} = this.refuseForm
      examineUser({id,result:'refuse',reason}).then(response=> {
        if(response.code === 200) {
          console.log('已拒绝申请')
        }
      })
    },
    handleSizeChange(val) {
      this.pagesize=val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .auditing-user-container {
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
        margin-top: 30px;

        .pagination{
          width: 600px;
          margin:25px auto;
        }
      }
    }
  }
</style>


