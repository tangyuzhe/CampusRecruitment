<template>
  <view>
    <u-table>
      <u-tr class="u-tr">
        <u-th class="u-th">姓名</u-th>
        <u-th class="u-th">年龄</u-th>
        <u-th class="u-th">籍贯</u-th>
        <u-th class="u-th">性别</u-th>
      </u-tr>
      <u-tr class="u-tr">
        <u-td class="u-td">吕布</u-td>
        <u-td class="u-td">22</u-td>
        <u-td class="u-td">楚河</u-td>
        <u-td class="u-td">男</u-td>
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
export default class ApplicationRecordsTable extends Vue {}
</script>

<style scoped lang="scss">
</style>