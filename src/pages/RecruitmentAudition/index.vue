<template>
  <view>
    <u-table font-size="28" align="left">
      <u-tr class="u-tr" style="height: 40px">
        <u-th class="u-th" width="15%">序号</u-th>
        <u-th class="u-th" width="50%">招聘信息</u-th>
        <u-th class="u-th" width="15%">是否通过</u-th>
        <u-th class="u-th" width="20%">查看详情</u-th>
      </u-tr>
      <u-tr
        class="u-tr"
        v-for="(item, index) in list"
        :key="index"
        style="height: 50px"
      >
        <u-td class="u-td" width="15%">{{ index + 1 }}</u-td>
        <u-td class="u-td" width="50%">{{ item.recruitment_info }}</u-td>
        <u-td class="u-td" width="15%">{{ item.audit_situation }}</u-td>
        <u-td class="u-td" width="20%">
          <u-button
            type="primary"
            size="mini"
            @click="showDetail(item)"
            :disabled="item.audit_situation == '通过'"
            >审核</u-button
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
import * as api from "../../api/request";
import { Pagination, Toast } from "vant";
import qs from "qs";
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
    pageSize: 15,
  };

  //获取申请列表
  async GetRecruitmentList() {
    await api.BaseRequest.getRequest("/v1/recruitment?", this.params).then(
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
    this.GetRecruitmentList();
  }

  //查看招聘详情
  showDetail(item: any) {
    uni.setStorage({
      key: "recruitmentData",
      data: item,
    });
    uni.navigateTo({
      url: "/pages/RecruitmentAudition/recruitmentDetail/index",
    });
  }

  onLoad() {
    this.GetRecruitmentList();
  }
}
</script>

<style scoped lang="scss">
</style>