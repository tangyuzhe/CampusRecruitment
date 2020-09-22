<template>
  <view>
    <view class="tabBar">
      <u-tabs-swiper
        ref="uTabs"
        :list="list"
        :current="currentTab"
        @change="tabsChange"
        :is-scroll="false"
        active-color="#fcbd71"
        bar-height="6"
        bar-width="40"
      ></u-tabs-swiper>
    </view>
    <view class="wrap margin-top" v-if="currentTab===0">
      <company-form></company-form>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CompanyForm from "./FormComponents/company.vue";
@Component({
  components: {
    CompanyForm,
  },
})
export default class AuthenticationPage extends Vue {
  list: object[] = [
    {
      name: "企业认证",
    },
    {
      name: "管理员认证",
    },
  ];
  currentTab: number = 0;

  tabsChange(index: number) {
    this.currentTab = index;
  }
}
</script>

<style scoped lang="scss">
.wrap {
  padding: 24rpx;
  background: white;
}
</style>