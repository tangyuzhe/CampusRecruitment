<template>
  <view>
    <u-form ref="uForm">
      <u-form-item label="工号" label-width="150">
        <u-input v-model="AdminInfo.work_id" placeholder="请输入工号" border />
      </u-form-item>
      <u-form-item label="姓名" label-width="150">
        <u-input v-model="AdminInfo.name" placeholder="请输入姓名" border />
      </u-form-item>
      <u-form-item label="当前时间" label-width="150">
        <u-input v-model="AdminInfo.audit_time" border disabled />
      </u-form-item>
    </u-form>

    <u-button type="primary" @click="submit">提交审核</u-button>
  </view>
</template>

<script lang="ts">
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../../api/request";
import moment from "moment";
@Component({
  components: {},
})
export default class AdminForm extends Vue {
  AdminInfo: any = {
    audit_time: "",
    audit_situation: "",
    audit_instructions: "",
  };

  //根据openid获取用户信息
  async getUserInfo() {
    let openid = "oeJ85uJDWaMNq33UN9V7vFfuJ0P0";
    await api.BaseRequest.getRequest("/v1/user?", {
      openid: openid,
    }).then((res: any) => {
      this.AdminInfo.user_id = res.data.data.id; //用户id
    });
  }

  created() {
    this.getUserInfo();
    this.AdminInfo.audit_time = moment(new Date()).format(
      "YYYY-MM-DD HH:MM:SS"
    );
  }

  async submit() {
    this.getUserInfo();
    await api.BaseRequest.postRequest("/v1/admin", this.AdminInfo).then(
      (res: any) => {
        if (res.data.code == 0) {
          Toast.success("提交成功！");
        }
      }
    );
  }
}
</script>

<style scoped lang="scss">
</style>