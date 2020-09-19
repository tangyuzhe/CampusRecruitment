<template>
  <view>
    <button @click="show">click</button>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Home extends Vue {
  title: string = "11111";
  onLoad() {
    console.log("onload");
  }
}
</script>