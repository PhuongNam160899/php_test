<template>
  <label class="mb-2">Please Select a meal <b class="color">*</b></label>
  <el-select v-model="meal" @change="setData" placeholder="---" name="">
    <el-option
        v-for="item in mealsEnum"
        :key="item"
        :label="item"
        :value="item">
    </el-option>
  </el-select>
  <div class="danger" v-if="validateMessage.meal">{{ validateMessage.meal }}</div>
  <label class="mb-2 mt-2">Please Enter Number of people <b class="color">*</b></label>
  <div>
    <el-input-number v-model="num_of_people"
                     controls-position="right"
                     :min="1"
                     :max="10"></el-input-number>
  </div>
  <div class="danger" v-if="validateMessage.num_of_people">{{ validateMessage.num_of_people }}</div>

</template>

<script>
import {mealsEnum} from '../store/meals.js';

export default {
  props: ["validateMessage"],
  data() {
    return {
      meal: '',
      num_of_people: 1,
      mealsEnum
    }
  },
  watch: {
    "meal": function () {
      this.validateMessage.meal = ''
    }
  },
  methods: {
    setData(){
      this.$emit('set-data', 'step_1')
    }
  }
}
</script>