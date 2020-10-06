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
    <u-row gutter="16">
      <u-col span="12">
        <view class="demo-layout bg-purple-light"
          ><u-button
            type="success"
            class="margin-top"
            shape="circle"
            @click="finish"
            >返回首页</u-button
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
export default class finishPage extends Vue {
  title: string = "消息通知";
  description: string = "您已经完成所有信息的申请！请耐心等待审核。";

  finish() {
    uni.removeStorageSync("Recruitment");
    uni.removeStorageSync("Station");
    uni.navigateTo({
      url: "/pages/home/index",
    });
  }
}
</script>

<style scoped lang="scss">
</style>