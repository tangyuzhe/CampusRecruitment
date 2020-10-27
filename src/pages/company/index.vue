<template>
  <view class="main">
    <u-form :model="Application" ref="uForm">
      <u-form-item label="企业名称" label-width="200" prop="company">
        <u-input
          v-model="Application.company"
          :trim="!bool"
          :focus="!bool"
          :disabled="disabled"
          border
        />
      </u-form-item>

      <!-- 审核记录 -->
      <u-form-item label="审核情况" label-width="200" v-if="!toUpdate">
        <u-input :value="audit_situation" :disabled="disabled" border />
      </u-form-item>

      <u-form-item label="审核说明" label-width="200" v-if="!toUpdate">
        <u-input
          :value="audit_instructions"
          :disabled="disabled"
          type="textarea"
          height="200"
          placeholder=""
          border
        />
      </u-form-item>

      <!-- 信息修改 -->
      <u-form-item label="公司地址" label-width="200" v-if="toUpdate">
        <u-input
          type="select"
          v-model="address"
          placeholder="请选择公司地址"
          border
          @click="disabled ? (bool = false) : (bool = true)"
        />
        <u-picker
          mode="region"
          v-model="bool"
          :area-code="areaCode"
          @confirm="AddressConfirm"
        ></u-picker>
      </u-form-item>

      <u-form-item label="企业性质" label-width="200" v-if="toUpdate">
        <u-input
          v-model="Application.nature"
          placeholder="请选择公司性质"
          border
          @click="
            disabled ? (natureActionSheet = false) : (natureActionSheet = true)
          "
          type="select"
        />
        <u-action-sheet
          :list="CompanyNatureList"
          v-model="natureActionSheet"
          @click="selectCompanyNature"
        ></u-action-sheet>
      </u-form-item>

      <u-form-item label="企业规模" label-width="200" v-if="toUpdate">
        <u-input
          v-model="Application.scale"
          placeholder="请选择企业规模"
          border
          @click="
            disabled ? (scaleActionSheet = false) : (scaleActionSheet = true)
          "
          type="select"
        />
        <u-action-sheet
          :list="CompanyScaleList"
          v-model="scaleActionSheet"
          @click="selectCompanyScale"
        ></u-action-sheet>
      </u-form-item>

      <u-form-item label="企业简介" label-width="200" v-if="toUpdate">
        <u-input
          type="textarea"
          v-model="Application.introduction"
          placeholder="请输入您的企业简介(不超过150字)"
          height="200"
          maxlength="150"
          border
          :disabled="disabled"
        />
      </u-form-item>

      <u-form-item label="企业官网" label-width="200" v-if="toUpdate">
        <u-input
          v-model="Application.offical_website"
          placeholder="请填写您的企业官网"
          :disabled="disabled"
          border
        />
      </u-form-item>

      <u-form-item label="招聘网站" label-width="200" v-if="toUpdate">
        <u-input
          v-model="Application.recruitment_website"
          placeholder="请填写您的企业招聘网站"
          :disabled="disabled"
          border
        />
      </u-form-item>

      <u-form-item
        label="营业执照"
        label-width="200"
        prop="uuid"
        border
        v-if="toUpdate"
      >
        <image
          :src="'http://127.0.0.1:7001/public/upload/' + Application.uuid"
          style="width: 100%; height: 200rpx"
        ></image>
        <u-upload
          v-show="!disabled"
          max-count="1"
          ref="uUpload"
          :action="action"
        ></u-upload>
      </u-form-item>

      <u-form-item label="提交时间" label-width="200" v-if="toUpdate">
        <u-input v-model="Application.time" disabled border />
      </u-form-item>
    </u-form>

    <u-modal
      v-model="showTips"
      :content="content"
      show-cancel-button
      @confirm="submit"
    ></u-modal>

    <u-button
      type="primary"
      v-if="!toUpdate"
      :disabled="audit_situation == '暂未审核'"
      @click="
        toUpdate = true;
        disabled = false;
      "
      >前往修改</u-button
    >
    <u-button type="warning " @click="modify" v-if="toUpdate">修改</u-button>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import * as api from "../../api/request";
import { Toast } from "vant";
import { CompanyScaleList, CompanyNatureList } from "../../util/dataList";
@Component({
  components: {},
})
export default class CompanyForm extends Vue {
  bool: boolean = false;
  natureActionSheet: boolean = false;
  scaleActionSheet: boolean = false;
  areaCode: any = ["13", "1303", "130304"];
  address: string = "";
  Application: any = {};
  CompanyNatureList: any = [];
  CompanyScaleList: any = [];
  action: string = "http://127.0.0.1:7001/api/v1/upload";
  rules: any = {
    company: [
      {
        required: true,
        message: "请输入公司名",
        trigger: ["change", "blur"],
      },
    ],
    uuid: [
      {
        required: true,
        message: "请添加有效的营业执照",
        trigger: ["change", "blur"],
      },
    ],
  };
  disabled: boolean = true;

  toUpdate: boolean = false;
  audit_situation: string = "";
  audit_instructions: string = "";
  showTips: boolean = false;
  content: string = "是否确保信息已经完善，进行提交？";
  companyid: number = 0;

  async modify() {
    let list = [];
    list = (this.$refs.uUpload as any).lists;
    if (list.length != 0) {
      this.Application.uuid = list[0].response.files.fileName;
    }
    this.showTips = true;
  }

  async submit() {
    Toast.loading({
      message: "正在提交中，请等候...",
      forbidClick: true,
    });
    api.BaseRequest.putRequest(
      "/v1/company/" + this.Application.id,
      this.Application
    ).then((res: any) => {
      if (res.data.code == 0) {
        Toast.success("提交成功！");
        uni.navigateTo({
          url: "/pages/home/index",
        });
        this.updateAudition(this.companyid);
      } else {
        Toast.fail("提交失败！");
      }
    });
  }

  //选择企业地址
  AddressConfirm(value: any) {
    this.address =
      value.province.label + "," + value.city.label + "," + value.area.label;
    this.Application.province = value.province.label;
    this.Application.city = value.city.label;
    this.Application.region = value.area.label;
  }

  //选择企业性质
  selectCompanyNature(index: number) {
    this.Application.nature = this.CompanyNatureList[index].text;
  }

  //选择企业规模
  selectCompanyScale(index: number) {
    this.Application.scale = this.CompanyScaleList[index].text;
  }

  //根据用户本地openid获取信息
  async getUserInfo() {
    await api.BaseRequest.getRequest("/v1/user?", {
      openid: "oeJ85uJDWaMNq33UN9V7vFfuJ0P0",
    }).then((res: any) => {
      this.Application.user_id = res.data.data.id;
    });
  }

  created() {
    this.CompanyScaleList = CompanyScaleList;
    this.CompanyNatureList = CompanyNatureList;
    this.getUserInfo();
    this.Application.country = "中国";
  }

  mounted() {
    (this.$refs.uForm as any).setRules(this.rules);
  }

  //获取公司信息
  async getCompanyInfo(id: number) {
    await api.BaseRequest.getRequest("/v1/searchCompany?", { id: id }).then(
      (res: any) => {
        if (res.data.data.length != 0) {
          let data = res.data.data[0];
          this.Application = data;
          let now = moment().format("YYYY-MM-DD HH:mm:ss");
          this.Application.time = now;
          this.address = data.province + "," + data.city + "," + data.region;
        }
      }
    );
  }

  //公司审核情况
  async queryAudition(company_id: number) {
    await api.BaseRequest.getRequestWithPath("/v1/audition/" + company_id).then(
      (res: any) => {
        if (res.data.data.length == 0) {
          this.audit_situation = "暂未审核";
        } else {
          this.audit_situation = res.data.data[0].audit_situation;
          this.audit_instructions = res.data.data[0].audit_instructions;
        }
      }
    );
  }

  async updateAudition(company_id: number) {
    await api.BaseRequest.getRequestWithPath("/v1/audition/" + company_id).then(
      (res: any) => {
        let data = res.data.data[0];
        data.audit_situation = "等待审核";
        data.audit_instructions = "";
        api.BaseRequest.putRequest("/v1/audition/" + company_id, data);
      }
    );
  }

  onLoad(option: any) {
    console.log(option);
    if (option.role == "企业") {
      this.disabled = true;
    }
    this.companyid = option.company_id;
    if (option.hasAudition == "false") {
      this.toUpdate = true;
      this.disabled = false;
    }
    this.getCompanyInfo(option.company_id);
    this.queryAudition(option.company_id);
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 90%;
  margin: 0 5%;
}
</style>