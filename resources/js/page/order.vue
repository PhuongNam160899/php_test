<template>
  <el-tabs type="border-card" v-model="name" :before-leave="handleClick">
    <el-tab-pane name="step_1" label="Step 1">
      <StepOne ref="StepOne"
               :data="data"
               :validateMessage="validateMessage"
               @set-data="setData"
      ></StepOne>
    </el-tab-pane>
    <el-tab-pane name="step_2" label="Step 2">
      <StepTwo ref="StepTwo"
               :restaurants="restaurants"
               :validateMessage="validateMessage"
               @set-data="setData"
      ></StepTwo>
    </el-tab-pane>
    <el-tab-pane name="step_3" label="Step 3">
      <StepThree ref="StepThree"
                 :foods="foods"
                 :dataStepOne="order.step_one"
                 :validateMessage="validateMessage"
                 @set-data="setData"
      ></StepThree>
    </el-tab-pane>
    <el-tab-pane name="review" label="Review">
      <Review
          :order="order"
      >
      </Review>
    </el-tab-pane>
  </el-tabs>

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="500"
  >
    <el-row class="mb-4" style="text-align: center">
        <el-col :span="8">
          <div class="grid-content ep-bg-purple"/>
        </el-col>
        <el-col :span="8"><b style="color: chartreuse">Order Success</b></el-col>
        <el-col :span="8">
          <div class="grid-content ep-bg-purple"/>
        </el-col>
    </el-row>
    <Review
        :order="order"
    >
    </Review>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="close">Exit</el-button>
      </div>
    </template>
  </el-dialog>

  <el-button style="margin-top: 12px" @click="previous">Previous</el-button>
  <el-button style="margin-top: 12px; float: right"
             @click="next"
             v-show="is_show"
  >
    Next
  </el-button>
  <el-button style="margin-top: 12px;float: right"
             v-show="!is_show"
             @click="submit"
  >
    Submit
  </el-button>
</template>
<script>
import StepOne from "../components/StepOne.vue";
import StepTwo from "../components/StepTwo.vue";
import StepThree from "../components/StepThree.vue";
import Review from "../components/Review.vue";
import data from '../store/dishes.json';

export default {
  name: "Order",
  components: {
    StepOne,
    StepTwo,
    StepThree,
    Review
  },
  data() {
    return {
      name: 'step_1',
      is_show: true,
      next_button: {
        step_1: 'step_2',
        step_2: 'step_3',
        step_3: 'review',
      },
      previous_button: {
        step_2: 'step_1',
        step_3: 'step_2',
        review: 'step_3',
      },
      convert_tab: {
        step_1: 1,
        step_2: 2,
        step_3: 3,
        review: 4,
      },
      is_next: false,
      data: {},
      validateMessage: {
        meal: '',
        num_of_people: ''
      },
      order: {
        step_one: {
          meal: '',
          num_of_people: 1
        },
        step_two: {
          restaurant: ''
        },
        step_three: '',
        review: ''
      },
      restaurants: {},
      foods: {},
      dialogVisible: false
    };
  },
  watch: {
    "name": function (value) {
      this.is_show = !(value === 'review')
    },
    "order.step_one.meal": function (value) {
      this.restaurants = this.data.filter(dish => dish.availableMeals.includes(value));
    },
    "order.step_two.restaurant": function (value) {
      this.foods = this.data.filter(dish => {
        return dish.availableMeals.includes(this.order.step_one.meal) && dish.restaurant === value;
      });
    }
  },
  created() {
    this.data = data.dishes
  },
  methods: {
    next() {
      let nextStep = this.next_button[this.name]
      if (this.validateForm(this.name)) {
        this.is_next = true
        this.name = nextStep
      }
    },

    previous() {
      if (this.previous_button[this.name])
        this.name = this.previous_button[this.name]
    },

    handleClick(tab, oldTab) {
      const numberTab = this.convert_tab[tab]
      const numberOldTab = this.convert_tab[oldTab]
      if (numberTab < numberOldTab) {
        return true
      }

      let validate = true
      validate = this.validateForm('step_1')
      if (validate && !this.is_next && numberTab > 2)
        validate = this.validateForm('step_2')
      if (validate && !this.is_next && numberTab > 3)
        validate = this.validateForm('step_3')

      if (validate) {
        this.is_next = false
        return true
      }
      this.is_next = false
      return false
    },

    validateForm(tab) {
      let data = {}
      const messageErrors = {}
      //Set data by tap
      if (tab === 'step_1') {
        data = this.$refs.StepOne
      }
      if (tab === 'step_2') {
        data = this.$refs.StepTwo
      }
      if (tab === 'step_3') {
        data = this.$refs.StepThree
        return this.$refs.StepThree.validateForm()
      }

      //Validate
      for (const [key, value] of Object.entries(data)) {
        switch (key) {
          case 'meal':
            messageErrors['meal'] = this.validateFieldRequired(value, 'Please Select a meal')
            break;
          case 'restaurant':
            messageErrors['restaurant'] = this.validateFieldRequired(value, 'Please Select a Restaurant')
            break;

          default:
        }
      }

      //Set message
      if (Object.values(messageErrors).join('') !== '') {
        this.validateMessage = messageErrors
        return false
      }

      return true
    },

    validateFieldRequired(fieldValue, message) {
      let messageError = '';
      (!fieldValue || fieldValue.length === 0) ? messageError = message : ''
      return messageError
    },

    setData(name) {
      switch (name) {
        case 'step_1':
          this.order.step_one = this.$refs.StepOne
          break;
        case 'step_2':
          this.order.step_two = this.$refs.StepTwo
          break;
        case 'step_3':
          this.order.step_three = this.$refs.StepThree
          break;

        default:
      }
    },

    submit() {
      this.dialogVisible = true
    },

    close() {
      this.dialogVisible = false
      location.reload()
    }

  }
}
</script>
<style>
.color {
  color: red;
}

.danger {
  margin-top: 5px;
  color: red;
  font-style: italic;
  font-size: 12px;

}
</style>