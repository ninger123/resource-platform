<template>
  <div class="resource-type-container">
      <div class="title"><span>资源类型管理</span></div>
      <div class="content">
      <el-button style="background:#42b983;color:white;width:120px;" class="new-add" @click="addType">新增类型</el-button>
        <div class="table" style="width:1502px">
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              :current-page.sync="currentPage"
              style="width: 100%">
              <el-table-column
                prop="rtid"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="resourceName"
                label="资源名"
                width="300">
              </el-table-column>
              <el-table-column
                prop="introduction"
                label="资源介绍"
                width="350">
              </el-table-column>
              <el-table-column
                label="使用说明文档"
                width="200">
                 <template slot-scope="scope">
                   <a :href="[scope.row.file]" class="a-link">说明文档</a>
                 </template>
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
                  <el-button style="background:#42b983;color:white;margin:0 30px;" @click="alterType(scope.row)">修改</el-button>
                  <el-popover
                      placement="top"
                      title="确定删除此类型吗？"
                      width="200"
                      trigger="click"
                      v-model="scope.row.visible"
                    >
                        <div style="text-align: right; margin: 0">
                          <el-button type="primary" size="mini" @click="deleteType(scope.row)">确定</el-button>
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
        title="新增资源类型"
        :visible.sync="addVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="addForm" :model="addForm" label-width="80px">
            <el-form-item label="资源名">
                <el-input v-model="addForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="资源简介">
                <el-input type="textarea" v-model="addForm.introduction"></el-input>
            </el-form-item>
             <el-form-item label="图片">
                <el-input v-model="addForm.image"></el-input>
            </el-form-item>
             <el-form-item label="说明文档">
                <el-input v-model="addForm.file"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="addVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
        title="修改资源类型"
        :visible.sync="alterVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="alterForm" :model="alterForm" label-width="80px">
            <el-form-item label="资源名">
                <el-input v-model="alterForm.resourceName"></el-input>
            </el-form-item>
            <el-form-item label="资源简介">
                <el-input type="textarea" v-model="alterForm.introduction"></el-input>
            </el-form-item>
             <el-form-item label="图片">
                <el-input v-model="alterForm.image"></el-input>
            </el-form-item>
             <el-form-item label="说明文档">
                <el-input v-model="alterForm.file"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="alterVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { getResourceType,deleteResourceType } from '@/api/resource'
import { regToNormal } from '@/utils/format-date'

export default {
  name: 'ResourceType',
  inject:['reload'],    //注入App里的reload方法
  data() {
    return {
       addVisible: false,
       alterVisible: false,
       currentPage:1,
       pagesize:9,
       total:0,
       tableData: [],
       addForm: {
        resourceName: '',
        introduction: '',
        image: '',
        file:''
      },
      alterForm: {
        resourceName:'',
        introduction:'',
        image:'',
        file:''
      }
    }
  },
  created() {
    getResourceType().then(response => {
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
    // 新增资源类型
    addType() {
      this.addVisible = true
    },
    // 修改资源类型
    alterType(row) {
      this.alterVisible = true
    },
    // 删除资源类型
    deleteType(row) {
      deleteResourceType({rtid:row.rtid}).then(response => {
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
    onSubmit() {}
  }
}
</script>

<style lang="scss" scoped>
  .resource-type-container {
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

        .a-link{
          color:rgb(72, 139, 246);
          text-decoration: underline;
        }

        .pagination{
          width: 600px;
          margin:25px auto;
        }
      }
    }
  }
</style>


