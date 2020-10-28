<template>
  <view>
    <u-card v-for="(item, index) in list" :key="index">
      <view slot="head">
        <p>{{ "岗位信息" + (index + 1) }}</p>
        <u-button
          type="error"
          size="mini"
          class="add"
          @click="list.length > 1 ? list.splice(index, 1) : list"
          >删除</u-button
        >
      </view>
      <view slot="body">
        <u-form ref="uForm">
          <u-form-item label="岗位名称" label-width="150">
            <u-input v-model="list[index].station" border />
          </u-form-item>

          <u-form-item label="薪资" label-width="150">
            <u-input v-model="list[index].salary" border />
          </u-form-item>

          <u-form-item label="工作地点" label-width="150">
            <u-input v-model="list[index].workplace" border />
          </u-form-item>

          <u-form-item label="招聘人数" label-width="150">
            <u-number-box v-model="list[index].recruit_number" :min=1></u-number-box>
          </u-form-item>
        </u-form>
      </view>
    </u-card>

    <view class="demo-layout">
      <image src="../../../static/add_plus.png" mode="" @click="addForm" />
    </view>

    <u-row gutter="16">
      <u-col span="6">
        <view class="demo-layout">
          <u-button
            type="success"
            class="margin-top"
            shape="circle"
            @click="sendCurrent(-1)"
            >上一步</u-button
          >
        </view>
      </u-col>
      <u-col span="6">
        <view class="demo-layout bg-purple-light"
          ><u-button
            type="success"
            class="margin-top"
            @click="next"
            shape="circle"
            >下一步</u-button
          ></view
        >
      </u-col>
    </u-row>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
import * as api from "../../../api/request";
import { Toast } from "vant";
import moment from "moment";
@Component({
  components: {},
})
export default class StationForm extends Vue {
  @Prop({}) current!: number;
  @Emit("getCurrent") sendCurrent(current: number) {}
  list: any = [];

  addForm() {
    let station: object = {
      recruitment_id: 0,
      station: "",
      salary: "",
      workplace: "",
      recruit_number: 1,
    };
    this.list.push(station);
  }

  // @Watch("current")
  // WatchCurrent(newVal: number) {
  //   if (newVal == 0 && this.list.length == 0) {
  //     this.addForm();
  //   }
  // }

  mounted() {
    this.addForm();
  }

  created() {
    // this.addForm();
    uni.getStorage({
      key: "Station",
      success: (res: any) => {
        this.list = res.data;
      },
      fail: (res: any) => {
        this.list = [];
      },
    });
  }

  next() {
    uni.setStorage({
      key: "Station",
      data: this.list,
    });
    this.sendCurrent(1);
  }
}
</script>

<style scoped lang="scss">
.add {
  width: 60px;
  height: 30px;
  position: absolute;
  right: 20px;
  top: 10px;
}

.title {
  font-size: 1.2em;
  letter-spacing: 2px;
}

.u-card-wrap {
  background-color: $u-bg-color;
  padding: 1px;
}

.u-body-item {
  font-size: 20rpx;
  color: #333;
  padding: 20rpx 10rpx;
}

image {
  width: 30px;
  height: 30px;
}
</style>