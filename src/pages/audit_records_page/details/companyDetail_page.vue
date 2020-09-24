<template>
  <view>
    <u-table font-size="26" align="center">
      <u-tr class="u-tr">
        <u-th class="u-th">{{ company.company }}</u-th>
      </u-tr>
      <!-- <u-tr class="u-tr">
        <u-td class="u-td" width="30%">申请人</u-td>
        <u-td class="u-td">{{company.}}</u-td>
      </u-tr>-->
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">所在地</u-td>
        <u-td class="u-td"
          >{{ company.country }}{{ company.province }}{{ company.city
          }}{{ company.region }}</u-td
        >
      </u-tr>
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">企业性质</u-td>
        <u-td class="u-td">{{ company.nature }}</u-td>
      </u-tr>
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">企业规模</u-td>
        <u-td class="u-td">{{ company.scale }}</u-td>
      </u-tr>
      <u-tr class="u-tr" style="height: 250px">
        <u-td width="30%">简介</u-td>
        <u-td class="u-td">{{ company.introduction }}</u-td>
      </u-tr>
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">企业官网</u-td>
        <u-td class="u-td">
          <u-link :href="'http://' + company.offical_website">{{
            company.offical_website
          }}</u-link>
        </u-td>
      </u-tr>
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">招聘网站</u-td>
        <u-td class="u-td">
          <u-link :href="'http://' + company.recruitment_website">{{
            company.recruitment_website
          }}</u-link>
        </u-td>
      </u-tr>
      <u-tr class="u-tr" style="height: 150px">
        <u-td class="u-td" width="30%">营业执照</u-td>
        <u-td class="u-td">
          <u-image
            :src="imgSrc"
            alt="未提交图片"
            mode="widthFix"
            v-if="company.uuid"
            style="height: 100px; width: 200px"
          ></u-image>
          <u-empty text="暂无营业执照" v-else></u-empty>
        </u-td>
      </u-tr>
      <u-tr class="u-tr" style="height: 50px">
        <u-td class="u-td" width="30%">申请时间</u-td>
        <u-td class="u-td">{{ formatTime(company.time) }}</u-td>
      </u-tr>
      <u-tr style="border: none">
        <u-button type="primary" @click="showAuditForm">审核</u-button>
      </u-tr>
    </u-table>

    <!-- 弹出层认证审核 -->
    <u-popup
      v-model="auditForm"
      mode="center"
      border-radius="14"
      width="600rpx"
      height="400px"
      :closeable="auditForm"
    >
      <view class="wrap">
        <view style="text-align: center; font-size: 1.2em">
          <text>审核记录</text>
        </view>
        <u-form ref="uForm">
          <u-form-item label="公司id" label-width="200">
            <u-input v-model="audition.company_id" :disabled="bool" />
          </u-form-item>
          <u-form-item label="审核人" label-width="200">
            <u-input v-model="examiner" :disabled="bool" />
          </u-form-item>
          <u-form-item label="审核时间" label-width="200">
            <u-input v-model="audition.audit_time" :disabled="bool" />
          </u-form-item>
          <u-form-item label="是否通过" label-width="180">
            <van-radio-group
              v-model="radio"
              direction="horizontal"
              @change="auditStatusChange"
            >
              <van-radio name="1">通过</van-radio>
              <van-radio name="2">不通过</van-radio>
            </van-radio-group>
          </u-form-item>
          <u-form-item label="审核记录" label-width="200" v-if="radio == 2">
            <u-input
              v-model="audition.audit_instructions"
              type="textarea"
              maxlength="100"
            />
          </u-form-item>
        </u-form>

        <u-button type="primary" @click="submit" :disabled="disable"
          >提交</u-button
        >
      </view>
    </u-popup>

    <u-toast ref="uToast" />
  </view>
</template>

<script lang="ts">
import { Toast, RadioGroup, Radio } from "vant";
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../../api/request";
import moment from "moment";
@Component({
  components: { RadioGroup, Radio },
})
export default class CompanyDetailPage extends Vue {
  bool: boolean = true;
  company_id: number = 0;
  company: any = {};
  imgSrc: string = "http://127.0.0.1:7001/public/upload/";
  auditForm: boolean = false;
  radio: string = "1";

  audition: any = {};
  examiner: string = "";
  disable: boolean = false;
  that = this as any;
  isPass: number = -1;

  //时间格式化
  formatTime(time: string | Object) {
    return moment(time).format("YYYY年MM月DD日 HH:mm:ss");
  }

  //查询公司详情
  async GetCompanyDetail() {
    await api.BaseRequest.getRequest("/v1/searchCompany?", {
      id: this.company_id,
    }).then((res: any) => {
      if (res.data.code == 0) {
        this.company = res.data.data[0];
        this.imgSrc += this.company.uuid;
      } else {
        Toast.fail("未查询到公司详情!");
      }
    });
  }

  //显示审核表单
  showAuditForm() {
    this.auditForm = true;
    this.audition.company_id = this.company.id;
    this.audition.audit_time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.GetExaminerId();
  }

  //获取审核人的id
  async GetExaminerId() {
    // let openid = uni.getStorageSync("openid"); //从本地获取openid
    let openid = "oeJ85uJDWaMNq33UN9V7vFfuJ0P0";
    await api.BaseRequest.getRequest("/v1/user?", { openid: openid }).then(
      (res: any) => {
        if (res.data.code == 0) {
          this.audition.examiner_id = res.data.data.id;
          this.examiner = res.data.data.name;
        }
      }
    );
  }

  //审核状态改变(通过或者不通过)
  auditStatusChange(val: string) {
    if (val === "1") {
      this.audition.audit_situation = "通过";
      this.audition.audit_instructions = "";
    } else if (val === "2") {
      this.audition.audit_situation = "不通过";
    }
  }

  //查询是否已经提交过
  async JudgeIsSubmitted() {
    await api.BaseRequest.getRequestWithPath(
      "/v1/audition/" + this.company_id
    ).then((res: any) => {
      if (res.data.data.length == 0) {
        this.isPass = 0;
      } else {
        if (res.data.data[0].audit_situation == "通过") {
          this.showToast("已经通过认证！", "warning", 4000);
          this.disable = true;
        } else {
          this.isPass = 1;
        }
      }
    });
  }

  //Toast 弹窗
  showToast(title: string, type: string, duration: number, url?: string) {
    this.that.$refs.uToast.show({
      title: title,
      type: type,
      url: url,
      duration: duration,
    });
  }

  //审核第一次提交
  async firstSubmit() {
    await api.BaseRequest.postRequest("/v1/audition", this.audition).then(
      (res: any) => {
        if (res.data.code == 0) {
          Toast.success("完成此次审核！");
          this.auditForm = false;
        }
      }
    );
  }

  //审核修改
  async update() {
    await api.BaseRequest.putRequest(
      "/v1/audition/" + this.company_id,
      this.audition
    ).then((res: any) => {
      if (res.data.code == 0) {
        Toast.success("完成此次审核！");
        this.auditForm = false;
      }
    });
  }

  //审核提交
  async submit() {
    if (this.isPass == 0) {
      this.firstSubmit();
    } else if (this.isPass == 1) {
      this.update();
    }
  }

  created() {
    this.audition.audit_situation = "通过";
    this.JudgeIsSubmitted();
  }

  onLoad(option: any) {
    this.company_id = option.company_id;
    this.GetCompanyDetail();
  }
}
</script>

<style scoped lang="scss">
.ul-tr-height {
  height: 50px;
}

.wrap {
  width: 80%;
  margin: 20px 10%;
  border: black;
}
</style>