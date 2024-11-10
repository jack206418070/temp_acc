import type { IBlog } from '@/types/blog-d-t';

const news_data:IBlog[] = [
  {
    id:1,
    img:'/images/blog/blog_img_03.jpg',
    date:'2023年9月15日',
    title:'老年人居家照護新趨勢：科技輔助提升生活品質',
    author:'王美玲',
    post_info:'王美玲 . 8分鐘閱讀 . 老年照護',
    category:'elderly-care',
    page:'home'
  },
  {
    id:2,
    img:'/images/blog/blog_img_04.jpg',
    date:'2023年10月3日',
    title:'兒童早期發展：多元學習環境對認知能力的影響',
    author:'李家豪',
    post_info:'李家豪 . 6分鐘閱讀 . 兒童發展',
    category:'child-care',
    page:'home'
  },
  // home 5
  {
    id:3,
    img:'/images/logo/media_01.png',
    date:'2023年11月7日',
    title:'心理健康新視角：整合性治療方法的突破',
    author:'張雅琪',
    post_info:'熱門話題',
    category:'mental-health',
    page:'home-5'
  },
  {
    id:4,
    img:'/images/logo/media_03.png',
    date:'2023年12月1日',
    title:'無障礙社會：創新科技助力身心障礙者融入社區',
    author:'陳志明',
    post_info:'趨勢報導',
    category:'disability-support',
    page:'home-5'
  },
  // blog list
  {
    id:5,
    img:'/images/blog/blog_img_06.jpg',
    date:'2024年12月1日',
    title:'【試辦單位核定名單】試辦單位核定名單已於12/13核定',
    author:'試辦單位',
    content:'核定清單資料',
    post_info:'試辦單位 . 5分鐘閱讀 . 最新消息',
    category:'palliative-care',
    page:'news-list'
  },
  {
    id:6,
    img:'/images/blog/blog_img_07.jpg',
    date:'2024年11月8日',
    title:'【試辦單位申請說明會】11/12上午辦理試辦單位申請說明會',
    author:'試辦單位',
    content:'勞動部為提供協助身心障礙、重大傷病、符合聘僱家庭看護工資格或具長照資格有照顧需求家庭，由符合資格之試辦單位，提供短期、臨時或持續一定時間之照顧人力，以減輕家庭照顧負擔，特推動試辦多元陪伴照顧服務。為使有意願申請成為試辦單位的財團法人或非營利社團法人機構能更了解多元陪伴照顧服務試辦內容，預訂於113年11月12日（二）上午舉辦試辦單位申請說明會，歡迎報名參加，申請說明會報名表連結為https://forms.gle/hm9QYAfa21ne',
    post_info:'試辦單位 . 3分鐘閱讀 . 最新消息',
    category:'community-health',
    page:'news-list'
  },
  

]

export default news_data;
