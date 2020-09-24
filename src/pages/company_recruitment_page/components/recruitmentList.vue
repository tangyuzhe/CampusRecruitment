<template>
  <view>
    <view
      class="empty"
      :style="{ height: availableHeight + 'px' }"
      v-if="isEmpty"
    >
      <u-empty
        text="查询不到招聘信息"
        mode="data"
        color="#fa3534"
        icon-color="#fa3534"
      ></u-empty>
    </view>

    <u-card
      :title="title"
      :sub-title="subTitle"
      :thumb="thumb"
      v-show="!isEmpty"
      v-for="(item, index) in list"
      :key="index"
    >
      <view class="" slot="body">
        <view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
          <view class="u-body-item-title u-line-2">{{
            item.recruitment_info
          }}</view>
        </view>
        <u-link :href="'http://127.0.0.1:7001/public/upload/' + item.enclosure">
          <u-icon
            :name="item.enclosure ? 'photo' : ''"
            size="80"
            :label="item.enclosure ? '点击文件下载' : '暂无文件'"
            label-size="22"
            margin-bottom="100"
            label-color="#19be6b"
          ></u-icon>
        </u-link>
      </view>
      <view class="" slot="foot">
        <u-icon
          name="chat-fill"
          size="34"
          color=""
          :label="formatTime(item.start_time)"
        >
        </u-icon>
        <p></p>
        <u-icon
          name="chat-fill"
          size="34"
          color=""
          :label="formatTime(item.finish_time)"
        >
        </u-icon>
      </view>
    </u-card>
  </view>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as api from "../../../api/request";
import moment from "moment";
@Component({
  components: {},
})
export default class RecruitmentList extends Vue {
  title: string = "";
  subTitle: string = "2020-05-15";
  thumb: string =
    "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg";
  @Prop({}) companyID!: number;
  availableHeight: number = 0;
  isEmpty: boolean = false;
  list: any = [];

  //获取招聘信息列表
  async getRecruitmentList(company_id: number) {
    await api.BaseRequest.getRequest("/v1/recruitment?", {
      company_id: company_id,
    }).then((res: any) => {
      if (res.data.data.length == 0) {
        this.isEmpty = true;
      } else {
        this.list = res.data.data;
      }
    });
  }

  getWindowInfo() {
    uni.getSystemInfo({
      success: (res) => {
        this.availableHeight = res.windowHeight - res.statusBarHeight;
      },
    });
  }

  //时间格式化
  formatTime(time: string | Object) {
    return moment(time).format("YYYY年MM月DD日 HH:mm:ss");
  }

  created() {
    this.getRecruitmentList(this.companyID);
    this.getWindowInfo();
  }
}
</script>

<style scoped lang="scss">
body {
  position: relative;
}

.u-card-wrap {
  background-color: $u-bg-color;
  padding: 1px;
}

.u-body-item {
  font-size: 32rpx;
  color: #333;
  padding: 20rpx 10rpx;
}

.u-body-item image {
  width: 120rpx;
  flex: 0 0 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-left: 12rpx;
}

.empty {
  width: 100%;
  height: 654px;
  background: #ffffff;
}
</style>