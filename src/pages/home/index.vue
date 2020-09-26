<template>
  <view>
    <view class="padding bg-white">
      <view
        class="cu-avatar xl round margin-left margin-top"
        :style="{ backgroundImage: 'url(' + img + ')' }"
      ></view>
      <view class="padding-xs flex align-center">
        <view class="flex-sub text-center">
          <view class="text-xl" style="margin-top: -70px; margin-bogttom: 10px">
            <text class="text-black text-bold">欣欣如梦</text>
          </view>
          <text class="padding"
            >公司: {{ companyName ? companyName : "暂无公司" }}</text
          >
        </view>
      </view>
      <view class="drop">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="roleValue"
            :options="roleOption"
            style="width: 40px"
            @change="PermissionChange"
          />
        </van-dropdown-menu>
      </view>
    </view>

    <view>
      <u-grid :col="3">
        <u-grid-item
          v-for="(item, index) in grideList"
          :key="index"
          @click="PageJump(item)"
        >
          <u-icon :name="item.icon" :size="46"></u-icon>
          <view class="grid-text">{{ item.name }}</view>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../api/request";
import { roleOption, grideList } from "../../util/dataList";
@Component({
  components: {},
})
export default class Home extends Vue {
  img: string =
    "https://thirdwx.qlogo.cn/mmopen/vi_32/bX9HAxGRic2cV48BKJpD2UMU7pvzgW9tGv1lNZLHpmIEeOKxbYgMJLuMlhkaqicsntlmDYxCwnJxqjudsrcnN6TQ/132";
  roleValue: string = "游客";
  roleOption: any = [];
  grideList: any = [];
  user_id: number = -1;
  companyName: string = "";
  company_id: number = -1;

  //获取用户角色
  async getUserInfo() {
    await api.BaseRequest.getRequest("/v1/user?", {
      openid: "oeJ85uJDWaMNq33UN9V7vFfuJ0P0",
    }).then((res: any) => {
      if (res.data.code == 0) {
        this.roleValue = res.data.data.role;
        this.user_id = res.data.data.id;
        this.ChangePermission();
      }
    });
    this.getCompanyName();
  }

  //手动改变角色
  PermissionChange(value: any) {
    this.roleValue = value;
    this.grideList;
    this.ChangePermission();
  }

  //改变角色改变入口
  ChangePermission() {
    this.grideList = grideList;
    this.grideList = this.grideList.filter((item: any) =>
      item.permission.includes(this.roleValue)
    );
  }

  RouterRedirect(url: string) {
    uni.navigateTo({
      url: url,
    });
  }

  //路由跳转
  PageJump(item: any) {
    switch (item.name) {
      case "认证申请":
        this.RouterRedirect("/pages/authentication_page/index");
        break;
      case "管理员审核":
        this.RouterRedirect("/pages/audit_records_page/index");
        break;
      case "企业招聘信息":
        this.RouterRedirect(
          "/pages/company_recruitment_page/index?company_id=" + this.company_id
        );
        break;
      case "企业信息修改":
        this.RouterRedirect(
          "/pages/companyDetail/index?company_id=" + this.company_id
        );
        break;
    }
  }

  //获取公司名
  async getCompanyName() {
    await api.BaseRequest.getRequestWithPath(
      "/v1/application/" + this.user_id
    ).then((res: any) => {
      if (res.data.data.length !== 0) {
        this.companyName = res.data.data[0].company;
        this.company_id = res.data.data[0].id;
      }
    });
  }

  onLoad() {
    this.roleOption = roleOption;
    this.grideList = grideList;
    this.ChangePermission();
    this.getUserInfo();
  }
}
</script>

<style scoped lang="scss">
.header {
  margin: 0 auto;
  background: blue;
  margin: 0 10px;
}

image {
  width: 60px;
  height: 60px;
  position: relative;
  left: 20%;
  /* margin-left: -30px; */
  margin: 0 auto;
  border-radius: 50%;
  vertical-align: middle;
}

.drop {
  width: 100px;
  height: 40px;
  background: blue;
  float: right;
  position: relative;
  bottom: 60px;
}

.badge-icon {
  position: absolute;
  top: 14rpx;
  right: 40rpx;
  width: 30rpx;
  height: 30rpx;
}

.grid-text {
  font-size: 28rpx;
  margin-top: 4rpx;
  color: $u-type-info;
}
</style>