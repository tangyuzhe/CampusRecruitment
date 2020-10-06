<template>
  <view>
    <u-card v-for="(item, index) in list" :key="index">
      <view slot="head">
        <p>{{ "教室申请" + (index + 1) }}</p>
        <u-button
          type="error"
          size="mini"
          class="add"
          @click="list.length > 1 ? list.splice(index, 1) : list"
          >删除</u-button
        >
      </view>
      <view slot="body">
        <u-form ref="uForm">
          <u-form-item label="教室用途" label-width="150">
            <u-input v-model="list[index].purpose" border />
          </u-form-item>

          <u-form-item label="开始时间" label-width="150">
            <u-input
              type="select"
              v-model="list[index].start_time"
              border
              @click="(start_time = true), (sindex = index)"
            />
            <u-picker
              mode="time"
              v-model="start_time"
              :params="params"
              @confirm="selectStartTime"
            ></u-picker>
          </u-form-item>

          <u-form-item label="结束时间" label-width="150">
            <u-input
              type="select"
              v-model="list[index].finished_time"
              border
              @click="(finished_time = true), (sindex = index)"
            />
            <u-picker
              mode="time"
              v-model="finished_time"
              :params="params"
              @confirm="selectFinishedTime"
            ></u-picker>
          </u-form-item>
        </u-form>
      </view>
    </u-card>

    <view class="demo-layout">
      <image src="../../../static/add_plus.png" mode="" @click="addForm" />
    </view>

    <u-row gutter="16">
      <u-col span="6">
        <view class="demo-layout">
          <u-button
            type="success"
            class="margin-top"
            shape="circle"
            @click="sendCurrent(0)"
            >上一步</u-button
          >
        </view>
      </u-col>
      <u-col span="6">
        <view class="demo-layout bg-purple-light"
          ><u-button
            type="success"
            class="margin-top"
            @click="finish"
            shape="circle"
            >提交</u-button
          ></view
        >
      </u-col>
    </u-row>
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
export default class classroomForm extends Vue {
  @Prop({}) current!: number;
  @Emit("getCurrent") sendCurrent(current: number) {}
  list: any = [];
  start_time: boolean = false;
  sindex: number = -1;
  finished_time: boolean = false;
  params: object = {
    year: true,
    month: true,
    day: true,
    hour: true,
    minute: true,
    second: false,
  };

  recruitmentID: number = -1;

  selectStartTime(val: any) {
    let date = val.year + "-" + val.month + "-" + val.day;
    let time = val.hour + ":" + val.minute;
    let res = date + " " + time;
    this.list[this.sindex].start_time = res;
  }

  selectFinishedTime(val: any) {
    let date = val.year + "-" + val.month + "-" + val.day;
    let time = val.hour + ":" + val.minute;
    let res = date + " " + time;
    this.list[this.sindex].finished_time = res;
  }

  addForm() {
    let arrange: object = {
      recruitment_id: 0,
      classroom: "",
      purpose: "",
      start_time: "",
      finished_time: "",
      audit_instructions: "",
      audit_situation: "等待审核",
    };
    this.list.push(arrange);
  }

  mounted() {
    this.addForm();
  }

  finish() {
    this.RecruitmentSubmit();
  }

  //招聘申请提交获取id
  async RecruitmentSubmit() {
    let data = uni.getStorageSync("Recruitment");
    await api.BaseRequest.postRequest("/v1/recruitment", JSON.parse(data)).then(
      (res: any) => {
        if (res.data.code == 0) {
          this.recruitmentID = res.data.data.id;
          this.StationSubmit();
          this.ClassroomSubmit();
          this.sendCurrent(2);
        }
      }
    );
  }

  //岗位申请提交
  async StationSubmit() {
    let data = uni.getStorageSync("Station");
    data.forEach((item: any) => {
      item.recruitment_id = this.recruitmentID;
      this.post(item, "/v1/station");
    });
  }

  //教室申请提交
  async ClassroomSubmit() {
    this.list.forEach((item: any) => {
      item.recruitment_id = this.recruitmentID;
      this.post(item, "/v1/arrangement");
    });
  }

  async post(data: any, url: string) {
    await api.BaseRequest.postRequest(url, data);
  }
}
</script>

<style scoped lang="scss">
.add {
  width: 60px;
  height: 30px;
  position: absolute;
  right: 20px;
  top: 10px;
}

.title {
  font-size: 1.2em;
  letter-spacing: 2px;
}

.u-card-wrap {
  background-color: $u-bg-color;
  padding: 1px;
}

.u-body-item {
  font-size: 20rpx;
  color: #333;
  padding: 20rpx 10rpx;
}

image {
  width: 30px;
  height: 30px;
}
</style>