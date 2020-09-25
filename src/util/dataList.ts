/** /pages/home/index */
export const roleOption = [
  { text: "游客", value: "游客" },
  { text: "企业", value: "企业" },
  { text: "管理员", value: "管理员" },
];

export const grideList = [
  { icon: "photo", name: "认证申请", permission: ["游客"] },
  { icon: "hourglass", name: "我的企业", permission: ["企业"] },
  { icon: "lock", name: "企业招聘信息", permission: ["企业"] },
  { icon: "hourglass", name: "管理员审核", permission: ["管理员"] },
]


/* /pages/authentication_page/company */
export const CompanyScaleList = [
  {
    text: "0-100人",
  },
  {
    text: "100-300人",
  },
  {
    text: "300-500人",
  },
  {
    text: "500-1000人",
  },
  {
    text: "1000-3000人",
  },
  {
    text: "3000人以上",
  },
];

export const CompanyNatureList = [
  {
    text: "国有企业",
  },
  {
    text: "私有企业",
  },
  {
    text: "合资企业",
  },
]