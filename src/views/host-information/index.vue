<template>
  <div class="host-information-container">
      <div class="title"><span>主机信息管理</span></div>
      <div class="content">
      <el-button style="background:#42b983;color:white;width:120px;" class="new-add" @click="addHost">新增主机</el-button>
        <div class="table" style="width:1352px">
            <el-table
              :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe
              border
              :current-page.sync="currentPage"
              style="width: 100%">
              <el-table-column
                prop="hiid"
                label="序号"
                width="200">
              </el-table-column>
              <el-table-column
                prop="name"
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
                prop="port"
                label="端口"
                width="200">
              </el-table-column>
              <el-table-column
                prop="modify"
                label="操作"
                width="250">
                <template slot-scope="scope">
                  <el-button style="background:#42b983;color:white;margin:0 30px;" @click="alterHost(scope.row)">修改</el-button>
                  <el-popover
                      placement="top"
                      title="确定删除此主机吗？"
                      width="200"
                      trigger="click"
                      v-model="scope.row.visible"
                    >
                        <div style="text-align: right; margin: 0">
                          <el-button type="primary" size="mini" @click="deleteHost(scope.row)">确定</el-button>
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
        title="新增主机信息"
        :visible.sync="addVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="addForm" :model="addForm" label-width="80px">
            <el-form-item label="主机名">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="资源类型">
                <el-select v-model="addForm.resourceType" placeholder="请选择">
                   <el-option
                      v-for="item in resourceTypes"
                      :key="item.rtid"
                      :label="item.resourceName"
                      :value="item.resourceName"/>
                </el-select>
            </el-form-item>
            <el-form-item label="访问地址">
                <el-input v-model="addForm.address"></el-input>
            </el-form-item>
            <el-form-item label="端口">
                <el-input v-model="addForm.port" placeholder="不填即为默认"></el-input>
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
            <el-form-item label="主机名">
                <el-input v-model="alterForm.name"></el-input>
            </el-form-item>
            <el-form-item label="资源类型">
                <el-select v-model="alterForm.resourceType" placeholder="请选择">
                  <el-option
                      v-for="item in resourceTypes"
                      :key="item.rtid"
                      :label="item.resourceName"
                      :value="item.resourceName"/>
                </el-select>
            </el-form-item>
            <el-form-item label="访问地址">
                <el-input v-model="alterForm.address"></el-input>
            </el-form-item>
            <el-form-item label="端口">
                <el-input v-model="alterForm.port"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="alterSubmit">找回</el-button>
                <el-button @click="alterVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { getHostList,deleteHost,addHost,updateHost } from '@/api/host'
import { getResourceType } from '@/api/resource'

export default {
  name: 'HostInformation',
  inject:['reload'],    //注入App里的reload方法
  data() {
    return {
      addVisible: false,
      alterVisible: false,
      currentPage:1,
      pagesize:6,
      total:0,
      tableData: [],
      resourceTypes:[],
      addForm: {
        name: '',
        resourceType: '',
        address: '',
        port:''
      },
      alterForm: {
        hiid:'',
        name: '',
        resourceType: '',
        address: '',
        port:''
      }
    }
  },
  created() {
    getHostList().then(response => {
      if(response.code === 200) {
        this.tableData = response.data
        this.total = response.data.length
      }
    })
    getResourceType().then(response => {
      if(response.code === 200 ) {
        this.resourceTypes = response.data
      }
    })
  },
  methods: {
    // 新增主机信息
    addHost() {
      this.addVisible = true
    },
    // 修改主机信息
    alterHost(row) {
      this.alterForm.hiid = row.hiid
      this.alterForm.name = row.name
      this.alterForm.resourceType = row.resourceType
      this.alterForm.address = row.address
      this.alterForm.port = row.port
      this.alterVisible = true
    },
    // 删除主机信息
    deleteHost(row) {
      deleteHost({hiid:row.hiid}).then(response => {
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
    // 新增主机信息
    addSubmit() {
      const {name,resourceType,address,port} = this.addForm
      addHost({resource_name:resourceType,address,host_name:name,port}).then(response => {
        if(response.code === 200) {
          this.$message({
            　  message: '新增成功',
            　  type: 'success'
         　})
         　this.reload()
        }
      })
    },
    // 修改主机信息
    alterSubmit() {
      const {hiid,name,resourceType,address,port} = this.alterForm
      updateHost({hiid,resource_name:resourceType,address,host_name:name,port}).then(response => {
        if(response.code === 200) {
          this.$message({
            　  message: '修改成功',
            　  type: 'success'
         　})
         　this.reload()
        }
      })
    }
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


