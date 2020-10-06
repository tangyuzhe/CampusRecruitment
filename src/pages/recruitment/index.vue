<template>
  <view class="wrap">
    <u-steps :list="numList" :current="current" mode="number"></u-steps>
    <recruitment-form
      :current="current"
      :company_id="company_id"
      v-show="current == -1"
      @getRecruitmentID="getRecruitmentID"
      @getCurrent="getCurrent"
    ></recruitment-form>

    <station-form
      :current="current"
      v-show="current == 0"
      @getCurrent="getCurrent"
    ></station-form>

    <classroom-form
      :current="current"
      v-show="current == 1"
      @getCurrent="getCurrent"
    ></classroom-form>

    <finish-page :current="current" v-show="current == 2"></finish-page>

    <!-- <u-modal
      v-model="modelShow"
      :content="modelContent"
      show-cancel-button
      @confirm="current < 2 ? (current += 1) : current"
      @cancel="current = current"
    ></u-modal> -->
    <!-- <u-button class="margin-top" type="primary" @click="next">{{
      current == 1 ? "完成信息填写" : "下一步"
    }}</u-button> -->
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import * as api from "../../api/request";
import { Toast } from "vant";
import moment from "moment";
import RecruitmentForm from "./form/recruitment.vue";
import StationForm from "./form/station.vue";
import classroomForm from "./form/room.vue";
import finishPage from "./form/finishPage.vue";
@Component({
  components: {
    RecruitmentForm,
    StationForm,
    classroomForm,
    finishPage,
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
    {
      name: "完成申请",
    },
  ];
  current: number = -1;
  company_id: number = -1;

  //
  getCurrent(val: number) {
    this.current = val;
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
