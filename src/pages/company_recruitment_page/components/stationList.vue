<template>
  <view>
    <view class="middle">
      <u-empty text="未查询到数据" mode="data" v-if="isEmpty"></u-empty>
    </view>
    <van-swipe-cell
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
    </van-swipe-cell>
    <van-pagination
      style="position: fixed; bottom: 0; width: 100%"
      v-model="queryparams.currentPage"
      :page-count="Math.ceil(total / queryparams.pageSize)"
      mode="simple"
      @change="selectPagination"
    />
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
  @Prop({}) recruitmentID!: number;
  isEmpty: boolean = false;

  //获取岗位列表
  async getStationList() {
    await api.BaseRequest.getRequest("/v1/station?", this.queryparams).then(
      (res: any) => {
        console.log(res);
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

  created() {
    this.queryparams.recruitment_id = this.recruitmentID;
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
</style>