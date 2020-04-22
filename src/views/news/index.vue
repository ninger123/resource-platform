<template>
  <div class="news-manage-container">
      <div class="title"><span>公告管理</span></div>
      <div class="content">
      <el-button style="background:#42b983;color:white;width:120px;" class="new-add" @click="dialogVisible = true">发布公告</el-button>
        <div class="table" style="width:1132px">
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              :current-page.sync="currentPage"
              style="width: 100%">
              <el-table-column
                prop="nid"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="title"
                label="公告名"
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
                width="380">
                <template slot-scope="scope">
                  <el-button style="background:#42b983;color:white;margin-left:30px;" @click="seeDetail(scope.row)">查看</el-button>
                  <el-button style="background:#42b983;color:white;margin:0 30px;" @click="seeDetail(scope.row)">修改</el-button>
                  <el-popover
                      placement="top"
                      title="确定删除此公告吗？"
                      width="200"
                      trigger="click"
                      v-model="scope.row.visible"
                    >
                        <div style="text-align: right; margin: 0">
                          <el-button type="primary" size="mini" @click="deleteNews(scope.row)">确定</el-button>
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
import { getNewsList,deleteNews } from '@/api/news'
import { regToNormal } from '@/utils/format-date'

export default {
  name: 'NewsManage',
  inject:['reload'],    //注入App里的reload方法
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
    getNewsList().then(response => {
      if(response.code === 200) {
        response.data.forEach(item =>{
          item.regTime = regToNormal(item.regTime)
          item.visible = false
        })
        this.total = response.data.length
        this.tableData = response.data
      }
    })
  },
  methods: {
    // 查看公告详情
    seeDetail(row) {
        this.$router.push({path:'/news/detail',query:{nid:row.nid}})
    },
    // 删除公告
    deleteNews(row) {
      deleteNews({nid:row.nid}).then(response => {
        if(response.code === 200) {
          this.$message({
            　  message: '删除成功',
            　  type: 'success'
         　})
         　this.reload()
        }
        row.visible = false
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSizeChange(val) {
      this.pagesize=val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    onSubmit() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .news-manage-container {
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

