<template>
  <view>
    <u-table font-size="26">
      <u-tr class="u-tr">
        <u-th class="u-th">company公司</u-th>
      </u-tr>
      <u-tr class="u-tr">
        <u-td class="u-td" width="30%">申请人</u-td>
        <u-td class="u-td">吴佳豪</u-td>
      </u-tr>
      <u-tr class="u-tr">
        <u-td class="u-td" width="30%">所在地</u-td>
        <u-td class="u-td">中国江苏省苏州市吴江区</u-td>
      </u-tr>
      <u-tr class="u-tr">
        <u-td class="u-td" width="30%">企业性质</u-td>
        <u-td class="u-td">国企</u-td>
      </u-tr>
      <u-tr class="u-tr">
        <u-td class="u-td" width="30%">企业规模</u-td>
        <u-td class="u-td">1000-5000人</u-td>
      </u-tr>
      <u-tr class="u-tr">
        <u-td width="30%">简介</u-td>
        <u-td class="u-td">他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他他</u-td>
      </u-tr>
      <u-tr class="u-tr">
        <u-td class="u-td" width="30%">企业官网</u-td>
        <u-td class="u-td">www.baidu.com</u-td>
      </u-tr>
      <u-tr class="u-tr">
        <u-td class="u-td" width="30%">招聘网站</u-td>
        <u-td class="u-td">www.baidu.com</u-td>
      </u-tr>
      <u-tr class="u-tr">
        <u-td class="u-td" width="30%">营业执照</u-td>
        <u-td class="u-td">
          <u-image src="https://cdn.uviewui.com/uview/example/fade.jpg" mode="widthFix"></u-image>
        </u-td>
      </u-tr>
      <u-tr class="u-tr">
        <u-td class="u-td" width="30%">申请时间</u-td>
        <u-td class="u-td">2020年12月21日 12:30:42</u-td>
      </u-tr>
      <u-tr style="border:none">
        <u-td>
          <u-button type="error" size="mini">不通过</u-button>
        </u-td>
        <u-td>
          <u-button type="primary" size="mini">通过</u-button>
        </u-td>
      </u-tr>
    </u-table>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../../api/request";
@Component({
  components: {},
})
export default class CompanyDetailPage extends Vue {
  onLoad(option: any) {
    console.log(option.company_id);
  }
}
</script>

<style scoped lang="scss">
</style>