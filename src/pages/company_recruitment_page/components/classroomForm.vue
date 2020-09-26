<template>
  <view class="wrap">
    <text class="title">教室申请</text>
    <u-form ref="uForm" class="margin-top" v-model="classroomApplication">
      <u-form-item label="教室用途" label-width="200">
        <u-input v-model="classroomApplication.purpose" border />
      </u-form-item>

      <u-form-item label="开始时间" label-width="200">
        <u-input
          type="select"
          v-model="classroomApplication.start_time"
          border
          @click="start_time = true"
        />
        <u-picker
          mode="time"
          v-model="start_time"
          :params="params"
          @confirm="selectStartTime"
        ></u-picker>
      </u-form-item>

      <u-form-item label="结束时间" label-width="200">
        <u-input
          type="select"
          v-model="classroomApplication.finish_time"
          border
          @click="finished_time = true"
        />
        <u-picker
          mode="time"
          v-model="finished_time"
          :params="params"
          @confirm="selectFinishedTime"
        ></u-picker>
      </u-form-item>
    </u-form>
    <u-button class="margin-top" type="primary" @click="submit">提交</u-button>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import * as api from "../../../api/request";
import { Toast } from "vant";
import moment from "moment";
@Component({
  components: {},
})
export default class ClassroomApplicationForm extends Vue {
  @Prop({}) recruitmentID!: number;
  classroomApplication: any = {
    classroom: "",
    audit_instructions: "",
    audit_situation: "",
  };
  start_time: boolean = false;
  finished_time: boolean = false;
  params: object = {
    year: true,
    month: true,
    day: true,
    hour: true,
    minute: true,
    second: true,
  };

  //子组件传父组件关闭弹窗
  @Emit("closeClassroomForm") closeForm(data: boolean) {}

  mounted() {
    this.classroomApplication.recruitment_id = this.recruitmentID;
  }

  //选择开始时间
  selectStartTime(val: any) {
    let date = val.year + "-" + val.month + "-" + val.day;
    let time = val.hour + ":" + val.minute + ":" + val.second;
    this.classroomApplication.start_time = date + " " + time;
  }

  //选择结束时间
  selectFinishedTime(val: any) {
    let date = val.year + "-" + val.month + "-" + val.day;
    let time = val.hour + ":" + val.minute + ":" + val.second;
    this.classroomApplication.finish_time = date + " " + time;
  }

  //提交
  async submit() {
    await api.BaseRequest.postRequest(
      "/v1/arrangement",
      this.classroomApplication
    ).then((res: any) => {
      if (res.data.code == 0) {
        Toast.success("提交成功！");
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