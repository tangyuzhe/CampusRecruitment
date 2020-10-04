<template>
  <view class="wrap">
    <u-form ref="uForm" class="margin-top" v-model="recruitment">
      <u-form-item label="招聘信息" label-width="150">
        <u-input
          v-model="recruitment.recruitment_info"
          type="textarea"
          height="200"
          border
        />
      </u-form-item>

      <u-form-item label="上传文件" label-width="150">
        <u-upload max-count="1" ref="uUpload" :action="action"></u-upload>
      </u-form-item>

      <u-form-item label="开始时间" label-width="150">
        <u-input
          type="select"
          v-model="recruitment.start_time"
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

      <u-form-item label="结束时间" label-width="150">
        <u-input
          type="select"
          v-model="recruitment.finish_time"
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
export default class RecruitmentForm extends Vue {
  recruitment: any = {
    audit_situation: "等待审核",
    audit_info: "",
    audit_time: new Date(),
    time: new Date(),
  };
  @Prop({}) company_id!: number;
  @Prop({}) current!: number;
  @Emit("getRecruitmentID") getRecruitmentID(id: number) {}
  action: string = "http://127.0.0.1:7001/api/v1/upload";
  start_time: boolean = false;
  finished_time: boolean = false;
  params: object = {
    year: true,
    month: true,
    day: true,
    hour: true,
    minute: true,
    second: false,
  };

  selectStartTime(val: any) {
    let date = val.year + "-" + val.month + "-" + val.day;
    let time = val.hour + ":" + val.minute;
    this.recruitment.start_time = date + " " + time;
  }

  selectFinishedTime(val: any) {
    let date = val.year + "-" + val.month + "-" + val.day;
    let time = val.hour + ":" + val.minute;
    this.recruitment.finish_time = date + " " + time;
  }

  //数据初始化
  init() {
    this.recruitment.company_id = this.company_id;
  }

  //提交表单
  async submit() {
    let list = [];
    list = (this.$refs.uUpload as any).lists;
    if (list.length == 0) {
      Toast.fail("未提交有效的文件！");
    } else {
      this.recruitment.enclosure = list[0].response.files.fileName;
      await api.BaseRequest.postRequest(
        "/v1/recruitment",
        this.recruitment
      ).then((res: any) => {
        console.log(res);
        if (res.data.code == 0) {
          Toast.success("提交成功！");
          this.getRecruitmentID(res.data.data.id);
        }
      });
    }
  }

  @Watch("current")
  WatchCurrent(newVal: number) {
    if (newVal == 0) {
      this.submit();
    }
  }

  created() {
    this.init();
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
