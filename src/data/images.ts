import connectCampfire from "../assets/images/connect-campfire.webp";
import connectCarolRounds from "../assets/images/connect-carol-rounds.webp";
import connectHarvestFestival from "../assets/images/connect-harvest-festival.webp";
import connectHero from "../assets/images/connect-hero.webp";
import connectHeroMobile from "../assets/images/connect-hero-mobile.webp";
import connectFellowshipMeal from "../assets/images/connect-fellowship-meal.webp";
import connectSummerCarnival from "../assets/images/connect-summer-carnival.webp";
import connectSummerPicnic from "../assets/images/connect-summer-picnic.webp";
import ctcHeroBackground from "../assets/images/ctc-hero-background-green.webp";
import ctcHeroBackgroundMobile from "../assets/images/ctc-hero-background-green-mobile.webp";
import ctcHeroImage from "../assets/images/ctc-hero-image.jpg";
import ctcLogo from "../assets/images/ctc-logo.png";
import ministryKids from "../assets/images/ministry-kids.jpg";
import ministrySchool from "../assets/images/ministry-school.jpg";

export type SiteImage = {
  id: string;
  src: string;
  alt: string;
  creditName: string;
  creditUrl: string;
  unsplashUrl: string;
  usage: string;
  objectPosition?: string;
};

const utm = "utm_source=christ_tamil_church&utm_medium=referral";

export const siteImages = {
  connectHero: {
    id: "ctc-connect-hero",
    src: connectHero,
    alt: "",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Connect hero background",
    objectPosition: "64% 42%"
  },
  connectHeroMobile: {
    id: "ctc-connect-hero-mobile",
    src: connectHeroMobile,
    alt: "",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Connect hero background (portrait crop for tablet and phone)"
  },
  connectFellowshipMeal: {
    id: "ctc-connect-fellowship-meal",
    src: connectFellowshipMeal,
    alt: "A church member leans in to talk with an elder as the church family shares a meal served on banana leaves",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Connect: fellowship hour",
    objectPosition: "58% 50%"
  },
  connectSummerPicnic: {
    id: "ctc-connect-summer-picnic",
    src: connectSummerPicnic,
    alt: "Two lines of church members tossing a water balloon across the grass at the summer picnic",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Connect: Summer Picnic tradition",
    objectPosition: "50% 55%"
  },
  connectSummerCarnival: {
    id: "ctc-connect-summer-carnival",
    src: connectSummerCarnival,
    alt: "A pink, orange, and yellow balloon arch beneath the Christ Tamil Church Carnival banner",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Connect: Summer Carnival tradition",
    objectPosition: "50% 32%"
  },
  connectHarvestFestival: {
    id: "ctc-connect-harvest-festival",
    src: connectHarvestFestival,
    alt: "A long table of homemade mango pickle, rose cookies, snacks, and fruit baskets set out for the harvest festival",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Connect: Harvest Festival tradition",
    objectPosition: "50% 60%"
  },
  connectCarolRounds: {
    id: "ctc-connect-carol-rounds",
    src: connectCarolRounds,
    alt: "Children and families singing and dancing with Santa beside a Christmas tree during carol rounds",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Connect: Carol Rounds tradition",
    objectPosition: "50% 40%"
  },
  connectCampfire: {
    id: "ctc-connect-campfire",
    src: connectCampfire,
    alt: "Families and children gathered around a campfire at night, roasting marshmallows together",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Connect: life together",
    objectPosition: "50% 62%"
  },
  sundaySchool: {
    id: "ctc-sunday-school",
    src: ministrySchool,
    alt: "Children learning together in Christ Tamil Church Sunday School",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Sunday School hero",
    objectPosition: "center center"
  },
  kidsMinistry: {
    id: "ctc-kids-ministry",
    src: ministryKids,
    alt: "Children participating in ministry at Christ Tamil Church",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Children's ministry supporting image",
    objectPosition: "center center"
  },
  logo: {
    id: "ctc-logo",
    src: ctcLogo,
    alt: "Christ Tamil Church Chicago logo",
    creditName: "Christ Tamil Church",
    creditUrl: "https://www.christtamilchurch.com/",
    unsplashUrl: "",
    usage: "Site header and footer logo"
  },
  heroBackground: {
    id: "ctc-hero-background-green",
    src: ctcHeroBackground,
    alt: "",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Homepage hero background",
    objectPosition: "center right"
  },
  heroBackgroundMobile: {
    id: "ctc-hero-background-green-mobile",
    src: ctcHeroBackgroundMobile,
    alt: "",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Homepage hero background (portrait crop for phones)"
  },
  hero: {
    id: "ctc-hero-image",
    src: ctcHeroImage,
    alt: "Exterior of Christ Tamil Church with the cross and church sign visible",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Homepage hero",
    objectPosition: "38% 50%"
  },
  worship: {
    id: "small-group-network-community",
    src: "https://images.unsplash.com/photo-1629141649389-1b2b61d7d6f0?auto=format&fit=crop&w=1400&q=80",
    alt: "Small church community group gathered in bright natural light",
    creditName: "Small Group Network",
    creditUrl: `https://unsplash.com/@smallgroupnetwork?${utm}`,
    unsplashUrl: "https://unsplash.com/photos/man-in-blue-polo-shirt-sitting-on-black-armchair-G5Dr31rP0ZA",
    usage: "Welcome/about section",
    objectPosition: "center center"
  },
  bibleStudy: {
    id: "aaron-burden-open-bible",
    src: "https://images.unsplash.com/photo-1593485552030-019bfbf6ee1d?auto=format&fit=crop&w=1200&q=80",
    alt: "Open Bible in warm sunlight",
    creditName: "Aaron Burden",
    creditUrl: `https://unsplash.com/@aaronburden?${utm}`,
    unsplashUrl: "https://unsplash.com/photos/white-book-page-on-brown-wooden-table-9d6mKooS324",
    usage: "Bible Study ministry and supporting event",
    objectPosition: "center center"
  },
  prayer: {
    id: "christian-harb-congregation-prayer",
    src: "https://images.unsplash.com/photo-1760367121608-79219f1c9d2a?auto=format&fit=crop&w=1200&q=80",
    alt: "Congregation bowing their heads together in prayer",
    creditName: "Christian Harb",
    creditUrl: `https://unsplash.com/@c7arb?${utm}`,
    unsplashUrl: "https://unsplash.com/photos/a-crowd-of-people-bowing-their-heads-in-prayer-I5WoV6h36n0",
    usage: "Prayer ministry",
    objectPosition: "center center"
  },
  events: {
    id: "helena-lopes-community",
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    alt: "Friends gathered together outdoors at sunset",
    creditName: "Helena Lopes",
    creditUrl: `https://unsplash.com/@wildlittlethingsphoto?${utm}`,
    unsplashUrl: "https://unsplash.com/s/photos/church-family",
    usage: "Events section",
    objectPosition: "center center"
  },
  mensFellowship: {
    id: "matheus-ferrero-mens-fellowship",
    src: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=80",
    alt: "Four friends sitting together on a mountain trail",
    creditName: "Matheus Ferrero",
    creditUrl: `https://unsplash.com/@matheusferrero?${utm}`,
    unsplashUrl: "https://unsplash.com/photos/699cd4e2cf59",
    usage: "Men's Fellowship event",
    objectPosition: "center center"
  },
  womensFellowship: {
    id: "meredith-spencer-womens-study",
    src: "https://images.unsplash.com/photo-1663162550932-f67b561e656f?auto=format&fit=crop&w=1200&q=80",
    alt: "Friends gathered on the grass reading together",
    creditName: "Meredith Spencer",
    creditUrl: `https://unsplash.com/@meredithspencer22?${utm}`,
    unsplashUrl: "https://unsplash.com/photos/f67b561e656f",
    usage: "Women's Conference event",
    objectPosition: "center center"
  },
  churchPicnic: {
    id: "ctc-church-picnic",
    src: connectSummerPicnic,
    alt: "Two lines of church members tossing a water balloon across the grass at the church picnic",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Church Picnic event",
    objectPosition: "50% 55%"
  },

  familyCamp: {
    id: "ctc-family-camp-campfire",
    src: connectCampfire,
    alt: "Families and children gathered around a campfire at night during family camp",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Family Camp event",
    objectPosition: "50% 62%"
  },

  kidsCraft: {
    id: "alan-rodriguez-kids-craft",
    src: "https://images.unsplash.com/photo-1617117206620-b01f2919ff86?auto=format&fit=crop&w=1200&q=80",
    alt: "Children drawing together with colorful markers and crayons",
    creditName: "Alan Rodriguez",
    creditUrl: `https://unsplash.com/@alanrodriguez?${utm}`,
    unsplashUrl: "https://unsplash.com/photos/b01f2919ff86",
    usage: "Vacation Bible School event",
    objectPosition: "center center"
  },
  fellowshipMeal: {
    id: "ctc-fellowship-meal",
    src: connectFellowshipMeal,
    alt: "A church member leans in to talk with an elder as the church family shares a meal served on banana leaves",
    creditName: "Christ Tamil Church",
    creditUrl: "",
    unsplashUrl: "",
    usage: "Fellowship Hour event",
    objectPosition: "58% 50%"
  },

} satisfies Record<string, SiteImage>;
