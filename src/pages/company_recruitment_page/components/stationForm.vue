<template>
  <view class="wrap">
    <text class="title">{{ option == 1 ? "岗位修改" : "岗位添加" }}</text>
    <u-form ref="uForm" class="margin-top">
      <u-form-item label="岗位名称" label-width="200">
        <u-input v-model="Station.station" border />
      </u-form-item>

      <u-form-item label="薪资" label-width="200">
        <u-input v-model="Station.salary" border />
      </u-form-item>

      <u-form-item label="工作地点" label-width="200">
        <u-input v-model="Station.workplace" border />
      </u-form-item>

      <u-form-item label="招聘人数" label-width="200">
        <u-number-box v-model="Station.recruit_number" :min='1'></u-number-box>
      </u-form-item>
    </u-form>
    <u-button :type="option == 1 ? 'warning' : 'primary'" @click="submit">{{
      option == 1 ? "修改" : "提交"
    }}</u-button>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import * as api from "../../../api/request";
import { Toast } from "vant";
import moment from "moment";
@Component({
  components: {},
})
export default class StationForm extends Vue {
  @Prop({}) recruitmentID!: number;
  @Prop({}) id!: number;
  @Prop({}) stationData: any;
  Station: any = {
    recruit_number: 0,
  };
  option: number = -1; //0为添加，1为修改

  //子组件传父组件关闭弹窗
  @Emit("closeStationForm") closeForm(data: boolean) {}

  mounted() {
    this.Station.recruitment_id = this.recruitmentID;
    if (Object.keys(this.stationData).length != 0) {
      this.option = 1;
      this.Station = this.stationData;
    } else {
      this.option = 0;
    }
  }

  //提交
  async submit() {
    if (this.option == 0) {
      this.addStation();
    } else {
      this.updateStation();
    }
  }

  //添加
  async addStation() {
    await api.BaseRequest.postRequest("/v1/station", this.Station).then(
      (res: any) => {
        if (res.data.code == 0) {
          Toast.success("添加成功！");
          this.closeForm(false);
        }
      }
    );
  }

  async updateStation() {
    await api.BaseRequest.putRequest(
      "/v1/station/" + this.Station.id,
      this.Station
    ).then((res: any) => {
      if (res.data.code == 0) {
        Toast.success("修改成功！");
        this.closeForm(false);
      }
    });
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