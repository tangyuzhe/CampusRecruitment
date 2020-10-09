<template>
  <view>
    <u-row gutter="16" class="margin-top">
      <u-col span="12">
        <u-alert-tips
          type="success"
          :title="title"
          :description="description"
          :show-icon="true"
        ></u-alert-tips>
      </u-col>
    </u-row>

    <van-form class="margin-top">
      <van-field
        v-model="recruitment.audit_info"
        name="审核详情"
        label="审核详情"
        type="textarea"
      />

      <van-field name="审核情况" label="审核情况">
        <template #input>
          <van-radio-group
            v-model="recruitment.audit_situation"
            direction="horizontal"
          >
            <van-radio name="不通过">不通过</van-radio>
            <van-radio name="通过">通过</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button round block type="info" @click="submit">
          完成审核
        </van-button>
      </div>
    </van-form>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import * as api from "../../../../api/request";
import { Toast } from "vant";
import moment from "moment";
@Component({
  components: {},
})
export default class finishPage extends Vue {
  title: string = "消息通知";
  description: string = "您已经阅读完所有信息，请进行招聘信息审核！";
  recruitment: any = {};

  async submit() {
    this.recruitment.audit_time = moment(new Date()).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    let id = uni.getStorageSync("recruitmentData").id;
    await api.BaseRequest.putRequestWithParams(
      "/v1/recruitment/" + id + "?",
      this.recruitment
    ).then((res: any) => {
      if (res.data.code == 0) {
        Toast.success("审核完成");
        uni.navigateTo({
          url: "/pages/RecruitmentAudition/index",
        });
      }
    });
  }

  created() {
    this.recruitment.audit_situation = uni.getStorageSync("audition");
  }
}
</script>

<style scoped lang="scss">
</style>