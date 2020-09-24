<template>
  <view>
    <u-subsection
      :list="list"
      :current="1"
      active-color="#19be6b"
      inactive-color="#606266"
      @change="ChangeSubSection"
    ></u-subsection>
    <recruitment-list></recruitment-list>
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
    {
      name: "岗位查询",
    },
  ];
  current: number = 0;

  //选项卡改变当前状态
  ChangeSubSection(index: number) {
    console.log(index);
  }
}
</script>

<style scoped lang="scss">
</style>