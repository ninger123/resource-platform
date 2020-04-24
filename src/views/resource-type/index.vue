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
                <el-input v-model="addForm.resource_name"></el-input>
            </el-form-item>
            <el-form-item label="资源简介">
                <el-input type="textarea" v-model="addForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <!--action为上传的地址，on-remove为文件列表移除文件时的钩子 -->
              <el-upload
                class="upload-photo"
                action="http://p2959a9495.goho.co/fileUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="successPhoto"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="attachList">
                <el-button size="small" type="primary">+ 上传照片</el-button>
              </el-upload>
            </el-form-item>
             <el-form-item label="说明文档">
              <!--action为上传的地址，on-remove为文件列表移除文件时的钩子 -->
              <el-upload
                class="upload-doc"
                action="http://p2959a9495.goho.co/fileUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="successDoc"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="attachLists">
                <el-button size="small" type="primary">+ 上传文档</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addSubmit">提交</el-button>
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
                <el-input v-model="alterForm.resource_name"></el-input>
            </el-form-item>
            <el-form-item label="资源简介">
                <el-input type="textarea" v-model="alterForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <!--action为上传的地址，on-remove为文件列表移除文件时的钩子 -->
              <el-upload
                class="upload-photo"
                action="http://p2959a9495.goho.co/fileUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="alterPhoto"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="list">
                <el-button size="small" type="primary">+ 上传照片</el-button>
                <div slot="tip" class="el-upload__tips">＊修改时不上传即保留当前的照片</div>
              </el-upload>
            </el-form-item>
             <el-form-item label="说明文档">
              <!--action为上传的地址，on-remove为文件列表移除文件时的钩子 -->
              <el-upload
                class="upload-doc"
                action="http://p2959a9495.goho.co/fileUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="alterDoc"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="lists">
                <el-button size="small" type="primary">+ 上传文档</el-button>
                <div slot="tip" class="el-upload__tips">＊修改时不上传即保留当前的文档</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="alterSubmit">提交</el-button>
                <el-button @click="alterVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { getResourceType,addResourceType,updateResourceType,deleteResourceType } from '@/api/resource'
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
      attachList:[],
      attachLists:[],
      list:[],
      lists:[],
      addForm: {
        resource_name: '',
        introduction: '',
        image_url: '',
        file_url:''
      },
      alterForm: {
        rtid:0,
        resource_name:'',
        introduction:'',
        image_url:'',
        file_url:''
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
      console.log(row)
      this.alterForm.rtid = row.rtid
      this.alterForm.resource_name = row.resourceName
      this.alterForm.introduction = row.introduction
      this.alterForm.image_url = row.image
      this.alterForm.file_url = row.file
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
    // 确认新增资源类型
    addSubmit() {
      const {resource_name,introduction,image_url,file_url} = this.addForm
      addResourceType({resource_name,introduction,image_url,file_url}).then(response => {
        if(response.code === 200) {
          this.$message({
            　  message: '新增成功',
            　  type: 'success'
         　})
         　this.reload()
        }
      })
    },
    // 确认修改资源类型
    alterSubmit() {
      const {rtid,resource_name,introduction,image_url,file_url} = this.alterForm
      updateResourceType({rtid,resource_name,introduction,image_url,file_url}).then(response => {
        if(response.code === 200) { 
          this.$message({
            　  message: '修改成功',
            　  type: 'success'
         　})
         　this.reload()
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
    onSubmit() {},
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
    },
    successPhoto(response,file,fileList) {
      this.addForm.image_url = response.data
    },
    successDoc(response,file,fileList) {
      this.addForm.file_url = response.data
    },
    alterPhoto(response,file,fileList) {
      this.alterForm.image_url = response.data
    },
    alterDoc(response,file,fileList) {
      this.alterForm.file_url = response.data
    },
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


