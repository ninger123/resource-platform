<template>
  <div class="host-information-container">
      <div class="title"><span>主机信息管理</span></div>
      <div class="content">
      <el-button style="background:#42b983;color:white;width:120px;" class="new-add" @click="dialogVisible = true">新增主机</el-button>
        <div class="table" style="width:1352px">
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              :current-page.sync="currentPage"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="hostName"
                label="主机名"
                width="250">
              </el-table-column>
              <el-table-column
                prop="resourceType"
                label="资源类型"
                width="250">
              </el-table-column>
              <el-table-column
                prop="address"
                label="访问地址"
                width="200">
              </el-table-column>
              <el-table-column
                prop="post"
                label="端口"
                width="200">
              </el-table-column>
              <el-table-column
                prop="modify"
                label="操作"
                width="250">
                <template slot-scope="scope">
                  <el-button style="background:#42b983;color:white;margin:0 30px;" @click="seeDetail(scope.row)">修改</el-button>
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
        title="添加用户"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="权限授权">
                <el-radio-group v-model="form.userRole">
                    <el-radio label="管理员"></el-radio>
                    <el-radio label="教师"></el-radio>
                    <el-radio label="学生"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HostInformation',
  data() {
    return {
       dialogVisible: false,
       currentPage:1,
       pagesize:9,
       total:12,
       tableData: [
        {
         id:1,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:2,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:3,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:4,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:5,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:6,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:7,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:8,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:9,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:10,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:11,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
        {
         id:12,
         hostName:'Hadoopxxxx01',
         resourceType:'Hadoop大数据处理平台',
         address:'123.220.255.204',
         post:'3366'
        },
       ],
       form: {
          username: '',
          password: '',
          userRole: '',
      },
    }
  },
  created() {
  },
  methods: {
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
  .host-information-container {
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


