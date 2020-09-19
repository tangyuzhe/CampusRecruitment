<template>
  <view>
    <button @click="show">click</button>
    <mt-button type="danger">danger</mt-button>
    <mt-tab-container>
      <mt-tab-container-item id="tab-container1">
        <mt-cell v-for="index in 10" :key="index" title="tab-container 1"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <mt-cell v-for="n in 5" :key="n" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        <mt-cell v-for="n in 7" :key="n" title="tab-container 3"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MessageBox } from "mint-ui";
import { Swipe, SwipeItem } from "mint-ui";
import { Button } from "mint-ui";
import { TabContainer, TabContainerItem } from "mint-ui";
@Component({
  components: {
    MessageBox,
    Swipe,
    SwipeItem,
    Button,
    TabContainer,
    TabContainerItem,
  },
})
export default class Home extends Vue {
  title: string = "11111";
  onLoad() {
    console.log("onload");
  }

  show() {
    MessageBox({
      title: "提示",
      message: "确定执行此操作?",
      showCancelButton: true,
    });
  }
}
</script>