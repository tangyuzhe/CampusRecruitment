<template>
  <view class="wrap">
    <u-steps :list="numList" :current="current" mode="number"></u-steps>

    <RecruitmentDetailPage
      v-if="current == -1"
      @getCurrent="getCurrent"
    ></RecruitmentDetailPage>

    <station-detail-page
      v-if="current == 0"
      @getCurrent="getCurrent"
    ></station-detail-page>

    <room-arrange-page
      v-if="current == 1"
      @getCurrent="getCurrent"
    ></room-arrange-page>

    <finish-page v-if="current == 2" @getCurrent="getCurrent"></finish-page>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import * as api from "../../../api/request";
import { Toast } from "vant";
import moment from "moment";
import RecruitmentDetailPage from "./detailForm/recruitment.vue";
import StationDetailPage from "./detailForm/station.vue";
import RoomArrangePage from "./detailForm/roomArrange.vue";
import finishPage from "./detailForm/finishPage.vue";
@Component({
  components: {
    RecruitmentDetailPage,
    StationDetailPage,
    RoomArrangePage,
    finishPage,
  },
})
export default class RecruitmentDetail extends Vue {
  numList: any = [
    {
      name: "招聘信息",
    },
    {
      name: "岗位信息",
    },
    {
      name: "教室申请",
    },
    {
      name: "完成审核",
    },
  ];
  current: number = -1;

  getCurrent(val: number) {
    this.current = val;
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
