<template>
  <el-row :gutter="20" v-for="(item, i) in dish">
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <label class="mb-2 mt-2">Please Select a Dish <b class="color">*</b></label>
        <el-select v-model="item.dish" placeholder="---" name="restaurant" @change="validateForm(i)">
          <el-option
              v-for="item in data"
              :key="item.name"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
        <div class="danger" v-if="item.validateMessage.dish">{{ item.validateMessage.dish }}</div>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="grid-content bg-purple-light">
        <label class="mb-2 mt-2">Please enter no of servings <b class="color">*</b></label>
        <div>
          <el-input-number v-model="item.servings"
                           @change="validateForm(i)"
                           controls-position="right"
                           :min="1"
                           :max="10"></el-input-number>
        </div>
      </div>
    </el-col>
    <el-col :span="7">
      <div class="grid-content bg-purple-light mt-4">
        <el-button class="mt-3" @click="remove(i)" type="danger" :icon="Delete"></el-button>
      </div>
    </el-col>
  </el-row>
  <div>
    <div class="danger" v-if="messageServings">{{ messageServings }}</div>
    <el-button class="mt-3" @click="addDish" type="primary" :icon="CirclePlusFilled"></el-button>
  </div>
</template>

<script>
import {
  Delete,
  CirclePlusFilled
} from '@element-plus/icons-vue'
export default {
  props: ["foods", "dataStepOne"],
  data() {
    return {
      data: '',
      dish: [
        {
          dish: "",
          servings: 1,
          validateMessage: {
            dish: ''
          }
        }
      ],
      servings: 1,
      messageServings: '',
      Delete,
      CirclePlusFilled
    }
  },
  watch: {
    'foods': function (value) {
      this.dish = [
        {
          dish: "",
          servings: 1,
          validateMessage: {
            dish: ''
          }
        }
      ]
      this.data = value
    }
  },
  methods: {
    addDish() {
      if (this.dish.length < 10)
        this.dish.push({
          dish: "",
          servings: 1,
          validateMessage: {
            dish: ''
          }
        })
    },

    validateForm() {
      let countServings = 0
      let countErr = 0
      this.dish.forEach((value, index) => {

        const messageErrors = {}
        messageErrors['dish'] = this.validateFieldRequired(value.dish, 'Please Select a Dish')
        if (Object.values(messageErrors).join('') !== '') {
          this.dish[index].validateMessage = messageErrors
          countErr++
        }

        if (value.dish) {
          const filteredDishes = this.dish.filter((dish, key) => {
            return dish.dish === value.dish && key !== index;
          });
          if (filteredDishes.length > 0) {
            countErr++
            this.dish[index].validateMessage.dish = "You can't select the same dish"
          } else
            this.dish[index].validateMessage.dish = ""
        }

        countServings = countServings + value.servings
      })

      if (countServings < this.dataStepOne.num_of_people) {
        countErr++
        this.messageServings = 'The total number of dishes should be greater or equal to the number of people is ' + this.dataStepOne.num_of_people
      } else {
        this.messageServings = ''
      }

      this.$emit('set-data', 'step_3')
      return countErr === 0
    },

    validateFieldRequired(fieldValue, message) {
      let messageError = '';
      (!fieldValue || fieldValue.length === 0) ? messageError = message : ''
      return messageError
    },

    remove(index) {
      if (Object.keys(this.dish).length > 1) {
        this.dish.splice(index, 1);
      }
    },
  }
}
</script>