<template>
  <el-row :gutter="20">
    <el-col :span="12" class="mb-4">
      Meal:
    </el-col>
    <el-col :span="12">
      {{ order.step_one.meal }}
    </el-col>
  </el-row>
  <el-row :gutter="20" class="mb-4">
    <el-col :span="12">
      No of People:
    </el-col>
    <el-col :span="12">
      {{ order.step_one.num_of_people }}
    </el-col>
  </el-row>
  <el-row :gutter="20" class="mb-4">
    <el-col :span="12">
      Restaurant:
    </el-col>
    <el-col :span="12">
      {{ order.step_two.restaurant }}
    </el-col>
  </el-row>
  <el-row :gutter="20" class="mb-4">
    <el-col :span="12">
      <div class="grid-content ep-bg-purple"/>
      Dishes:
    </el-col>
    <el-col :span="12">
      <div class="dishes">
        <div v-for="(item, i) in order.step_three.dish">
          <p>{{ item.dish }} - {{ item.servings }}</p>
        </div>
      </div>

    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      data: '',
      restaurant: ''
    }
  },
  watch: {},
  methods: {}
}
</script>
<style>
.dishes {
  padding: 5px;
  border: solid 1px;
}
</style>