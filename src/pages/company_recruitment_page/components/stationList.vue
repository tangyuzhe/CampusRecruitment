<template>
  <view>
    <view class="middle">
      <!-- <view style="float: right">
        <u-button type="primary" size="mini" @click="openForm">
          <u-icon name="plus"></u-icon> 添加岗位</u-button
        >
      </view> -->
      <u-empty text="未查询到数据" mode="data" v-if="isEmpty"></u-empty>
    </view>

    <u-table font-size="24" align="left" v-show="!isEmpty">
      <u-tr class="u-tr">
        <u-th class="u-th" width="10%">序号</u-th>
        <u-th class="u-th" width="20%">岗位名称</u-th>
        <u-th class="u-th" width="20%">薪资</u-th>
        <u-th class="u-th" width="25%">工作地点</u-th>
        <u-th class="u-th" width="10%">招聘人数</u-th>
        <u-th class="u-th" width="15%">操作</u-th>
      </u-tr>
      <u-tr
        class="u-tr"
        v-for="(item, index) in list"
        :key="index"
        style="height: 60px"
      >
        <u-td class="u-td" width="10%">{{ index + 1 }}</u-td>
        <u-td class="u-td" width="20%">{{ item.station }}</u-td>
        <u-td class="u-td" width="20%">{{ item.salary }}</u-td>
        <u-td class="u-td" width="25%">{{ item.workplace }}</u-td>
        <u-td class="u-td" width="10%">{{ item.recruit_number }}</u-td>
        <u-td class="u-td" width="15%">
          <u-button type="warning" size="mini" @click="WatchStationDetail(item)"
            >修改</u-button
          >
        </u-td>
      </u-tr>
    </u-table>

    <van-pagination
      style="position: fixed; bottom: 0; width: 100%"
      v-model="queryparams.currentPage"
      :page-count="Math.ceil(total / queryparams.pageSize)"
      mode="simple"
      @change="selectPagination"
    />

    <u-popup
      v-model="addStationForm"
      border-radius="14"
      closeable
      mode="bottom"
      width="600"
      height="650"
      @close="station_data = {}"
    >
      <station-form
        :recruitmentID="recruitmentID"
        :stationData="station_data"
        :id="station_data.id"
        @closeStationForm="getStationFormData"
      ></station-form>
    </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as api from "../../../api/request";
import { SwipeCell, Divider, Pagination, Toast } from "vant";
import StationForm from "./stationForm.vue";
@Component({
  components: { SwipeCell, Divider, Pagination, StationForm },
})
export default class StationList extends Vue {
  list: any = [];
  queryparams: any = {
    recruitment_id: 0,
    currentPage: 1,
    pageSize: 10,
  };
  total: number = -1;
  isEmpty: boolean = false;
  addStationForm: boolean = false;
  station_data: any = {};
  recruitmentID: number = -1;

  //获取岗位列表
  async getStationList() {
    await api.BaseRequest.getRequest("/v1/station?", this.queryparams).then(
      (res: any) => {
        if (res.data.code == 0) {
          this.total = res.data.data.count;
          this.list = res.data.data.rows;
        }
        if (res.statusCode == 404) {
          this.isEmpty = true;
          Toast.fail("未查询到数据");
        }
      }
    );
  }

  //上一页和下一页
  selectPagination(val: number) {
    this.queryparams.currentPage = val;
    this.getStationList();
  }

  // 打开岗位表单
  openForm() {
    this.addStationForm = true;
  }

  //关闭表单
  getStationFormData(val: boolean) {
    this.addStationForm = val;
    this.queryparams.currentPage = 1;
    this.getStationList();
  }

  //修改岗位信息
  WatchStationDetail(item: any) {
    this.station_data = item;
    this.addStationForm = true;
  }

  onLoad(option: any) {
    this.queryparams.recruitment_id = option.recruitment_id;
    this.recruitmentID = option.recruitment_id;
    this.getStationList();
  }
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
}

.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}

.middle {
  display: inline-block;
  width: 100%;
  height: 100%;
  align-self: center;
  vertical-align: middle;
}

.u-td {
  text-overflow: ellipsis;
  overflow: hidden;
}

.form {
  width: 90%;
  margin: 0 5%;
}

.form_title {
  text-align: center;
  font-size: 20px;
}
</style>