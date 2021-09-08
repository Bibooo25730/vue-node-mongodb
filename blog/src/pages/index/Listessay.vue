<template>
  <div class="listEssay">
    <div class="box-container">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input2"
      >
      </el-input>
      <el-button
        type="primary"
        class="btn"
        @click="search"
        icon="el-icon-search"
        >搜索</el-button
      >
      <el-button type="primary" @click="push" class="btn1" icon="el-icon-edit"
        >创建</el-button
      >
    </div>
    <div class="data-container">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column prop="types" label="类型"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="_id" label="id">
          <template slot-scope="scope">
            <div class="functional">
              <el-button @click="modify(scope.row)" type="text">修改</el-button>
              <el-button
                type="text"
                @click="handleEdit(scope.$index, scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="box-pagination">
        <el-pagination
          class="pagination"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
          background
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>


<script>
import api from "../../api/index";
export default {
  name: "BlogListessay",

  data() {
    return {
      input2: "",
      tableData: [],
      //默认显示在第一页
      currentPage: 1,
      //默认每页显示5条数据
      pageSize: 5,
      //默认总条数为一条
      totalCount: 2,
      remove: "",
      //修改传过去的数据
      titles: [],
    };
  },

  mounted() {
    this.tableDate();
  },

  methods: {
    //创建按钮
    push() {
      this.$router.push({ path: "/backstage/arical" });
    },
    async search() {
      let result = await api.SearchMkd(this.input2);
      this.tableData = result.data;
    },
    async tableDate() {
      let result = await api.getMkds();
      this.tableData = result.data;
      console.log(this.tableData);
    },
    //删除
    async handleEdit(index, row) {
      this.titles = row;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let result = api.RemoveMkd(row._id);
          this.remove = result.data;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改
    modify(row) {
      this.$router.push({ path: "/backstage/arical", query: { row } });
      console.log(row);
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
  },
  watch: {
    //如果删除了 监视他发生变化就重新刷新table
    remove() {
      this.tableDate();
    },
  },
};
</script>

<style lang="scss" scoped>
.box-container {
  padding-top: 40px;
  margin-left: 40px;

  .el-input {
    float: left;
    width: 300px;
  }

  .btn {
    float: left;
    margin-left: 10px;
  }

  .btn1 {
    float: right;
  }
}

.data-container {
  margin-left: 40px;
  margin-top: 60px;

  .box-pagination {
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 50px auto;
    }
  }
}

.cell {
  .functional {
    display: flex;
    .revise {
      text-align: center;
      margin-left: 5px;
      display: block;
      width: 50px;
      border: 1px solid #ccc;
    }
  }

  .revise:hover {
    color: rgb(85, 117, 206);
  }
}
</style>
