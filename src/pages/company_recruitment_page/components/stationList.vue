<template>
  <view>
    <view class="middle">
      <u-empty text="未查询到数据" mode="data" v-if="isEmpty"></u-empty>
    </view>

    <!-- <van-swipe-cell
      v-for="(item, index) in list"
      :key="index"
      v-show="!isEmpty"
    >
      <u-card
        :title="
          '岗位' +
          ((queryparams.currentPage - 1) * queryparams.pageSize + index + 1) +
          ':' +
          item.station
        "
      >
        <view class="" slot="body">
          <view class="u-body-item u-flex u-col-between u-p-t-0">
            <view class="u-body-item-title u-line-2">{{
              "工作地点:" + item.workplace
            }}</view>
          </view>
          <view class="u-body-item u-flex u-row-between u-p-b-0">
            <view class="u-body-item-title">{{ "薪资:" + item.salary }}</view>
          </view>
          <view class="u-body-item u-flex u-row-between u-p-b-0">
            <view class="u-body-item-title">{{
              "招聘人数:" + (item.recruit_number ? item.recruit_number : "0")
            }}</view>
          </view>
        </view>
      </u-card>
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell> -->

    <u-table font-size="36" align="left" v-show="!isEmpty">
      <u-tr class="u-tr">
        <u-th class="u-th" width="15%">序号</u-th>
        <u-th class="u-th" width="35%">岗位名称</u-th>
        <u-th class="u-th" width="25%">招聘人数</u-th>
        <u-th class="u-th" width="25%">操作</u-th>
      </u-tr>
      <u-tr
        class="u-tr"
        v-for="(item, index) in list"
        :key="index"
        style="height: 60px"
      >
        <u-td class="u-td" width="15%">{{ index + 1 }}</u-td>
        <u-td class="u-td" width="35%">{{ item.station }}</u-td>
        <u-td class="u-td" width="25%">{{ item.recruit_number }}</u-td>
        <u-td class="u-td" width="25%">
          <u-button type="primary" size="mini" @click="WatchStationDetail(item)"
            >查看详情</u-button
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

    <!-- 岗位详情 -->
    <u-popup
      v-model="StationDetail"
      border-radius="14"
      mode="center"
      height="400px"
      width="400px"
      closeable
    >
      <view class="form_title margin-top">岗位详情</view>
      <u-form :model="Station" ref="uForm" class="form margin-top">
        <u-form-item label="岗位名称" label-width="200">
          <u-input v-model="Station.station" border />
        </u-form-item>
        <u-form-item label="薪资" label-width="200">
          <u-input v-model="Station.salary" border />
        </u-form-item>
        <u-form-item label="工作地点" label-width="200">
          <u-input v-model="Station.workplace" border type="textarea" />
        </u-form-item>
        <u-form-item label="招聘人数" label-width="200">
          <u-number-box v-model="Station.recruit_number"></u-number-box>
        </u-form-item>
        <u-button type="warning" @click="updateStation">修改</u-button>
      </u-form>
    </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as api from "../../../api/request";
import { SwipeCell, Divider, Pagination, Toast } from "vant";
@Component({
  components: { SwipeCell, Divider, Pagination },
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
  StationDetail: boolean = false;
  Station: any = {};

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

  //
  WatchStationDetail(item: any) {
    this.StationDetail = true;
    this.Station = item;
  }

  async updateStation() {
    await api.BaseRequest.putRequest(
      "/v1/station/" + this.Station.id,
      this.Station
    ).then((res: any) => {
      if (res.data.code == 0) {
        Toast.success("修改成功！");
        setTimeout(() => {
          this.StationDetail = false;
        }, 1000);
      }
    });
  }

  onLoad(option: any) {
    this.queryparams.recruitment_id = option.recruitment_id;
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