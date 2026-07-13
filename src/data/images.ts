import ctcHeroBackground from "../assets/images/ctc-hero-background-green.png";
import ctcHeroBackgroundMobile from "../assets/images/ctc-hero-background-green-mobile.png";
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
  sermon: {
    id: "mitchell-leach-pulpit-cross",
    src: "https://images.unsplash.com/photo-1620565404581-e0aea3f826ef?auto=format&fit=crop&w=1200&q=80",
    alt: "Wooden church pulpit with softly lit crosses in the background",
    creditName: "Mitchell Leach",
    creditUrl: `https://unsplash.com/@mitchleach?${utm}`,
    unsplashUrl: "https://unsplash.com/pt-br/s/fotografias/p%C3%BAlpito-da-igreja",
    usage: "Latest sermon section",
    objectPosition: "center center"
  }
} satisfies Record<string, SiteImage>;
