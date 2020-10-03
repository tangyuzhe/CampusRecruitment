<template>
  <view>
    <u-form :model="Application" ref="uForm">
      <u-form-item label="企业名称" label-width="200" prop="company">
        <u-input
          v-model="Application.company"
          placeholder="请输入您的企业名称"
          :trim="!bool"
          :focus="!bool"
        />
      </u-form-item>

      <u-form-item label="公司地址" label-width="200">
        <u-input
          v-model="address"
          placeholder="请选择公司地址"
          @click="bool = true"
        />
        <u-picker
          mode="region"
          v-model="bool"
          :area-code="areaCode"
          @confirm="AddressConfirm"
        ></u-picker>
      </u-form-item>

      <u-form-item label="企业性质" label-width="200">
        <u-input
          v-model="Application.nature"
          placeholder="请选择公司性质"
          @click="natureActionSheet = true"
          type="select"
        />
        <u-action-sheet
          :list="CompanyNatureList"
          v-model="natureActionSheet"
          @click="selectCompanyNature"
        ></u-action-sheet>
      </u-form-item>

      <u-form-item label="企业规模" label-width="200">
        <u-input
          v-model="Application.scale"
          placeholder="请选择企业规模"
          @click="scaleActionSheet = true"
          type="select"
        />
        <u-action-sheet
          :list="CompanyScaleList"
          v-model="scaleActionSheet"
          @click="selectCompanyScale"
        ></u-action-sheet>
      </u-form-item>

      <u-form-item label="企业简介" label-width="200">
        <u-input
          type="textarea"
          v-model="Application.introduction"
          placeholder="请输入您的企业简介(不超过150字)"
          height="200"
          maxlength="150"
          :border="1 == 1"
        />
      </u-form-item>

      <u-form-item label="企业官网" label-width="200">
        <u-input
          v-model="Application.offical_website"
          placeholder="请填写您的企业官网"
        />
      </u-form-item>

      <u-form-item label="招聘网站" label-width="200">
        <u-input
          v-model="Application.recruitment_website"
          placeholder="请填写您的企业招聘网站"
        />
      </u-form-item>

      <u-form-item label="上传营业执照" label-width="200" prop="uuid">
        <u-upload max-count="1" ref="uUpload" :action="action"></u-upload>
      </u-form-item>

      <u-form-item label="当前时间" label-width="200">
        <u-input v-model="Application.time" />
      </u-form-item>
    </u-form>

    <u-button type="primary" @click="submit">提交</u-button>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import * as api from "../../../api/request";
import { Toast } from "vant";
import { CompanyScaleList, CompanyNatureList } from "../../../util/dataList";
@Component({
  components: {},
})
export default class CompanyForm extends Vue {
  bool: boolean = false;
  natureActionSheet: boolean = false;
  scaleActionSheet: boolean = false;
  areaCode: any = ["13", "1303", "130304"];
  address: string = "";
  Application: any = {
    country: "中国",
  };
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

  async submit() {
    let list = [];
    list = (this.$refs.uUpload as any).lists;
    if (list.length == 0) {
      Toast.fail("未提交有效的营业执照！");
    } else {
      this.Application.uuid = list[0].response.files.fileName;
      Toast.loading({
        message: "正在提交中，请等候...",
        forbidClick: true,
      });
      api.BaseRequest.postRequest(
        "/v1/companyApplication",
        this.Application
      ).then((res: any) => {
        if (res.data.code == 0) {
          Toast.success("提交成功！");
          uni.navigateBack({
            delta: -1,
          });
        } else {
          Toast.fail("提交失败！");
        }
      });
    }
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
    let now = moment().format("YYYY-MM-DD HH:mm:ss");
    this.Application.time = now;
  }

  mounted() {
    (this.$refs.uForm as any).setRules(this.rules);
  }
}
</script>

<style scoped lang="scss">
</style>