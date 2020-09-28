<template>
  <view>
    <u-table font-size="28" align="left">
      <u-tr class="u-tr" style="height: 60px">
        <u-th class="u-th" width="10%">序号</u-th>
        <u-th class="u-th" width="30%">教室用途</u-th>
        <u-th class="u-th" width="20%">教室安排</u-th>
        <u-th class="u-th" width="20%">是否通过</u-th>
        <u-th class="u-th" width="20%">操作</u-th>
      </u-tr>
      <u-tr
        class="u-tr"
        v-for="(item, index) in list"
        :key="index"
        style="height: 50px"
      >
        <u-td class="u-td" width="10%">{{ index + 1 }}</u-td>
        <u-td class="u-td" width="30%">
          {{ item.purpose }}
        </u-td>
        <u-td class="u-td" width="20%">{{ item.classroom }}</u-td>
        <u-td class="u-td" width="20%">{{ item.audit_situation }}</u-td>
        <u-td class="u-td" width="20%">
          <u-button
            type="primary"
            size="mini"
            @click="arrange(item)"
            :disabled="item.audit_situation == '通过'"
            >安排</u-button
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

    <u-popup
      v-model="arrangeForm"
      border-radius="14"
      closeable
      mode="center"
      width="700"
    >
      <view class="form">
        <text class="title">教室安排</text>
        <u-form ref="uForm" class="margin-top" v-model="classroomApplication">
          <u-form-item label="教室用途" label-width="200">
            <u-input
              v-model="classroomApplication.purpose"
              type="textarea"
              border
              disabled
            />
          </u-form-item>
          <u-form-item label="教室安排" label-width="200">
            <u-input v-model="classroomApplication.classroom" border />
          </u-form-item>
          <u-form-item label="开始时间" label-width="200">
            <u-input
              :value="formatTime(classroomApplication.start_time)"
              border
              disabled
            />
          </u-form-item>
          <u-form-item label="结束时间" label-width="200">
            <u-input
              :value="formatTime(classroomApplication.finished_time)"
              border
              disabled
            />
          </u-form-item>
          <u-form-item label="是否通过" label-width="200">
            <u-radio-group v-model="classroomApplication.audit_situation">
              <u-radio
                v-for="(item, index) in situation"
                :key="index"
                :name="item.name"
              >
                {{ item.name }}
              </u-radio>
            </u-radio-group>
          </u-form-item>
          <u-form-item
            label="不通过原因"
            label-width="200"
            v-show="classroomApplication.audit_situation == '不通过'"
          >
            <u-input
              v-model="classroomApplication.audit_instructions"
              border
              type="textarea"
            />
          </u-form-item>
        </u-form>
        <u-button class="margin-top" type="primary" @click="submit"
          >提交</u-button
        >
      </view>
    </u-popup>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../../api/request";
import { Pagination, Toast } from "vant";
import moment from "moment";
@Component({
  components: {
    Pagination,
  },
})
export default class classroomArrangementList extends Vue {
  currentPage: number = 1;
  pageCount: number = 1;
  list: any = [];
  params: any = {
    currentPage: 1,
    pageSize: 10,
  };
  arrangeForm: boolean = false;
  classroomApplication: any = {};
  situation: any = [{ name: "通过" }, { name: "不通过" }];

  //获取申请列表
  async GetApplicationList() {
    await api.BaseRequest.getRequest(
      "/v1/arrangeClassroomList?",
      this.params
    ).then((res: any) => {
      if (res.data.code == 0) {
        this.pageCount = Math.ceil(res.data.data.count / this.params.pageSize);
        this.list = res.data.data.rows;
      }
    });
  }

  //当前页改变
  paginationChange(val: number) {
    this.params.currentPage = val;
    this.GetApplicationList();
  }

  //时间格式化
  formatTime(time: string) {
    return moment(time).format("YYYY-MM-DD HH:MM:ss");
  }

  //教室安排
  arrange(item: any) {
    this.arrangeForm = true;
    this.classroomApplication = item;
  }

  created() {
    this.GetApplicationList();
  }

  async submit() {
    let data = this.classroomApplication;
    let params = {
      id: data.id,
      classroom: data.classroom,
      audit_instructions: data.audit_instructions,
      audit_situation: data.audit_situation,
    };
    await api.BaseRequest.putRequestWithParams(
      "/v1/arrangeClassroom?",
      params
    ).then((res: any) => {
      if (res.data.code == 0) {
        Toast.success("提交成功！");
        this.arrangeForm = false;
      }
    });
  }
}
</script>

<style scoped lang="scss">
.u-td {
  overflow: hidden;
  text-overflow: ellipsis;
  // white-space: nowrap;
}

.form {
  width: 90%;
  margin: 0 5%;
  text-align: center;
}

.title {
  font-size: 1.2em;
  letter-spacing: 2px;
}
</style>