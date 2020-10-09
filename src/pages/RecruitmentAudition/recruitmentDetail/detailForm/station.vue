<template>
  <view class="margin-top">
    <van-form v-for="(item, index) in list" :key="index" class="margin-top">
      <van-field
        :value="item.station"
        name="岗位信息"
        label="岗位信息"
        readonly
      />

      <van-field :value="item.salary" name="薪资" label="薪资" readonly />

      <van-field
        :value="item.workplace"
        name="工作地点"
        label="工作地点"
        readonly
      />

      <van-field
        :value="item.recruit_number"
        name="招聘人数"
        label="招聘人数"
        readonly
      />
    </van-form>
    <van-pagination
      v-model="currentPage"
      :page-count="pageCount"
      mode="simple"
      @change="paginationChange"
    />

    <div style="margin: 16px">
      <van-button round block type="info" @click="submit"> 下一步 </van-button>
    </div>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import * as api from "../../../../api/request";
import { Toast, Form, RadioGroup, Radio } from "vant";
import { Image as VanImage } from "vant";
import moment from "moment";
@Component({
  components: {},
})
export default class StationDetailPage extends Vue {
  url: string = "http://127.0.0.1:7001/public/upload/";
  list: any = [];
  currentPage: number = 1;
  pageSize: number = 10;
  pageCount: number = 0;
  @Emit("getCurrent") sendCurrent(current: number) {}

  formatTime(time: string) {
    return moment(time).format("YYYY年MM月DD日 HH:mm:ss");
  }

  async getStationData() {
    let recruitment_id = uni.getStorageSync("recruitmentData").id;
    let query = {
      recruitment_id: recruitment_id,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
    };
    await api.BaseRequest.getRequest("/v1/station?", query).then((res: any) => {
      if (res.data.code == 0) {
        this.list = res.data.data.rows;
        this.pageCount = Math.ceil(res.data.data.count / this.pageSize);
      }
    });
  }

  paginationChange(val: number) {
    this.currentPage = val;
    this.getStationData();
  }

  submit() {
    this.sendCurrent(1);
  }

  mounted() {
    this.getStationData();
  }
}
</script>

<style scoped lang="scss">
image {
  width: 80px;
  height: 80px;
}
</style>
