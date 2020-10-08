<template>
  <view class="margin-top">
    <van-form >
      <van-field
        :value="recruitment.recruitment_info"
        type="textarea"
        name="招聘信息"
        label="招聘信息"
        readonly
      />

      <van-field
        :value="formatTime(recruitment.start_time)"
        name="开始时间"
        label="开始时间"
        readonly
      />

      <van-field
        :value="formatTime(recruitment.finish_time)"
        name="结束时间"
        label="结束时间"
        readonly
      />

      <van-field
        :value="formatTime(recruitment.time)"
        name="提交时间"
        label="提交时间"
        readonly
      />

      <van-field
        name="附件"
        label="附件"
        readonly
      >
        <template #input>
          <image :src="url+recruitment.enclosure" />
        </template>
      </van-field>

      <!-- <van-field
        v-model="recruitment.audit_info"
        name="审核详情"
        label="审核详情"
        type="textarea"
      />

      <van-field
        name="审核情况"
        label="审核情况"
      >
        <template #input>
          <van-radio-group v-model="recruitment.audit_situation" direction="horizontal">
            <van-radio name="不通过">不通过</van-radio>
            <van-radio name="通过">通过</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        readonly
        v-model="recruitment.audit_time"
        :name="recruitment.audit_time?'审核时间':'当前时间'"
        :label="recruitment.audit_time?'审核时间':'当前时间'"
      /> -->

      <div style="margin: 16px;">
        <van-button round block type="info" @click="submit">
          下一步
        </van-button>
      </div>
    </van-form>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import * as api from "../../../../api/request";
import { Toast,Form,RadioGroup, Radio } from "vant";
import { Image as VanImage } from 'vant';
import moment from "moment";
@Component({
  components: {

  },
})
export default class RecruitmentDetailPage extends Vue {
  recruitment:any = {}
  url:string = 'http://127.0.0.1:7001/public/upload/';
  @Emit("getCurrent") sendCurrent(current: number) {}

  formatTime(time:string){
    return moment(time).format('YYYY年MM月DD日 HH:mm:ss');
  }

  getRecruitmentData(){
    uni.getStorage({
      key:'recruitmentData',
      success:(res:any)=>{
        this.recruitment = res.data;
        if(this.recruitment.audit_time){
          this.recruitment.audit_time = this.formatTime(this.recruitment.audit_time)
        }else{
          this.recruitment.audit_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        }
      },
      fail:()=>{
        Toast.fail('查询失败')
      }
    })
  }

  async submit(){
    let data = {
      audit_situation:this.recruitment.audit_situation,
      audit_info:this.recruitment.audit_info,
      audit_time:this.recruitment.audit_time
    }
    await api.BaseRequest.putRequestWithParams('/v1/recruitment/'+this.recruitment.id+'?',data).then((res:any)=>{
      if(res.data.code==0){
        this.sendCurrent(0)
      }
    })
    
  }

  mounted(){
    this.getRecruitmentData()

  }
}
</script>

<style scoped lang="scss">
image{
  width:80px;
  height:80px;
}
</style>
