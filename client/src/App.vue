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
    <img :src="url" alt v-if="url != null" width="100" height="100" />
    <ul id="ul">
      <li>a1</li>
      <li>a2</li>
      <li>a3</li>
      <li>a4</li>
      <li>a5</li>
      <li>a6</li>
      <li>a7</li>
      <li>a8</li>
      <li>a9</li>
      <li>a10</li>
      <li>a11</li>
      <li>a12</li>
      <li>a13</li>
      <li>a14</li>
      <li>a15</li>
      <li>a16</li>
      <li>a17</li>
      <li>a18</li>
      <li>a19</li>
      <li>a20</li>
      <li>a21</li>
      <li>a22</li>
      <li>a23</li>
      <li>a24</li>
      <li>a25</li>
      <li>a26</li>
      <li>a27</li>
      <li>a28</li>
      <li>a29</li>
      <li>a30</li>
      <li>a31</li>
      <li>a32</li>
      <li>a33</li>
      <li>a34</li>
      <li>a35</li>
      <li>a36</li>
      <li>a37</li>
      <li>a38</li>
      <li>a39</li>
      <li>a40</li>
      <li>a41</li>
      <li>a42</li>
      <li>a43</li>
      <li>a44</li>
      <li>a45</li>
      <li>a46</li>
      <li>a47</li>
      <li>a48</li>
      <li>a49</li>
      <li>a50</li>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      filedata: null,
      url: null,
      loading: false,
      list: [
        { name: 1 },
        { name: 2 },
        { name: 3 },
        { name: 4 },
        { name: 5 },
        { name: 6 },
      ],
    };
  },
  methods: {
    // 距离底部100px开始下拉加载
    handleScroll() {
      console.log("scrollHeight滚动条", document.documentElement.scrollHeight);
      // console.log("window.pageYOffset已滚动", window.pageYOffset);
      // console.log("window.innerHeight可视高度", window.innerHeight);
      // console.log(window.pageYOffset + window.innerHeight);
      console.log(
        "距离底部",
        document.documentElement.scrollHeight - window.pageYOffset - window.innerHeight
      );
      if (
        document.documentElement.scrollHeight - window.pageYOffset - window.innerHeight <
        100
      ) {
        if (this.loading) return;
        this.loading = true;
        console.log("-----");
        for (let i = 0; i < 50; i++) {
          this.list.push({ name: i + 7 });
        }
        this.loading = false;
      }
    },
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
        type: "error",
      });
    },
    upload() {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.axios.post("/api/profile", this.filedata, config).then((res) => {
        const { filename } = res.data.file;
        this.url = "/api/" + filename;
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style></style>
