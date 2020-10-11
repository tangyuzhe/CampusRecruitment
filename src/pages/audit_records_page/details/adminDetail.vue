<template>
  <view class="margin-top">
    <van-form>
      <van-field
        name="用户姓名"
        label="用户姓名"
        readonly
        :value="audition.name"
      />

      <van-field name="工号" label="工号" readonly :value="audition.work_id" />

      <van-field name="审核情况" label="审核情况">
        <template #input>
          <van-radio-group
            v-model="audition.audit_situation"
            direction="horizontal"
          >
            <van-radio name="不通过">不通过</van-radio>
            <van-radio name="通过">通过</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="audition.audit_instructions"
        name="审核详情"
        label="审核详情"
        type="textarea"
      />

      <div style="margin: 16px">
        <van-button round block type="info" @click="submit">
          提交审核
        </van-button>
      </div>
    </van-form>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import * as api from "../../../api/request";
import { Toast, Form, RadioGroup, Radio } from "vant";
import moment from "moment";
@Component({
  components: {},
})
export default class AdminApplicationDetailPage extends Vue {
  audition: any = {
    audit_time: new Date(),
  };

  onLoad(option: any) {
    this.audition = option;
  }

  async submit() {
    this.audition.audit_time = new Date();
    await api.BaseRequest.putRequest(
      "/v1/adminAudition/" + this.audition.id,
      this.audition
    ).then((res: any) => {
      if (res.data.code == 0 && this.audition.audit_situation == "通过") {
        this.updateRole(this.audition.user_id);
        Toast.success("审核完成");
        uni.navigateBack({
          delta: -1,
        });
      }
    });
  }

  //更新角色
  async updateRole(id: number) {
    await api.BaseRequest.putRequestWithParams("/v1/user?", {
      id: id,
      role: "管理员",
      work_id: this.audition.work_id,
      name: this.audition.name,
    });
  }
}
</script>

<style scoped lang="scss">
image {
  width: 80px;
  height: 80px;
}
</style>
