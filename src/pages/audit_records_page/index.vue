<template>
  <view>
    <view class="tabBar">
      <u-tabs-swiper
        ref="uTabs"
        :list="list"
        :current="currentTab"
        @change="tabsChange"
        :is-scroll="false"
        active-color="#2b85e4"
        bar-height="6"
        bar-width="40"
      ></u-tabs-swiper>
    </view>

    <view class="wrap margin-top" v-if="currentTab === 0">
      <application-records-table></application-records-table>
    </view>
    <view class="wrap margin-top" v-if="currentTab === 1">
      <admin-application></admin-application>
    </view>
    <view class="wrap margin-top" v-if="currentTab === 2">
      <classroom-arrangement-list></classroom-arrangement-list>
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../api/request";
import ApplicationRecordsTable from "./recordsTable/applicationRecords.vue";
import AdminApplication from "./recordsTable/adminRecords.vue";
import ClassroomArrangementList from "./recordsTable/classroomArrangement.vue";
@Component({
  components: {
    ApplicationRecordsTable,
    AdminApplication,
    ClassroomArrangementList,
  },
})
export default class AuditRecordsPage extends Vue {
  list: object[] = [
    {
      name: "企业申请记录",
    },
    {
      name: "管理员申请记录",
    },
    {
      name: "教室安排",
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