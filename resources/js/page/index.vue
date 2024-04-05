<template>
  <el-row class="mt-4 mb-4" style="text-align: center">
    <el-col :span="24"><b>Order Food</b></el-col>
  </el-row>
  <el-row>
    <el-col :span="6"></el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <router-view></router-view>
      </div>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>

</template>
<script setup>
</script>