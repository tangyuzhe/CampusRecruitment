<template>
  <view class="wrap">
    <u-steps :list="numList" :current="current" mode="number"></u-steps>
    <recruitment-form
      :current="current"
      :company_id="company_id"
      v-show="current == -1"
      @getRecruitmentID="getRecruitmentID"
    ></recruitment-form>

    <station-form
      :current="current"
      v-show="current == 0"
      :recruitment_id="recruitment_id"
    ></station-form>

    <u-modal
      v-model="modelShow"
      :content="modelContent"
      show-cancel-button
      @confirm="current += 1"
      @cancel="current = current"
    ></u-modal>
    <u-button class="margin-top" type="primary" @click="next">下一步</u-button>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import * as api from "../../api/request";
import { Toast } from "vant";
import moment from "moment";
import RecruitmentForm from "./form/recruitment.vue";
import StationForm from "./form/station.vue";
@Component({
  components: {
    RecruitmentForm,
    StationForm,
  },
})
export default class RecruitmentFormPage extends Vue {
  numList: any = [
    {
      name: "填写招聘信息",
    },
    {
      name: "填写岗位信息",
    },
    {
      name: "教室申请",
    },
  ];
  current: number = 0;
  modelShow: boolean = false;
  modelContent: string = "是否进入下一步？";
  company_id: number = -1;
  recruitment_id: number = -1;

  next() {
    this.modelShow = true;
  }

  //获取提交的申请id
  getRecruitmentID(val: number) {
    this.recruitment_id = val;
  }

  onLoad(option: any) {
    this.company_id = option.company_id;
  }
}
</script>

<style scoped lang="scss">
.wrap {
  width: 90%;
  margin: 0 5%;
  text-align: center;
}

.title {
  font-size: 1.2em;
  letter-spacing: 2px;
}
</style>
