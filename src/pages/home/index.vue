<template>
  <view>
    <button @click="show">click</button>
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Swipe, SwipeItem, MessageBox } from "mint-ui";
@Component({
  components: {
    Swipe,
    SwipeItem,
  },
})
export default class Home extends Vue {
  title: string = "11111";
  show() {
    MessageBox({
      title: "提示",
      message: "确定执行此操作?",
      showCancelButton: true,
    });
  }
  onLoad() {
    console.log("onload");
  }
}
</script>