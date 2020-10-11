<template>
  <view class="margin-top">
    <van-form
      validate-first
      v-for="(item, index) in list"
      :key="index"
      class="margin-top"
    >
      <van-field
        type="textarea"
        :value="item.purpose"
        name="教室用途"
        label="教室用途"
        readonly
      />

      <van-field
        :value="formatTime(item.start_time)"
        name="开始时间"
        label="开始时间"
        readonly
      />

      <van-field
        :value="formatTime(item.finished_time)"
        name="结束时间"
        label="结束时间"
        readonly
      />

      <van-field
        v-model="item.classroom"
        name="validator"
        label="教室安排"
        validate-trigger="onBlur"
        :rules="[
          {
            required: item.audit_situation == '通过',
            message: '审核通过，教室不能为空',
            trigger: 'onBlur',
          },
        ]"
      />

      <van-field name="审核情况" label="审核情况">
        <template #input>
          <van-radio-group
            v-model="item.audit_situation"
            direction="horizontal"
          >
            <van-radio name="通过">通过</van-radio>
            <van-radio name="不通过">不通过</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        v-model="item.audit_instructions"
        name="审核说明"
        label="审核说明"
        type="textarea"
        :rules="[
          {
            required: item.audit_situation == '不通过',
            message: '审核不通过，说明不能为空',
            trigger: 'onBlur',
          },
        ]"
      />
      <!-- <van-field>
        <template #input>
          <van-button
            size="small"
            round
            type="primary"
            class="btn"
            @click="submit(item)"
          >
            上传安排
          </van-button>
        </template>
      </van-field> -->
    </van-form>
    <van-pagination
      v-model="currentPage"
      :page-count="pageCount"
      mode="simple"
      @change="paginationChange"
    />

    <div style="margin: 16px">
      <van-button round block type="info" @click="submit"> 下一步 </van-button>
    </div>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import * as api from "../../../../api/request";
import { Toast, Form, RadioGroup, Radio } from "vant";
import moment from "moment";
@Component({
  components: {},
})
export default class RoomArrangePage extends Vue {
  list: any = [];
  currentPage: number = 1;
  pageSize: number = 10;
  pageCount: number = 0;
  arrange: any = {};
  count: number = 0;
  total: any = [];
  disabled: boolean = true;
  @Emit("getCurrent") sendCurrent(current: number) {}

  formatTime(time: string) {
    return moment(time).format("YYYY年MM月DD日 HH:mm:ss");
  }

  //表单校验
  roomvalidator(item: any) {
    if (item.audit_situation == "不通过") {
      return false;
    }
  }

  async getStationData() {
    let recruitment_id = uni.getStorageSync("recruitmentData").id;
    let query = {
      id: recruitment_id,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
    };
    await api.BaseRequest.getRequest("/v1/arrangeClassroomList?", query).then(
      (res: any) => {
        if (res.data.code == 0) {
          this.list = res.data.data.rows;
          this.pageCount = Math.ceil(res.data.data.count / this.pageSize);
          this.count = res.data.data.count;
          this.init();
        }
      }
    );
  }

  paginationChange(val: number) {
    this.currentPage = val;
    this.getStationData();
  }

  init() {
    this.list.forEach((item: any) => {
      item.audit_situation = "通过";
    });
    this.total = this.total.concat(this.list);
  }

  async submit() {
    let data = {};
    this.total = new Set(this.total);
    this.total.forEach((item: any) => {
      let params = {
        id: item.id,
        classroom: item.classroom,
        audit_instructions: item.audit_instructions,
        audit_situation: item.audit_situation,
      };
      api.BaseRequest.putRequestWithParams(
        "/v1/arrangeClassroom?",
        params
      ).then((res: any) => {
        if (res.data.code == 0) {
          Toast.success("教室安排成功");
        }
      });
      if (item.classroom == "" || item.audit_situation == "不通过") {
        uni.setStorage({
          key: "audition",
          data: "不通过",
        });
      } else {
        uni.setStorage({
          key: "audition",
          data: "通过",
        });
      }
    });
    this.sendCurrent(2);
  }

  mounted() {
    this.getStationData();
  }
}
</script>

<style scoped lang="scss">
image {
  width: 80px;
  height: 80px;
}

.btn {
  position: absolute;
  right: 0%;
}
</style>
