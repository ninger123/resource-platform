<template>
  <div class="application-record-container">
      <div class="title"><span>申请记录</span></div>
      <div class="content">
        <div class="table" style="width:1502px">
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              :current-page.sync="currentPage"
              style="width: 100%">
              <el-table-column
                prop="raid"
                label="申请编号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="resourceType"
                label="资源类型"
                width="350">
              </el-table-column>
              <el-table-column
                prop="createDate"
                label="申请时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="passDate"
                label="通过时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="host_name"
                label="主机名"
                width="250">
              </el-table-column>
              <el-table-column
                prop="time"
                label="使用时长/天"
                width="150">
              </el-table-column>
              <el-table-column
                prop="progress"
                label="状态"
                width="150">
              </el-table-column>
              <el-table-column
                prop="modify"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button type="text" @click="seeDetail(scope.row)">查看详情</el-button>
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
import {getAllApplication} from '@/api/application'
import {regToNormal} from '@/utils/format-date'

export default {
  name: 'RecordApplication',
  data() {
    return {
      currentPage:1,
      pagesize:9,
      total:0,
      tableData: [],
    }
  },
  created() {
    getAllApplication().then(response => {
      if(response.code === 200) {
        response.data.forEach(item =>{
          item.createDate = regToNormal(item.createDate)
          if(item.passDate) {
            item.passDate = regToNormal(item.passDate)
          }
        })
        this.tableData = response.data
        this.total = response.data.length
      }
    })
  },
  methods: {
    seeDetail(row) {
      this.$router.push({path:'/application/detail',query:{raid:row.raid}})
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
  .application-record-container {
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

