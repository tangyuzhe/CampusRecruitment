<template>
  <view>
    <view class="middle">
      <!-- <view style="float: right">
        <u-button type="primary" size="mini" @click="openClassroomForm">
          <u-icon name="plus"></u-icon> 教室申请</u-button
        >
      </view> -->
      <u-empty text="未查询到数据" mode="data" v-show="isEmpty"></u-empty>
    </view>

    <u-table font-size="24" align="left" v-show="!isEmpty">
      <u-tr class="u-tr">
        <u-th class="u-th" width="15%">序号</u-th>
        <u-th class="u-th" width="35%">教室用途</u-th>
        <u-th class="u-th" width="25%">教室安排</u-th>
        <u-th class="u-th" width="25%">是否通过</u-th>
      </u-tr>
      <u-tr
        class="u-tr"
        v-for="(item, index) in list"
        :key="index"
        style="height: 60px"
      >
        <u-td class="u-td" width="15%">{{ index + 1 }}</u-td>
        <u-td class="u-td" width="35%">{{ item.purpose }}</u-td>
        <u-td class="u-td" width="25%"
          >{{ item.classroom ? item.classroom : "" }}
        </u-td>
        <u-td class="u-td" width="25%"
          >{{ item.audit_situation ? item.audit_situation : "暂未审核" }}
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

    <!-- 教室申请 -->
    <u-popup
      v-model="classroomForm"
      border-radius="14"
      closeable
      mode="center"
      width="600"
      height="600"
    >
      <classroom-application-form
        :recruitmentID="queryparams.id"
        @closeClassroomForm="getClassroomFormData"
      ></classroom-application-form>
    </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import * as api from "../../../api/request";
import { SwipeCell, Divider, Pagination, Toast } from "vant";
import ClassroomApplicationForm from "./classroomForm.vue";
@Component({
  components: { SwipeCell, Divider, Pagination, ClassroomApplicationForm },
})
export default class ClassroomApplicationList extends Vue {
  list: any = [];
  queryparams: any = {
    id: 0,
    currentPage: 1,
    pageSize: 10,
  };
  total: number = -1;
  isEmpty: boolean = false;
  classroomForm: boolean = false;

  //获取岗位列表
  async getArrangementList() {
    await api.BaseRequest.getRequest(
      "/v1/arrangeClassroomList?",
      this.queryparams
    ).then((res: any) => {
      if (res.data.code == 0) {
        this.total = res.data.data.count;
        this.list = res.data.data.rows;
      }
      if (res.data.data.count == 0) {
        this.isEmpty = true;
        Toast.fail("未查询到数据");
      }
    });
  }

  //上一页和下一页
  selectPagination(val: number) {
    this.queryparams.currentPage = val;
    this.getArrangementList();
  }

  openClassroomForm() {
    this.classroomForm = true;
  }

  //关闭教室申请表单
  getClassroomFormData(val: boolean) {
    this.classroomForm = val;
    this.queryparams.currentPage = 1;
    this.getArrangementList();
  }

  //修改教室安排表单
  update(item: any) {
    this.classroomForm = true;
  }

  onLoad(option: any) {
    this.queryparams.id = option.recruitment_id;
    this.getArrangementList();
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