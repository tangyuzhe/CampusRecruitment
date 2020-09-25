<template>
  <view>
    <!-- <u-subsection
      :list="list"
      :current="current"
      active-color="#19be6b"
      inactive-color="#606266"
      @change="ChangeSubSection"
    ></u-subsection> -->
    <recruitment-list
      v-if="current == 0"
      :companyID="company_id"
    ></recruitment-list>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../api/request";
import recruitmentList from "./components/recruitmentList.vue";
@Component({
  components: { recruitmentList },
})
export default class CompanyRecruitmentPage extends Vue {
  list: any = [
    {
      name: "招聘记录",
    },
  ];
  current: number = 0;
  company_id: number = -1;

  //选项卡改变当前状态
  ChangeSubSection(index: number) {
    this.current = index;
  }

  onLoad(option: any) {
    this.company_id = option.company_id;
  }
}
</script>

<style scoped lang="scss">
</style>