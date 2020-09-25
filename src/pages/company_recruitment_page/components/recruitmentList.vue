<template>
  <view>
    <view class="wrap">
      <u-row gutter="16">
        <u-col span="5" offset="6">
          <view class="demo-layout bg-purple">
            <u-button
              type="primary"
              size="medium"
              shape="circle"
              plain
              @click="recruitmentForm = true"
            >
              <u-icon name="plus"></u-icon>
              添加招聘信息</u-button
            >
          </view>
        </u-col>
      </u-row>
    </view>

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
      :sub-title="formatTime(item.time)"
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
          size="34"
          color=""
          :label="'开始时间：' + formatTime(item.start_time)"
        >
        </u-icon>
        <p></p>
        <u-icon
          size="34"
          color=""
          :label="'结束时间：' + formatTime(item.finish_time)"
        >
        </u-icon>
      </view>
    </u-card>

    <u-loadmore :status="status" @loadmore="loadmore" :load-text="loadText" />

    <u-popup
      v-model="recruitmentForm"
      border-radius="14"
      mode="bottom"
      height="500px"
      closeable
    >
      <recruitment-form
        :companyID="companyID"
        @closeForm="getData"
      ></recruitment-form>
    </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as api from "../../../api/request";
import moment from "moment";
import RecruitmentForm from "./recruitmentForm.vue";
@Component({
  components: { RecruitmentForm },
})
export default class RecruitmentList extends Vue {
  title: string = "发布时间";
  @Prop({}) companyID!: number;
  availableHeight: number = 0;
  isEmpty: boolean = false;
  list: any = [];
  currentPage: number = 1;
  pageSize: number = 10;
  status: string = "loadmore";
  loadText: object = {
    loadmore: "轻轻上拉加载",
    loading: "努力加载中",
    nomore: "没有更多了",
  };
  recruitmentForm: boolean = false;

  //获取招聘信息列表
  async getRecruitmentList(
    company_id: number,
    currentPage: number,
    pageSize: number
  ) {
    await api.BaseRequest.getRequest("/v1/recruitment?", {
      company_id: company_id,
      currentPage: currentPage,
      pageSize: pageSize,
    }).then((res: any) => {
      if (res.data.data.count == 0) {
        this.isEmpty = true;
      } else {
        this.list = this.list.concat(res.data.data.rows);
        if (this.list.length === res.data.data.count) {
          this.status = "nomore";
        }
      }
    });
  }

  //获取可用窗口的高度
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

  //上拉加载更多
  loadmore() {
    this.status = "loading";
    this.currentPage++;
    setTimeout(() => {
      this.getRecruitmentList(this.companyID, this.currentPage, this.pageSize);
    }, 2000);
  }

  //父组件获取子组件的参数
  getData(val: boolean) {
    this.recruitmentForm = val;
    this.currentPage = 1;
    this.list = [];
    this.status = "loadmore";
    this.getRecruitmentList(this.companyID, this.currentPage, this.pageSize);
  }

  created() {
    this.getRecruitmentList(this.companyID, this.currentPage, this.pageSize);
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

.demo-layout {
  height: 60rpx;
  border-radius: 8rpx;
}

.bg-purple {
  background: #e8ebee;
}
</style>