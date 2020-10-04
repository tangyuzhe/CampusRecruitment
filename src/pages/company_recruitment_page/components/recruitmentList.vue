<template>
  <view>
    <view>
      <u-dropdown style="width: 100px; background: #ffffff; margin-left: 4%">
        <u-dropdown-item
          v-model="situation"
          :title="situation"
          :options="situationOptionList"
          @change="selectSituation"
        ></u-dropdown-item>
      </u-dropdown>
      <!-- <u-button
        class="add_btn"
        type="primary"
        size="medium"
        @click="recruitmentForm = true"
      >
        <u-icon name="plus"></u-icon>
      </u-button> -->
      <view class="add-plus bg-green">
        <u-icon
          name="plus"
          size="50"
          style="margin: 6px"
          @click="addRecruitment"
        ></u-icon>
      </view>
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
        <view>{{ "开始时间:" + formatTime(item.start_time) }}</view>
        <view>{{ "结束时间:" + formatTime(item.finish_time) }}</view>
        <u-button type="primary" size="mini" @click="WatchStation(item)"
          >查看岗位</u-button
        >
        <u-button
          type="primary"
          size="mini"
          class="margin-left margin-top"
          @click="WatchArrangement(item)"
          >教室记录</u-button
        >
      </view>
    </u-card>

    <u-loadmore
      :status="status"
      @loadmore="loadmore"
      :load-text="loadText"
      v-if="!isEmpty"
    />

    <!-- 招聘岗位表单 -->
    <u-popup
      v-model="recruitmentForm"
      border-radius="14"
      mode="bottom"
      height="500px"
      closeable
    >
      <recruitment-form
        :companyID="companyID"
        @closeForm="getDataOfRecruitmentForm"
      ></recruitment-form>
    </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import * as api from "../../../api/request";
import moment from "moment";
import RecruitmentForm from "./recruitmentForm.vue";
import StationList from "./stationList.vue";
import StationForm from "./stationForm.vue";
import ClassroomApplicationForm from "./classroomForm.vue";
@Component({
  components: {
    RecruitmentForm,
    StationList,
    StationForm,
    ClassroomApplicationForm,
  },
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
  situation: string = "全部";
  situationOptionList: any = [
    {
      label: "全部",
      value: "全部",
    },
    {
      label: "通过",
      value: "通过",
    },
    {
      label: "不通过",
      value: "不通过",
    },
    {
      label: "等待审核",
      value: "等待审核",
    },
  ];

  //获取招聘信息列表
  async getRecruitmentList(
    company_id: number,
    currentPage: number,
    pageSize: number,
    audit_situation?: string
  ) {
    let query: any = {
      company_id: company_id,
      currentPage: currentPage,
      pageSize: pageSize,
    };
    if (audit_situation) {
      query.audit_situation = audit_situation;
    }
    await api.BaseRequest.getRequest("/v1/recruitment?", query).then(
      (res: any) => {
        if (res.data.data.count == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
          this.list = this.list.concat(res.data.data.rows);
          if (this.list.length === res.data.data.count) {
            this.status = "nomore";
          }
        }
      }
    );
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
      if (this.situation == "全部") {
        this.getRecruitmentList(
          this.companyID,
          this.currentPage,
          this.pageSize
        );
      } else {
        this.getRecruitmentList(
          this.companyID,
          this.currentPage,
          this.pageSize,
          this.situation
        );
      }
    }, 2000);
  }

  //关闭招聘记录表单
  // getDataOfRecruitmentForm(val: boolean) {
  //   this.recruitmentForm = val;
  //   this.currentPage = 1;
  //   this.list = [];
  //   this.status = "loadmore";
  //   this.getRecruitmentList(this.companyID, this.currentPage, this.pageSize);
  // }

  //查看岗位页面跳转
  WatchStation(item: any) {
    uni.navigateTo({
      url:
        "/pages/company_recruitment_page/components/stationList?recruitment_id=" +
        item.id,
    });
  }

  //教室记录页面跳转
  WatchArrangement(item: any) {
    uni.navigateTo({
      url:
        "/pages/company_recruitment_page/components/classroomList?recruitment_id=" +
        item.id,
    });
  }

  created() {
    this.getRecruitmentList(this.companyID, this.currentPage, this.pageSize);
    this.getWindowInfo();
  }

  //菜单选择
  selectSituation(e: any) {
    console.log(e);
    this.currentPage = 1;
    this.list = [];
    this.status = "loadmore";
    if (e == "全部") {
      this.getRecruitmentList(this.companyID, this.currentPage, this.pageSize);
    } else {
      this.getRecruitmentList(
        this.companyID,
        this.currentPage,
        this.pageSize,
        e
      );
    }
  }

  addRecruitment() {
    uni.navigateTo({
      url: "/pages/recruitment/index?company_id=" + this.companyID,
    });
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

.station {
  position: absolute;
  right: 10px;
  top: -15px;
}

.add {
  position: absolute;
  right: 10px;
  top: -45px;
}

.add-plus {
  width: 40px;
  height: 40px;
  float: right;
  margin-top: -40px;
  margin-right: 4%;
  border-radius: 50%;
}
</style>