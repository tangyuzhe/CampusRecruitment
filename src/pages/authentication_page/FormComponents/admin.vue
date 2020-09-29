<template>
  <view>
    <u-form ref="uForm">
      <u-form-item label="工号" label-width="200">
        <u-input v-model="work_id" placeholder="请输入工号" />
      </u-form-item>
    </u-form>

    <u-button type="primary" @click="submit">提交</u-button>
  </view>
</template>

<script lang="ts">
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../../api/request";
@Component({
  components: {},
})
export default class AdminForm extends Vue {
  work_id: string = "";
  id: number = -1;

  //根据openid获取用户信息
  async getUserInfo() {
    let openid = "oeJ85uJDWaMNq33UN9V7vFfuJ0P0";
    await api.BaseRequest.getRequest("/v1/user?", {
      openid: openid,
    }).then((res: any) => {
      this.id = res.data.data.id;
    });
  }

  //修改工号
  async updateWorkID() {
    let query = {
      id: this.id,
      work_id: this.work_id,
    };
    await api.BaseRequest.putRequestWithParams("/v1/user?", query).then(
      (res: any) => {
        if (res.data.code == 0) {
          Toast.success("提交成功，等待审核！");
        }
      }
    );
  }

  created() {
    this.getUserInfo();
  }

  async submit() {
    this.getUserInfo();
    this.updateWorkID();
  }
}
</script>

<style scoped lang="scss">
</style>