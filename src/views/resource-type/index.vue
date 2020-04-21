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
                prop="id"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="resourceName"
                label="资源名"
                width="300">
              </el-table-column>
              <el-table-column
                prop="resourceIntroduce"
                label="资源介绍"
                width="350">
              </el-table-column>
              <el-table-column
                prop="doc"
                label="使用说明文档"
                width="200">
              </el-table-column>
              <el-table-column
                prop="time"
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
        title="添加用户"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="资源名">
                <el-input v-model="form.typeName"></el-input>
            </el-form-item>
            <el-form-item label="资源简介">
                <el-input v-model="form.typeIntroduce"></el-input>
            </el-form-item>
             <el-form-item label="图片">
                <el-input v-model="form.typePicture"></el-input>
            </el-form-item>
             <el-form-item label="资源说明文档">
                <el-input v-model="form.typeDoc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ResourceType',
  data() {
    return {
       dialogVisible: false,
       currentPage:1,
       pagesize:9,
       total:12,
       tableData: [
        {
         id:1,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
        {
         id:2,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/16',
        },
        {
         id:3,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/13',
        },
        {
         id:4,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
        {
         id:5,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
        {
         id:6,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
        {
         id:7,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
        {
         id:8,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
        {
         id:9,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
        {
         id:10,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
        {
         id:11,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
        {
         id:12,
         resourceName:'Hadoop大数据处理平台',
         resourceIntroduce:'(20台服务器集群),用于大数据处理',
         doc:'说明文档',
         time:'2020/03/12',
        },
       ],
       form: {
          typeName: '',
          typeIntroduce: '',
          typePicture: '',
          typeDoc:''
      },
    }
  },
  created() {
  },
  methods: {
    // 新增资源类型
    addType() {
      this.dialogVisible = true
    },
    // 修改资源类型
    alterType(row) {
      this.dialogVisible = true
    },
    // 删除资源类型
    deleteType(row) {
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

        .pagination{
          width: 600px;
          margin:25px auto;
        }
      }
    }
  }
</style>


