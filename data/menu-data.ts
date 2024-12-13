import type { IMenu } from "@/types/menu-d-t";

const menu_data:IMenu[] = [
  {
    id:0,
    link:'/',
    title:'首頁',
  },
  {
    id:1,
    link:'/about-us',
    title:'計畫簡介',
    dropdown:true,
    dropdown_menus:[
      {
        link:'/about-us',
        title:'計畫內容簡介',
        sub_id: 0,
        sub_dropdown: false
      },
      {
        link:'/company-statute',
        title:'多元陪伴照顧服務法規',
        sub_menus:[
          {link:'/conduct-plan',title:'多元陪伴照顧服務試辦計劃'},
          {link:'/employment-services',title:'就業服務法'},
          {link:'/censor-standard',title:'藍領審查標準'},
          {link:'/convert-principle',title:'外國人轉換原則'},
        ],
        sub_id: 1,
        sub_dropdown: true
      },
      {
        link:'/propaganda',
        title:'懶人包/宣傳品',
        sub_id: 0,
        sub_dropdown: false
      }
    ],
    
  },
  {
    id:2,
    link:'/',
    title:'最新消息',
    dropdown:true,
    dropdown_menus:[
      {
        link:'/announcement',
        title:'公告/新聞稿',
        sub_id: 0,
        sub_dropdown: false
      },
      {
        link:'/news',
        title:'新聞報導',
        sub_id: 0,
        sub_dropdown: false
      },
      {
        link:'/experience-share',
        title:'使用心得分享',
        sub_id: 0,
        sub_dropdown: false
      },
    ]
  },
  {
    id:3,
    link:'/services',
    title:'預約服務',
    dropdown:true,
    dropdown_menus:[
      {
        link:'/reserve-guide',
        title:'預約指引',
        sub_id: 0,
        sub_dropdown: false
      },
      {
        link:'/services',
        title:'試辦單位簡介',
        sub_id: 0,
        sub_dropdown: false
      },
      {
        link:'https://accompany-service-user.vercel.app',
        title:'我要預約',
        sub_id: 0,
        sub_dropdown: false
      },
    ]
  },
  {
    id:4,
    link:'/join-us-unit',
    title:'成為試辦單位',
    dropdown:true,
    dropdown_menus:[
      {
        link:'/join-us-unit',
        title:'申請資格與評選方式',
        sub_id: 0,
        sub_dropdown: false
      },
      {
        link:'/application-form',
        title:'填寫申請表',
        sub_id: 0,
        sub_dropdown: false
      },
    ]
  },
  {
    id:5,
    link:'/faq',
    title:'常見問題'
  },
  {
    id:6,
    link:'/contact',
    title:'聯絡我們'
  },
  {
    id:7,
    link:'/links',
    title:'相關網站連結'
  },
  
]

export default menu_data;
