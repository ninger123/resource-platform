<template>
  <div class="all-user-container">
      <div class="title"><span>所有人员</span></div>
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
                width="350">
              </el-table-column>
              <el-table-column
                prop="department"
                label="部门"
                width="200">
              </el-table-column>
              <el-table-column
                prop="modify"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button style="background:#42b983;color:white;margin-left:30px;" @click="seeDetail(scope.row)">查看详情</el-button>
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
    </div>
  </div>
</template>

<script>
import { getAllUsers } from '@/api/user'

export default {
  name: 'AllUser',
  data() {
    return {
       dialogVisible: false,
       currentPage:1,
       pagesize:9,
       total:0,
       tableData: [],
       form: {
          username: '',
          password: '',
          userRole: '',
      },
    }
  },
  created() {
    getAllUsers().then(response => {
      if(response.code === 200) {
        this.tableData = response.data
        this.total = response.data.length
      }
    })
  },
  methods: {
      handleSizeChange(val) {
        this.pagesize=val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      seeDetail(row) {
        this.$router.push({path:'/users/detail',query:{id:row.id}})
      }
  }
}
</script>

<style lang="scss" scoped>
  .all-user-container {
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


