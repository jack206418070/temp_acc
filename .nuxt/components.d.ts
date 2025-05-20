
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AboutJoinUs': typeof import("../components/about/about-join-us.vue")['default']
    'AboutPurposeArea': typeof import("../components/about/about-purpose-area.vue")['default']
    'AboutUsTwoArea': typeof import("../components/about/about-us-two-area.vue")['default']
    'AboutusPurposeArea': typeof import("../components/aboutus/aboutus-purpose-area.vue")['default']
    'BackToTop': typeof import("../components/back-to-top.vue")['default']
    'BlockFeatureIndex': typeof import("../components/block-feature/block-feature-index.vue")['default']
    'BlockFeatureThree': typeof import("../components/block-feature/block-feature-three.vue")['default']
    'BlockFeatureTwo': typeof import("../components/block-feature/block-feature-two.vue")['default']
    'BlogAreaIndex': typeof import("../components/blog/blog-area-index.vue")['default']
    'BlogDetailsArea': typeof import("../components/blog/blog-details-area.vue")['default']
    'BlogListNewsArea': typeof import("../components/blog/blog-list-news-area.vue")['default']
    'BlogSidebar': typeof import("../components/blog/blog-sidebar.vue")['default']
    'BreadcrumbOne': typeof import("../components/breadcrumb/breadcrumb-one.vue")['default']
    'BreadcrumbTwo': typeof import("../components/breadcrumb/breadcrumb-two.vue")['default']
    'ErrMsg': typeof import("../components/err-msg.vue")['default']
    'FancyBannerSix': typeof import("../components/fancy-banner/fancy-banner-six.vue")['default']
    'FancyBannerThree': typeof import("../components/fancy-banner/fancy-banner-three.vue")['default']
    'FaqAreaFive': typeof import("../components/faq/faq-area-five.vue")['default']
    'FaqAreaFour': typeof import("../components/faq/faq-area-four.vue")['default']
    'FaqAreaIndex': typeof import("../components/faq/faq-area-index.vue")['default']
    'FaqAreaSix': typeof import("../components/faq/faq-area-six.vue")['default']
    'FaqAreaThree': typeof import("../components/faq/faq-area-three.vue")['default']
    'FaqItem': typeof import("../components/faq/faq-item.vue")['default']
    'FeedbackFour': typeof import("../components/feedback/feedback-four.vue")['default']
    'FeedbackTwo': typeof import("../components/feedback/feedback-two.vue")['default']
    'FooterOne': typeof import("../components/footer/footer-one.vue")['default']
    'FooterTwo': typeof import("../components/footer/footer-two.vue")['default']
    'HeaderNavMenus': typeof import("../components/header/header-nav-menus.vue")['default']
    'HeaderOne': typeof import("../components/header/header-one.vue")['default']
    'HeaderTwo': typeof import("../components/header/header-two.vue")['default']
    'HeroBannerEmptyIndex': typeof import("../components/hero-banner/hero-banner-empty-index.vue")['default']
    'HeroBannerIndex': typeof import("../components/hero-banner/hero-banner-index.vue")['default']
    'JoinusAboutUsTwoArea': typeof import("../components/joinus/joinus-about-us-two-area.vue")['default']
    'JoinusFaqAreaThree': typeof import("../components/joinus/joinus-faq-area-three.vue")['default']
    'JoinusSupportArea': typeof import("../components/joinus/joinus-support-area.vue")['default']
    'JoinusunitIntro': typeof import("../components/joinusunit/joinusunit-intro.vue")['default']
    'NewsDetailsArea': typeof import("../components/news/news-details-area.vue")['default']
    'NewsListArea': typeof import("../components/news/news-list-area.vue")['default']
    'NewsletterOne': typeof import("../components/newsletter/newsletter-one.vue")['default']
    'Pagination': typeof import("../components/pagination.vue")['default']
    'PortfolioOne': typeof import("../components/portfolio/portfolio-one.vue")['default']
    'PortfolioSingle': typeof import("../components/portfolio/portfolio-single.vue")['default']
    'PortfolioTwo': typeof import("../components/portfolio/portfolio-two.vue")['default']
    'ProjectDetailsProcess': typeof import("../components/project/details/project-details-process.vue")['default']
    'ProjectDetailsV1Area': typeof import("../components/project/details/project-details-v1-area.vue")['default']
    'ProjectDetailsV2Area': typeof import("../components/project/details/project-details-v2-area.vue")['default']
    'ProjectV1Area': typeof import("../components/project/project-v1-area.vue")['default']
    'ProjectV2Area': typeof import("../components/project/project-v2-area.vue")['default']
    'ProjectV3Area': typeof import("../components/project/project-v3-area.vue")['default']
    'ServiceArea': typeof import("../components/service/service-area.vue")['default']
    'ServiceDetailsArea': typeof import("../components/service/service-details-area.vue")['default']
    'ServicePurposeArea': typeof import("../components/service/service-purpose-area.vue")['default']
    'ServiceTarger': typeof import("../components/service/service-targer.vue")['default']
    'ServiceUnitArea': typeof import("../components/service/service-unit-area.vue")['default']
    'ServiceUnitListArea': typeof import("../components/service/service-unit-list-area.vue")['default']
    'ServiceV2Area': typeof import("../components/service/service-v2-area.vue")['default']
    'TeamAreaFive': typeof import("../components/team/team-area-five.vue")['default']
    'TeamAreaFour': typeof import("../components/team/team-area-four.vue")['default']
    'TeamOneArea': typeof import("../components/team/team-one-area.vue")['default']
    'TeamSingleTwo': typeof import("../components/team/team-single-two.vue")['default']
    'TeamSingle': typeof import("../components/team/team-single.vue")['default']
    'TextFeatureIndex': typeof import("../components/text-feature/text-feature-index.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAboutJoinUs': LazyComponent<typeof import("../components/about/about-join-us.vue")['default']>
    'LazyAboutPurposeArea': LazyComponent<typeof import("../components/about/about-purpose-area.vue")['default']>
    'LazyAboutUsTwoArea': LazyComponent<typeof import("../components/about/about-us-two-area.vue")['default']>
    'LazyAboutusPurposeArea': LazyComponent<typeof import("../components/aboutus/aboutus-purpose-area.vue")['default']>
    'LazyBackToTop': LazyComponent<typeof import("../components/back-to-top.vue")['default']>
    'LazyBlockFeatureIndex': LazyComponent<typeof import("../components/block-feature/block-feature-index.vue")['default']>
    'LazyBlockFeatureThree': LazyComponent<typeof import("../components/block-feature/block-feature-three.vue")['default']>
    'LazyBlockFeatureTwo': LazyComponent<typeof import("../components/block-feature/block-feature-two.vue")['default']>
    'LazyBlogAreaIndex': LazyComponent<typeof import("../components/blog/blog-area-index.vue")['default']>
    'LazyBlogDetailsArea': LazyComponent<typeof import("../components/blog/blog-details-area.vue")['default']>
    'LazyBlogListNewsArea': LazyComponent<typeof import("../components/blog/blog-list-news-area.vue")['default']>
    'LazyBlogSidebar': LazyComponent<typeof import("../components/blog/blog-sidebar.vue")['default']>
    'LazyBreadcrumbOne': LazyComponent<typeof import("../components/breadcrumb/breadcrumb-one.vue")['default']>
    'LazyBreadcrumbTwo': LazyComponent<typeof import("../components/breadcrumb/breadcrumb-two.vue")['default']>
    'LazyErrMsg': LazyComponent<typeof import("../components/err-msg.vue")['default']>
    'LazyFancyBannerSix': LazyComponent<typeof import("../components/fancy-banner/fancy-banner-six.vue")['default']>
    'LazyFancyBannerThree': LazyComponent<typeof import("../components/fancy-banner/fancy-banner-three.vue")['default']>
    'LazyFaqAreaFive': LazyComponent<typeof import("../components/faq/faq-area-five.vue")['default']>
    'LazyFaqAreaFour': LazyComponent<typeof import("../components/faq/faq-area-four.vue")['default']>
    'LazyFaqAreaIndex': LazyComponent<typeof import("../components/faq/faq-area-index.vue")['default']>
    'LazyFaqAreaSix': LazyComponent<typeof import("../components/faq/faq-area-six.vue")['default']>
    'LazyFaqAreaThree': LazyComponent<typeof import("../components/faq/faq-area-three.vue")['default']>
    'LazyFaqItem': LazyComponent<typeof import("../components/faq/faq-item.vue")['default']>
    'LazyFeedbackFour': LazyComponent<typeof import("../components/feedback/feedback-four.vue")['default']>
    'LazyFeedbackTwo': LazyComponent<typeof import("../components/feedback/feedback-two.vue")['default']>
    'LazyFooterOne': LazyComponent<typeof import("../components/footer/footer-one.vue")['default']>
    'LazyFooterTwo': LazyComponent<typeof import("../components/footer/footer-two.vue")['default']>
    'LazyHeaderNavMenus': LazyComponent<typeof import("../components/header/header-nav-menus.vue")['default']>
    'LazyHeaderOne': LazyComponent<typeof import("../components/header/header-one.vue")['default']>
    'LazyHeaderTwo': LazyComponent<typeof import("../components/header/header-two.vue")['default']>
    'LazyHeroBannerEmptyIndex': LazyComponent<typeof import("../components/hero-banner/hero-banner-empty-index.vue")['default']>
    'LazyHeroBannerIndex': LazyComponent<typeof import("../components/hero-banner/hero-banner-index.vue")['default']>
    'LazyJoinusAboutUsTwoArea': LazyComponent<typeof import("../components/joinus/joinus-about-us-two-area.vue")['default']>
    'LazyJoinusFaqAreaThree': LazyComponent<typeof import("../components/joinus/joinus-faq-area-three.vue")['default']>
    'LazyJoinusSupportArea': LazyComponent<typeof import("../components/joinus/joinus-support-area.vue")['default']>
    'LazyJoinusunitIntro': LazyComponent<typeof import("../components/joinusunit/joinusunit-intro.vue")['default']>
    'LazyNewsDetailsArea': LazyComponent<typeof import("../components/news/news-details-area.vue")['default']>
    'LazyNewsListArea': LazyComponent<typeof import("../components/news/news-list-area.vue")['default']>
    'LazyNewsletterOne': LazyComponent<typeof import("../components/newsletter/newsletter-one.vue")['default']>
    'LazyPagination': LazyComponent<typeof import("../components/pagination.vue")['default']>
    'LazyPortfolioOne': LazyComponent<typeof import("../components/portfolio/portfolio-one.vue")['default']>
    'LazyPortfolioSingle': LazyComponent<typeof import("../components/portfolio/portfolio-single.vue")['default']>
    'LazyPortfolioTwo': LazyComponent<typeof import("../components/portfolio/portfolio-two.vue")['default']>
    'LazyProjectDetailsProcess': LazyComponent<typeof import("../components/project/details/project-details-process.vue")['default']>
    'LazyProjectDetailsV1Area': LazyComponent<typeof import("../components/project/details/project-details-v1-area.vue")['default']>
    'LazyProjectDetailsV2Area': LazyComponent<typeof import("../components/project/details/project-details-v2-area.vue")['default']>
    'LazyProjectV1Area': LazyComponent<typeof import("../components/project/project-v1-area.vue")['default']>
    'LazyProjectV2Area': LazyComponent<typeof import("../components/project/project-v2-area.vue")['default']>
    'LazyProjectV3Area': LazyComponent<typeof import("../components/project/project-v3-area.vue")['default']>
    'LazyServiceArea': LazyComponent<typeof import("../components/service/service-area.vue")['default']>
    'LazyServiceDetailsArea': LazyComponent<typeof import("../components/service/service-details-area.vue")['default']>
    'LazyServicePurposeArea': LazyComponent<typeof import("../components/service/service-purpose-area.vue")['default']>
    'LazyServiceTarger': LazyComponent<typeof import("../components/service/service-targer.vue")['default']>
    'LazyServiceUnitArea': LazyComponent<typeof import("../components/service/service-unit-area.vue")['default']>
    'LazyServiceUnitListArea': LazyComponent<typeof import("../components/service/service-unit-list-area.vue")['default']>
    'LazyServiceV2Area': LazyComponent<typeof import("../components/service/service-v2-area.vue")['default']>
    'LazyTeamAreaFive': LazyComponent<typeof import("../components/team/team-area-five.vue")['default']>
    'LazyTeamAreaFour': LazyComponent<typeof import("../components/team/team-area-four.vue")['default']>
    'LazyTeamOneArea': LazyComponent<typeof import("../components/team/team-one-area.vue")['default']>
    'LazyTeamSingleTwo': LazyComponent<typeof import("../components/team/team-single-two.vue")['default']>
    'LazyTeamSingle': LazyComponent<typeof import("../components/team/team-single.vue")['default']>
    'LazyTextFeatureIndex': LazyComponent<typeof import("../components/text-feature/text-feature-index.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AboutJoinUs: typeof import("../components/about/about-join-us.vue")['default']
export const AboutPurposeArea: typeof import("../components/about/about-purpose-area.vue")['default']
export const AboutUsTwoArea: typeof import("../components/about/about-us-two-area.vue")['default']
export const AboutusPurposeArea: typeof import("../components/aboutus/aboutus-purpose-area.vue")['default']
export const BackToTop: typeof import("../components/back-to-top.vue")['default']
export const BlockFeatureIndex: typeof import("../components/block-feature/block-feature-index.vue")['default']
export const BlockFeatureThree: typeof import("../components/block-feature/block-feature-three.vue")['default']
export const BlockFeatureTwo: typeof import("../components/block-feature/block-feature-two.vue")['default']
export const BlogAreaIndex: typeof import("../components/blog/blog-area-index.vue")['default']
export const BlogDetailsArea: typeof import("../components/blog/blog-details-area.vue")['default']
export const BlogListNewsArea: typeof import("../components/blog/blog-list-news-area.vue")['default']
export const BlogSidebar: typeof import("../components/blog/blog-sidebar.vue")['default']
export const BreadcrumbOne: typeof import("../components/breadcrumb/breadcrumb-one.vue")['default']
export const BreadcrumbTwo: typeof import("../components/breadcrumb/breadcrumb-two.vue")['default']
export const ErrMsg: typeof import("../components/err-msg.vue")['default']
export const FancyBannerSix: typeof import("../components/fancy-banner/fancy-banner-six.vue")['default']
export const FancyBannerThree: typeof import("../components/fancy-banner/fancy-banner-three.vue")['default']
export const FaqAreaFive: typeof import("../components/faq/faq-area-five.vue")['default']
export const FaqAreaFour: typeof import("../components/faq/faq-area-four.vue")['default']
export const FaqAreaIndex: typeof import("../components/faq/faq-area-index.vue")['default']
export const FaqAreaSix: typeof import("../components/faq/faq-area-six.vue")['default']
export const FaqAreaThree: typeof import("../components/faq/faq-area-three.vue")['default']
export const FaqItem: typeof import("../components/faq/faq-item.vue")['default']
export const FeedbackFour: typeof import("../components/feedback/feedback-four.vue")['default']
export const FeedbackTwo: typeof import("../components/feedback/feedback-two.vue")['default']
export const FooterOne: typeof import("../components/footer/footer-one.vue")['default']
export const FooterTwo: typeof import("../components/footer/footer-two.vue")['default']
export const HeaderNavMenus: typeof import("../components/header/header-nav-menus.vue")['default']
export const HeaderOne: typeof import("../components/header/header-one.vue")['default']
export const HeaderTwo: typeof import("../components/header/header-two.vue")['default']
export const HeroBannerEmptyIndex: typeof import("../components/hero-banner/hero-banner-empty-index.vue")['default']
export const HeroBannerIndex: typeof import("../components/hero-banner/hero-banner-index.vue")['default']
export const JoinusAboutUsTwoArea: typeof import("../components/joinus/joinus-about-us-two-area.vue")['default']
export const JoinusFaqAreaThree: typeof import("../components/joinus/joinus-faq-area-three.vue")['default']
export const JoinusSupportArea: typeof import("../components/joinus/joinus-support-area.vue")['default']
export const JoinusunitIntro: typeof import("../components/joinusunit/joinusunit-intro.vue")['default']
export const NewsDetailsArea: typeof import("../components/news/news-details-area.vue")['default']
export const NewsListArea: typeof import("../components/news/news-list-area.vue")['default']
export const NewsletterOne: typeof import("../components/newsletter/newsletter-one.vue")['default']
export const Pagination: typeof import("../components/pagination.vue")['default']
export const PortfolioOne: typeof import("../components/portfolio/portfolio-one.vue")['default']
export const PortfolioSingle: typeof import("../components/portfolio/portfolio-single.vue")['default']
export const PortfolioTwo: typeof import("../components/portfolio/portfolio-two.vue")['default']
export const ProjectDetailsProcess: typeof import("../components/project/details/project-details-process.vue")['default']
export const ProjectDetailsV1Area: typeof import("../components/project/details/project-details-v1-area.vue")['default']
export const ProjectDetailsV2Area: typeof import("../components/project/details/project-details-v2-area.vue")['default']
export const ProjectV1Area: typeof import("../components/project/project-v1-area.vue")['default']
export const ProjectV2Area: typeof import("../components/project/project-v2-area.vue")['default']
export const ProjectV3Area: typeof import("../components/project/project-v3-area.vue")['default']
export const ServiceArea: typeof import("../components/service/service-area.vue")['default']
export const ServiceDetailsArea: typeof import("../components/service/service-details-area.vue")['default']
export const ServicePurposeArea: typeof import("../components/service/service-purpose-area.vue")['default']
export const ServiceTarger: typeof import("../components/service/service-targer.vue")['default']
export const ServiceUnitArea: typeof import("../components/service/service-unit-area.vue")['default']
export const ServiceUnitListArea: typeof import("../components/service/service-unit-list-area.vue")['default']
export const ServiceV2Area: typeof import("../components/service/service-v2-area.vue")['default']
export const TeamAreaFive: typeof import("../components/team/team-area-five.vue")['default']
export const TeamAreaFour: typeof import("../components/team/team-area-four.vue")['default']
export const TeamOneArea: typeof import("../components/team/team-one-area.vue")['default']
export const TeamSingleTwo: typeof import("../components/team/team-single-two.vue")['default']
export const TeamSingle: typeof import("../components/team/team-single.vue")['default']
export const TextFeatureIndex: typeof import("../components/text-feature/text-feature-index.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAboutJoinUs: LazyComponent<typeof import("../components/about/about-join-us.vue")['default']>
export const LazyAboutPurposeArea: LazyComponent<typeof import("../components/about/about-purpose-area.vue")['default']>
export const LazyAboutUsTwoArea: LazyComponent<typeof import("../components/about/about-us-two-area.vue")['default']>
export const LazyAboutusPurposeArea: LazyComponent<typeof import("../components/aboutus/aboutus-purpose-area.vue")['default']>
export const LazyBackToTop: LazyComponent<typeof import("../components/back-to-top.vue")['default']>
export const LazyBlockFeatureIndex: LazyComponent<typeof import("../components/block-feature/block-feature-index.vue")['default']>
export const LazyBlockFeatureThree: LazyComponent<typeof import("../components/block-feature/block-feature-three.vue")['default']>
export const LazyBlockFeatureTwo: LazyComponent<typeof import("../components/block-feature/block-feature-two.vue")['default']>
export const LazyBlogAreaIndex: LazyComponent<typeof import("../components/blog/blog-area-index.vue")['default']>
export const LazyBlogDetailsArea: LazyComponent<typeof import("../components/blog/blog-details-area.vue")['default']>
export const LazyBlogListNewsArea: LazyComponent<typeof import("../components/blog/blog-list-news-area.vue")['default']>
export const LazyBlogSidebar: LazyComponent<typeof import("../components/blog/blog-sidebar.vue")['default']>
export const LazyBreadcrumbOne: LazyComponent<typeof import("../components/breadcrumb/breadcrumb-one.vue")['default']>
export const LazyBreadcrumbTwo: LazyComponent<typeof import("../components/breadcrumb/breadcrumb-two.vue")['default']>
export const LazyErrMsg: LazyComponent<typeof import("../components/err-msg.vue")['default']>
export const LazyFancyBannerSix: LazyComponent<typeof import("../components/fancy-banner/fancy-banner-six.vue")['default']>
export const LazyFancyBannerThree: LazyComponent<typeof import("../components/fancy-banner/fancy-banner-three.vue")['default']>
export const LazyFaqAreaFive: LazyComponent<typeof import("../components/faq/faq-area-five.vue")['default']>
export const LazyFaqAreaFour: LazyComponent<typeof import("../components/faq/faq-area-four.vue")['default']>
export const LazyFaqAreaIndex: LazyComponent<typeof import("../components/faq/faq-area-index.vue")['default']>
export const LazyFaqAreaSix: LazyComponent<typeof import("../components/faq/faq-area-six.vue")['default']>
export const LazyFaqAreaThree: LazyComponent<typeof import("../components/faq/faq-area-three.vue")['default']>
export const LazyFaqItem: LazyComponent<typeof import("../components/faq/faq-item.vue")['default']>
export const LazyFeedbackFour: LazyComponent<typeof import("../components/feedback/feedback-four.vue")['default']>
export const LazyFeedbackTwo: LazyComponent<typeof import("../components/feedback/feedback-two.vue")['default']>
export const LazyFooterOne: LazyComponent<typeof import("../components/footer/footer-one.vue")['default']>
export const LazyFooterTwo: LazyComponent<typeof import("../components/footer/footer-two.vue")['default']>
export const LazyHeaderNavMenus: LazyComponent<typeof import("../components/header/header-nav-menus.vue")['default']>
export const LazyHeaderOne: LazyComponent<typeof import("../components/header/header-one.vue")['default']>
export const LazyHeaderTwo: LazyComponent<typeof import("../components/header/header-two.vue")['default']>
export const LazyHeroBannerEmptyIndex: LazyComponent<typeof import("../components/hero-banner/hero-banner-empty-index.vue")['default']>
export const LazyHeroBannerIndex: LazyComponent<typeof import("../components/hero-banner/hero-banner-index.vue")['default']>
export const LazyJoinusAboutUsTwoArea: LazyComponent<typeof import("../components/joinus/joinus-about-us-two-area.vue")['default']>
export const LazyJoinusFaqAreaThree: LazyComponent<typeof import("../components/joinus/joinus-faq-area-three.vue")['default']>
export const LazyJoinusSupportArea: LazyComponent<typeof import("../components/joinus/joinus-support-area.vue")['default']>
export const LazyJoinusunitIntro: LazyComponent<typeof import("../components/joinusunit/joinusunit-intro.vue")['default']>
export const LazyNewsDetailsArea: LazyComponent<typeof import("../components/news/news-details-area.vue")['default']>
export const LazyNewsListArea: LazyComponent<typeof import("../components/news/news-list-area.vue")['default']>
export const LazyNewsletterOne: LazyComponent<typeof import("../components/newsletter/newsletter-one.vue")['default']>
export const LazyPagination: LazyComponent<typeof import("../components/pagination.vue")['default']>
export const LazyPortfolioOne: LazyComponent<typeof import("../components/portfolio/portfolio-one.vue")['default']>
export const LazyPortfolioSingle: LazyComponent<typeof import("../components/portfolio/portfolio-single.vue")['default']>
export const LazyPortfolioTwo: LazyComponent<typeof import("../components/portfolio/portfolio-two.vue")['default']>
export const LazyProjectDetailsProcess: LazyComponent<typeof import("../components/project/details/project-details-process.vue")['default']>
export const LazyProjectDetailsV1Area: LazyComponent<typeof import("../components/project/details/project-details-v1-area.vue")['default']>
export const LazyProjectDetailsV2Area: LazyComponent<typeof import("../components/project/details/project-details-v2-area.vue")['default']>
export const LazyProjectV1Area: LazyComponent<typeof import("../components/project/project-v1-area.vue")['default']>
export const LazyProjectV2Area: LazyComponent<typeof import("../components/project/project-v2-area.vue")['default']>
export const LazyProjectV3Area: LazyComponent<typeof import("../components/project/project-v3-area.vue")['default']>
export const LazyServiceArea: LazyComponent<typeof import("../components/service/service-area.vue")['default']>
export const LazyServiceDetailsArea: LazyComponent<typeof import("../components/service/service-details-area.vue")['default']>
export const LazyServicePurposeArea: LazyComponent<typeof import("../components/service/service-purpose-area.vue")['default']>
export const LazyServiceTarger: LazyComponent<typeof import("../components/service/service-targer.vue")['default']>
export const LazyServiceUnitArea: LazyComponent<typeof import("../components/service/service-unit-area.vue")['default']>
export const LazyServiceUnitListArea: LazyComponent<typeof import("../components/service/service-unit-list-area.vue")['default']>
export const LazyServiceV2Area: LazyComponent<typeof import("../components/service/service-v2-area.vue")['default']>
export const LazyTeamAreaFive: LazyComponent<typeof import("../components/team/team-area-five.vue")['default']>
export const LazyTeamAreaFour: LazyComponent<typeof import("../components/team/team-area-four.vue")['default']>
export const LazyTeamOneArea: LazyComponent<typeof import("../components/team/team-one-area.vue")['default']>
export const LazyTeamSingleTwo: LazyComponent<typeof import("../components/team/team-single-two.vue")['default']>
export const LazyTeamSingle: LazyComponent<typeof import("../components/team/team-single.vue")['default']>
export const LazyTextFeatureIndex: LazyComponent<typeof import("../components/text-feature/text-feature-index.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
