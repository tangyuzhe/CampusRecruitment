<template>
  <view>
    <u-table font-size="28" align="left">
      <u-tr class="u-tr" style="height:40px">
        <u-th class="u-th" width="30%">序号</u-th>
        <u-th class="u-th" width="50%">公司名</u-th>
        <u-th class="u-th" width="20%">查看详情</u-th>
      </u-tr>
      <u-tr class="u-tr" v-for="(item,index) in list" :key="index" style="height:50px">
        <u-td class="u-td" width="30%">{{index+1}}</u-td>
        <u-td class="u-td" width="50%">{{item.company}}</u-td>
        <u-td class="u-td" width="20%">
          <u-button type="primary" size="mini" @click="WatchCompanyDetail(item.id)">查看</u-button>
        </u-td>
      </u-tr>
    </u-table>
    <van-pagination
      v-model="currentPage"
      :page-count="pageCount"
      mode="simple"
      @change="paginationChange"
    />
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../../api/request";
import { Pagination } from "vant";
@Component({
  components: {
    Pagination,
  },
})
export default class ApplicationRecordsTable extends Vue {
  currentPage: number = 1;
  pageCount: number = 1;
  list: any = [];
  params: any = {
    currentPage: 1,
    pageSize: 15,
  };

  //获取申请列表
  async GetApplicationList() {
    await api.BaseRequest.getRequest("/v1/application?", this.params).then(
      (res: any) => {
        if (res.data.code == 0) {
          this.pageCount = Math.ceil(
            res.data.data.count / this.params.pageSize
          );
          this.list = res.data.data.rows;
        }
      }
    );
  }

  //当前页改变
  paginationChange(val: number) {
    this.params.currentPage = val;
    this.GetApplicationList();
  }

  //查看公司详情
  WatchCompanyDetail(val: number) {
    // console.log(val);
    uni.navigateTo({
      url:
        "/pages/audit_records_page/details/companyDetail_page?company_id=" +
        val,
    });
  }

  created() {
    this.GetApplicationList();
  }
}
</script>

<style scoped lang="scss">
</style>