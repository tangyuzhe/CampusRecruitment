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
      <company-form :company_id="company_id"></company-form>
    </view>
    <view class="wrap margin-top" v-if="currentTab===1">
      <admin-form :user_id ='user_id'></admin-form>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CompanyForm from "./FormComponents/company.vue";
import AdminForm from "./FormComponents/admin.vue";
@Component({
  components: {
    CompanyForm,
    AdminForm,
  },
})
export default class AuthenticationPage extends Vue {
  user_id: string = "" ;
  company_id: string = "" ;
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

  onLoad(option: any) {
    console.log(option);
    this.user_id = option.user_id;
    this.company_id = option.company_id;
  }
}
</script>

<style scoped lang="scss">
.wrap {
  padding: 24rpx;
  background: white;
}
</style>