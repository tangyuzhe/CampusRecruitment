<template>
  <view>
    <u-table font-size="28" align="left">
      <u-tr class="u-tr" style="height: 40px">
        <u-th class="u-th" width="15%">序号</u-th>
        <u-th class="u-th" width="25%">姓名</u-th>
        <u-th class="u-th" width="40%">工号</u-th>
        <u-th class="u-th" width="20%">查看详情</u-th>
      </u-tr>
      <u-tr
        class="u-tr"
        v-for="(item, index) in list"
        :key="index"
        style="height: 50px"
      >
        <u-td class="u-td" width="15%">{{ index + 1 }}</u-td>
        <u-td class="u-td" width="25%">{{ item.name }}</u-td>
        <u-td class="u-td" width="40%">{{ item.work_id }}</u-td>
        <u-td class="u-td" width="20%">
          <u-button
            type="primary"
            size="mini"
            @click="pass(item)"
            :disabled="item.role == '管理员'"
            >通过</u-button
          >
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
import { Pagination, Toast } from "vant";
@Component({
  components: {
    Pagination,
  },
})
export default class AdminApplication extends Vue {
  currentPage: number = 1;
  pageCount: number = 1;
  list: any = [];
  params: any = {
    currentPage: 1,
    pageSize: 10,
  };

  //获取申请列表
  async GetApplicationList() {
    await api.BaseRequest.getRequest("/v1/user/admin?", this.params).then(
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

  //申请通过
  async pass(item: any) {
    let query = {
      id: item.id,
      role: "管理员",
    };
    await api.BaseRequest.putRequestWithParams("/v1/user?", query).then(
      (res: any) => {
        if (res.data.code == 0) {
          Toast.success("认证完成！");
        }
      }
    );
  }

  created() {
    this.GetApplicationList();
  }
}
</script>

<style scoped lang="scss">
</style>