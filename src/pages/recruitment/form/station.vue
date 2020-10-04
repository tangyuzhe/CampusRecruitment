<template>
  <view>
    <u-card v-for="(item, index) in list" :key="index">
      <view slot="head">
        <p>{{ "岗位信息" + (index + 1) }}</p>
        <u-button type="success" size="mini" class="add" @click="list.push({})"
          >继续添加</u-button
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
            <u-number-box v-model="list[index].recruit_number"></u-number-box>
          </u-form-item>
        </u-form>
      </view>
    </u-card>
    <u-button type="primary" @click="test">继续添加</u-button>
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
  addImage: string = "../../static/add_plus.png";
  Station: any = {
    recruitment_id: 0,
    station: "",
    salary: "",
    workplace: "",
    recruit_number: 0,
  };
  @Prop({}) recruitment_id!: number;
  list: any = [];

  init() {
    this.Station.recruitment_id = this.recruitment_id;
    this.list.push({});
  }

  created() {
    this.init();
  }

  test() {
    console.log(this.list);
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
</style>