<template>
  <div class="application-auditing-container">
      <div class="title"><span>申请审核</span></div>
      <div class="content">
        <div class="table" style="width:1252px">
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              :current-page.sync="currentPage"
              style="width: 100%">
              <el-table-column
                prop="raid"
                label="申请编号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="resourceType"
                label="资源类型"
                width="350">
              </el-table-column>
              <el-table-column
                prop="user_name"
                label="申请人"
                width="250">
              </el-table-column>
              <el-table-column
                prop="progress"
                label="状态"
                width="200">
              </el-table-column>
              <el-table-column
                prop="modify"
                label="操作"
                width="250">
                <template slot-scope="scope">
                  <el-button style="background:#42b983;color:white;margin:0 30px;" @click="pass(scope.row)">通过</el-button>
                  <el-button type="danger" @click="refuse(scope.row)">拒绝</el-button>
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
        title="调配资源"
        :visible.sync="passVisible"
        width="30%"
        :before-close="handleClose">
          <el-form ref="passForm" :model="passForm" :rules="passRule" label-width="80px">
              <el-form-item label="类型" prop="resourceType">
                  <el-input v-model="passForm.resourceType" disabled></el-input>
              </el-form-item>
              <el-form-item label="操作系统" prop="operating_system">
                  <el-input v-model="passForm.operating_system" disabled></el-input>
              </el-form-item>
              <el-form-item label="端口" prop="port">
                  <el-input v-model="passForm.port" disabled></el-input>
              </el-form-item>
              <el-form-item label="时长/天" prop="time">
                  <el-input v-model="passForm.time" disabled></el-input>
              </el-form-item>
              <el-form-item label="用途" prop="purpose">
                  <el-input type="textarea" v-model="passForm.purpose" disabled></el-input>
              </el-form-item>
              <el-form-item label="主机" prop="hiid">
                <el-select v-model="passForm.hiid" placeholder="请选择主机">
                   <el-option
                      v-for="item in hostList"
                      :key="item.hiid"
                      :label="item.name"
                      :value="item.hiid"/>
                </el-select>
            </el-form-item>
              <el-form-item label="用户名" prop="username">
                  <el-input v-model="passForm.sername"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                  <el-input v-model="passForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="passSubmit">确定</el-button>
                  <el-button @click="passVisible = false">取消</el-button>
              </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog
        title="拒绝原因"
        :visible.sync="refuseVisible"
        width="30%"
        :before-close="handleClose">
          <el-form ref="refuseForm" :model="refuseForm" :rules="refuseRule" label-width="80px">
              <el-form-item label="申请编号" prop="raid">
                  <el-input disabled v-model="refuseForm.raid"></el-input>
              </el-form-item>
              <el-form-item label="拒绝理由" prop="refuse_reason">
                  <el-input type="textarea" v-model="refuseForm.refuse_reason" placeholder="请填写拒绝理由"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="refuseSubmit">确定</el-button>
                  <el-button @click="refuseVisible = false">取消</el-button>
              </el-form-item>
          </el-form>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAdminExamineList,examineApplication } from '@/api/application'
import { getHostList } from '@/api/host'

export default {
  name: 'AuditingApplication',
  inject:['reload'],    //注入App里的reload方法
  data() {
    return {
      currentPage:1,
      pagesize:9,
      total:0,
      tableData: [],
      hostList:[],
      passVisible:false,
      refuseVisible:false,
      passForm:{
        raid:'',
        resourceType:'',
        operating_system:'',
        port:'',
        time:'',
        purpose:'',
        hiid:'',
        username:'',
        password:'',
      },
      refuseForm:{
        raid:'',
        refuse_reason:''
      },
      passRule: {
        username: [{required:true, message:'请输入用户名',trigger:'blur'}],
        password: [{required:true, message:'请输入密码',trigger:'blur'}],
        hiid:[{required:true,message:'请选择主机',trigger:['change',"blur"]}],
      },
      refuseRule: {
        refuse_reason: [{required:true, message:'请输入拒绝理由',trigger:'blur'}],
      }
    }
  },
  created() {
    getAdminExamineList().then(response => {
      if(response.code === 200) {
        this.tableData = response.data
        this.total = response.data.length
      }
    }),
    getHostList().then(response => {
      if(response.code === 200) {
        this.hostList = response.data
      }
    })
  },
  methods: {
    // 通过按钮的点击事件
    pass(row) {
      if(row.resourceType === "浪潮服务器（单台独占使用）") {
        // 弹出弹框
        this.passVisible = true
        this.passForm.resourceType = row.resourceType
        this.passForm.operating_system = row.operatingSystem
        this.passForm.port = row.port
        this.passForm.time = row.time
        this.passForm.purpose = row.purpose
        this.passForm.raid = row.raid
      } else {
        examineApplication({result:"pass",raid:row.raid}).then(response => {
          if(response.code === 200) {
            this.$message({
              message: '已通过申请',
              type: 'success'
            })
            this.reload()
          }
        })
      }
    },
    // 拒绝按钮的点击事件
    refuse(row) {
      this.refuseVisible = true
      this.refuseForm.raid = row.raid
    },
    // 确定通过第四类资源的申请
    passSubmit() {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          examineApplication({result:"pass",raid:this.passForm.raid,hiid:this.passForm.hiid,username:this.passForm.username,password:this.passForm.password}).then(response =>{
            if(response.code === 200) {
              this.$message({
                  message: '已通过申请',
                  type: 'success'
                })
              this.reload()
            }
          })
        } else {
          this.$message({
                message: '失败，请把信息填写正确且完整',
                type: 'error'
              });
          return false;
        }
      })
    },
    // 确定拒绝申请
    refuseSubmit() {
      this.$refs.refuseForm.validate(valid => {
        if (valid) {
          examineApplication({result:"refuse",raid:this.refuseForm.raid,refuse_reason:this.refuseForm.refuse_reason}).then(response => {
            if(response.code === 200) {
              this.$message({
                  message: '已拒绝申请',
                  type: 'success'
                })
                this.reload()
            }
          })
        } else{
          this.$message({
                message: '失败，请把信息填写正确且完整',
                type: 'error'
              });
          return false;
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
  }
}
</script>

<style lang="scss" scoped>
  .application-auditing-container {
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


