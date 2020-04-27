<template>
  <div>
    <el-upload
      :http-request="handleUpload"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      class="upload-demo"
      action
      list-type="picture-card"
      :limit="1"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button type="success" @click="upload">上传</el-button>
    <img :src="url" alt v-if="url !=null" width="100" height="100" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      filedata: null,
      url: null
    };
  },
  methods: {
    // 覆盖默认的上传行为，可以自定义上传的实现
    handleUpload(res) {
      let formData = new FormData();
      formData.append("avatar", res.file);
      this.filedata = formData;
    },
    // 文件列表移除文件时的钩子
    handleRemove() {
      console.log("移除了文件");
    },
    // 文件超出个数限制时的钩子
    handleExceed() {
      this.$message({
        message: "只能上传一张封面图",
        type: "error"
      });
    },
    upload() {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.axios.post("/api/profile", this.filedata, config).then(res => {
        const { filename } = res.data.file;
        this.url = "/api/" + filename;
      });
    }
  },
  mounted() {}
};
</script>

<style>
</style>