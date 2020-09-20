<template>
  <view>
    <view class="padding bg-white">
      <view
        class="cu-avatar xl round margin-left margin-top"
        :style="{backgroundImage:'url(' + img + ')'}"
      ></view>
      <view class="padding-xs flex align-center">
        <view class="flex-sub text-center">
          <view class="text-xl" style="margin-top:-70px;margin-bogttom:10px;">
            <text class="text-black text-bold">欣欣如梦</text>
          </view>
          <text class="padding">公司名</text>
        </view>
      </view>
      <view class="drop">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="value1"
            :options="option1"
            style="width:40px"
            @change="PermissionChange"
          />
        </van-dropdown-menu>
      </view>
    </view>

    <view>
      <u-grid :col="3">
        <u-grid-item v-for="(item,index) in grideList" :key="index">
          <u-icon :name="item.icon" :size="46"></u-icon>
          <view class="grid-text">{{item.name}}</view>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Home extends Vue {
  img: string =
    "https://thirdwx.qlogo.cn/mmopen/vi_32/bX9HAxGRic2cV48BKJpD2UMU7pvzgW9tGv1lNZLHpmIEeOKxbYgMJLuMlhkaqicsntlmDYxCwnJxqjudsrcnN6TQ/132";
  value1: string = "游客";
  option1: any = [
    { text: "游客", value: "游客" },
    { text: "企业", value: "企业" },
    { text: "管理员", value: "管理员" },
  ];
  grideList: any = [
    { icon: "photo", name: "认证申请", permission: ["游客"] },
    { icon: "lock", name: "企业记录", permission: ["企业"] },
    { icon: "hourglass", name: "管理员审核", permission: ["管理员"] },
  ];

  PermissionChange(value: any) {
    this.value1 = value;
    this.ChangePermission();
  }

  ChangePermission() {
    this.grideList = [
      { icon: "photo", name: "认证申请", permission: ["游客"] },
      { icon: "lock", name: "企业记录", permission: ["企业"] },
      { icon: "hourglass", name: "管理员审核", permission: ["管理员"] },
    ];
    this.grideList.forEach((e: any) => {
      if (!e.permission.includes(this.value1)) {
        let index = this.grideList.indexOf(e);
        console.log(index);

        this.grideList.splice(index, 1);
      }
    });
  }

  onLoad() {
    this.ChangePermission();
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