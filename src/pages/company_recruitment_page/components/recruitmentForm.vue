<template>
  <view class="wrap">
    <text class="title">招聘信息</text>
    <u-form ref="uForm" class="margin-top">
      <u-form-item label="招聘信息" label-width="200">
        <u-input
          v-model="Recruitment.recruitment_info"
          type="textarea"
          auto-height
          height="200"
          border
        />
      </u-form-item>

      <u-form-item label="上传文件" label-width="200" prop="uuid">
        <u-upload max-count="1" ref="uUpload" :action="action"></u-upload>
      </u-form-item>

      <u-form-item label="开始时间" label-width="200">
        <u-input
          type="select"
          v-model="Recruitment.start_time"
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
          v-model="Recruitment.finish_time"
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
    <u-button type="primary" @click="submit">提交</u-button>
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
export default class RecruitmentForm extends Vue {
  @Prop({}) companyID!: number;
  Recruitment: any = {};
  action: string = "http://127.0.0.1:7001/api/v1/upload";
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
  toCloseForm: boolean = false;

  //子组件传父组件关闭弹窗
  @Emit("closeForm") closeForm(data: boolean) {}

  created() {
    this.Recruitment.company_id = this.companyID;
  }

  //提交
  async submit() {
    this.Recruitment.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    let list = [];
    list = (this.$refs.uUpload as any).lists;
    console.log(list);
    if (list.length == 0) {
      Toast.fail("未提交有效的文件！");
    } else {
      this.Recruitment.enclosure = list[0].response.files.fileName;
      this.post();
      setTimeout(() => {
        this.closeForm(this.toCloseForm);
      }, 2000);
    }
  }

  //Post RecruitmentFormData
  async post() {
    await api.BaseRequest.postRequest("/v1/recruitment", this.Recruitment).then(
      (res: any) => {
        console.log(res);
        if (res.data.code == 0) {
          Toast.success("提交成功！");
        }
      }
    );
  }

  //选择开始时间
  selectStartTime(val: any) {
    let date = val.year + "-" + val.month + "-" + val.day;
    let time = val.hour + ":" + val.minute + ":" + val.second;
    this.Recruitment.start_time = date + " " + time;
  }

  selectFinishedTime(val: any) {
    let date = val.year + "-" + val.month + "-" + val.day;
    let time = val.hour + ":" + val.minute + ":" + val.second;
    this.Recruitment.finish_time = date + " " + time;
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