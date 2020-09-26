<template>
  <view class="wrap">
    <text class="title">岗位添加</text>
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
        <u-number-box
          v-model="Station.recruit_number"
          @change="recruit_number_change"
        ></u-number-box>
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
export default class StationForm extends Vue {
  @Prop({}) companyID!: number;
  Station: any = {
    recruit_number: 0,
  };

  //子组件传父组件关闭弹窗
  @Emit("closeForm") closeForm(data: boolean) {}

  //recruit_number_change
  recruit_number_change(e: any) {
    // this.Station.recruit_number = e.val;
  }

  //提交
  async submit() {
    console.log(this.Station);
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