<template>
  <label class="mb-2">Please Select a Restaurant <b class="color">*</b></label>
  <el-select v-model="restaurant" @change="setData" placeholder="---" name="restaurant">
    <el-option
        v-for="item in data"
        :key="item.restaurant"
        :label="item.restaurant"
        :value="item.restaurant">
    </el-option>
  </el-select>
  <div class="danger" v-if="validateMessage.restaurant">{{ validateMessage.restaurant }}</div>
</template>

<script>
export default {
  props: ["restaurants", "validateMessage"],
  data() {
    return {
      data: '',
      restaurant: ''
    }
  },
  watch: {
    'restaurants': function (value) {
      this.restaurant = ''
      this.data = value.filter(
          (value, index, self) => self.findIndex((m) => m.restaurant === value.restaurant) === index,
      );
    },
    'restaurant': function () {
      this.validateMessage.restaurant = ''
    }
  },
  methods: {
    setData() {
      this.$emit('set-data', 'step_2')
    }
  }
}
</script>