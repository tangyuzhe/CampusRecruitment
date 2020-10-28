<template>
  <view class="main">
    <u-form :model="AdminAudition" ref="uForm">
      <u-form-item label="姓名" label-width="150">
        <u-input border v-model="AdminAudition.name" :disabled="disabled" />
      </u-form-item>
      <u-form-item label="工号" label-width="150">
        <u-input border v-model="AdminAudition.work_id" :disabled="disabled" />
      </u-form-item>
      <u-form-item label="审核时间" label-width="150">
        <u-input
          border
          disabled
          :value="formatTime(AdminAudition.audit_time)"
        />
      </u-form-item>
      <u-form-item label="审核情况" label-width="150">
        <u-input
          border
          v-model="AdminAudition.audit_situation"
          disabled
          placeholder=""
        />
      </u-form-item>
      <u-form-item label="审核说明" label-width="150">
        <u-input
          border
          v-model="AdminAudition.audit_instructions"
          type="textarea"
          disabled
          height="200"
          placeholder=""
        />
      </u-form-item>
    </u-form>

    <u-modal
      v-model="showTips"
      :content="content"
      show-cancel-button
      @confirm="submit"
    ></u-modal>

    <u-button
      :type="disabled ? 'primary' : 'warning'"
      class="margin-top"
      @click="updateAudition"
      >{{ disabled ? "前往修改" : "修改" }}</u-button
    >
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import * as api from "../../../api/request";
import { Toast } from "vant";
@Component({
  components: {},
})
export default class AdminAudition extends Vue {
  AdminAudition: any = {};
  disabled: boolean = true;
  showTips: boolean = false;
  content: string = "是否确保信息已经完善，进行提交？";

  formatTime(time: string) {
    return moment(time).format("YYYY-MM-DD HH:MM:SS");
  }

  //查询申请记录
  async queryAudition(user_id: number) {
    console.log(user_id);
    let query = {
      user_id: user_id,
    };
    await api.BaseRequest.getRequest("/v1/adminAudition?", query).then(
      (res: any) => {
        if (res.statusCode === 404) {
          Toast.fail("未查询到您的申请记录");
          setTimeout(() => {
            uni.navigateTo({
              url: "/pages/home/index",
            });
          }, 2000);
        } else {
          this.AdminAudition = res.data.data;
        }
      }
    );
  }

  //
  async updateAudition() {
    if (this.disabled) {
      this.disabled = false;
    } else {
      this.showTips = true;
    }
  }

  async submit() {
    await api.BaseRequest.putRequest(
      "/v1/adminAudition/" + this.AdminAudition.id,
      this.AdminAudition
    ).then((res: any) => {
      // console.log(res);
      if (res.data.code == 0) {
        Toast.success("修改成功！");
        this.disabled = true;
      }
    });
  }

  onLoad(option: any) {
    console.log(option);
    this.queryAudition(option.user_id);
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 90%;
  margin: 0 5%;
}
</style>