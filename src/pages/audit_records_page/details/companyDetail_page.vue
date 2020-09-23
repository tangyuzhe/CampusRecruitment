<template>
  <view class="wrap">
    <u-table font-size="26" align="center">
      <u-tr class="u-tr">
        <u-th class="u-th">{{company.company}}</u-th>
      </u-tr>
      <!-- <u-tr class="u-tr">
        <u-td class="u-td" width="30%">申请人</u-td>
        <u-td class="u-td">{{company.}}</u-td>
      </u-tr>-->
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">所在地</u-td>
        <u-td class="u-td">{{company.country}}{{company.province}}{{company.city}}{{company.region}}</u-td>
      </u-tr>
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">企业性质</u-td>
        <u-td class="u-td">{{company.nature}}</u-td>
      </u-tr>
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">企业规模</u-td>
        <u-td class="u-td">{{company.scale}}</u-td>
      </u-tr>
      <u-tr class="u-tr" style="height:250px">
        <u-td width="30%">简介</u-td>
        <u-td class="u-td">{{company.introduction}}</u-td>
      </u-tr>
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">企业官网</u-td>
        <u-td class="u-td">
          <u-link>{{company.offical_website}}</u-link>
        </u-td>
      </u-tr>
      <u-tr class="u-tr ul-tr-height">
        <u-td class="u-td" width="30%">招聘网站</u-td>
        <u-td class="u-td">
          <u-link>{{company.recruitment_website}}</u-link>
        </u-td>
      </u-tr>
      <u-tr class="u-tr" style="height:200px">
        <u-td class="u-td" width="30%">营业执照</u-td>
        <u-td class="u-td">
          <u-image :src="'http://127.0.0.1:7001/public/upload/'+company.uuid" mode="widthFix"></u-image>
        </u-td>
      </u-tr>
      <!-- <u-tr class="u-tr">
        <u-td class="u-td" width="30%">申请时间</u-td>
        <u-td class="u-td">2020年12月21日 12:30:42</u-td>
      </u-tr>-->
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
import { Toast } from "vant";
import { Component, Vue } from "vue-property-decorator";
import * as api from "../../../api/request";
@Component({
  components: {},
})
export default class CompanyDetailPage extends Vue {
  company_id: number = 0;
  company: any = {};
  async GetCompanyDetail() {
    await api.BaseRequest.getRequest("/v1/searchCompany?", {
      id: this.company_id,
    }).then((res: any) => {
      if (res.data.code == 0) {
        this.company = res.data.data[0];
      } else {
        Toast.fail("未查询到公司详情!");
      }
    });
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
  border: black;
}
</style>