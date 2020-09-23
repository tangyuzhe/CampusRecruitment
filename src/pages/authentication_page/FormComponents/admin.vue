<template>
  <view>
    <u-form ref="uForm">
      <u-form-item label="当前时间" label-width="200">
        <u-input />
      </u-form-item>
    </u-form>

    <u-button type="primary" @click="submit">提交</u-button>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../../api/request";
@Component({
  components: {},
})
export default class AdminForm extends Vue {}
</script>

<style scoped lang="scss">
</style>