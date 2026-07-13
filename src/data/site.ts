import {
  BookOpen,
  CalendarDays,
  Church,
  HandHeart,
  HeartHandshake,
  MapPin,
  Megaphone,
  MicVocal,
  Music,
  Phone,
  School,
  Sparkles,
  Users
} from "lucide-react";
import ministryCommunion from "../assets/images/ministry-communion.jpg";
import ministryFellowship from "../assets/images/ministry-fellowship.jpg";
import ministryKids from "../assets/images/ministry-kids.jpg";
import ministrySchool from "../assets/images/ministry-school.jpg";
import ministryTestimony from "../assets/images/ministry-testimony.jpg";
import pastorJagan from "../assets/images/pastor-jagan.jpg";
import { siteImages } from "./images";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Worship", href: "/worship" },
  { label: "Connect", href: "/connect" },
  {
    label: "Grow",
    href: "/grow",
    children: [
      { label: "Bible Study / Prayer", href: "/grow/bible-study-prayer" },
      { label: "Sunday School - B.L.A.S.T.", href: "/grow/sunday-school" },
      { label: "Kids Circle", href: "/grow/kids-circle" },
      { label: "Audio Sermons", href: "/sermons" }
      // TODO: Add Blog / Clay Pot here only after a real blog route exists.
    ]
  },
  { label: "Serve", href: "/serve" },
  { label: "Contact", href: "/contact" }
];

export const churchInfo = {
  worship: {
    label: "Sunday Worship",
    day: "Sunday",
    time: "10:30 AM",
    compactTime: "10:30",
    schedule: "Sunday at 10:30 AM",
    hud: "Sunday - 10:30 - Downers Grove"
  },
  address: {
    street: "1330 63rd St",
    city: "Downers Grove",
    state: "IL",
    zip: "60516",
    short: "1330 63rd St, Downers Grove, IL",
    full: "1330 63rd St, Downers Grove, IL 60516",
    locationLabel: "1330 63rd St · Downers Grove",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=1330%2063rd%20St%20Downers%20Grove%20IL%2060516",
    directionsUrlDirect:
      "https://www.google.com/maps/dir//1330+63rd+St,+Downers+Grove,+IL+60516"
  },
  contact: {
    phone: "(773) 936-3697",
    phoneHref: "tel:+17739363697",
    email: "ctcchicago@gmail.com",
    emailHref: "mailto:ctcchicago@gmail.com"
  }
};

export const quickLinks = [
  {
    title: "Sunday Worship",
    detail: "Join us every Sunday for inspiring worship, Bible teaching, and a time of fellowship.",
    meta: churchInfo.worship.schedule,
    metaSecond: "Everyone is welcome!",
    href: "/worship",
    icon: CalendarDays
  },
  {
    title: "Location",
    detail: "We are located in the heart of Chicago and would love to welcome you in person.",
    meta: churchInfo.address.full,
    metaHref: churchInfo.address.directionsUrl,
    href: "/visit",
    icon: MapPin
  },
  {
    title: "Contact",
    detail: "We'd love to hear from you. Reach out to us for questions or prayer requests.",
    meta: churchInfo.contact.phone,
    metaSecond: churchInfo.contact.email,
    href: "/contact",
    icon: Phone
  }
];

export const nextSteps = [
  {
    title: "Attend Worship",
    text: "Join the church family for Sunday worship centered on Christ.",
    href: "/visit",
    icon: Church
  },
  {
    title: "Meet the Pastors",
    text: "Learn about the pastoral leadership and ministry story of CTC.",
    href: "/pastors",
    icon: Users
  },
  {
    title: "Join Fellowship",
    text: "Build relationships through fellowship hour, groups, and shared meals.",
    href: "/connect",
    icon: HandHeart
  },
  {
    title: "Ask for Prayer",
    text: "Send a confidential prayer request or contact the church office.",
    href: "/contact",
    icon: HeartHandshake
  }
];

export const ministries = [
  {
    title: "Sunday School",
    text: "Bible-based teaching to help children grow in their faith.",
    href: "/grow/sunday-school",
    icon: School,
    image: ministrySchool
  },
  {
    title: "Kids Circle",
    text: "A fun and safe place for children to learn about God's love.",
    href: "/grow/kids-circle",
    icon: Users,
    image: ministryKids
  },
  {
    title: "Bible Study",
    text: "Midweek Scripture study and prayer for spiritual formation.",
    href: "/grow/bible-study-prayer",
    icon: BookOpen,
    image: siteImages.bibleStudy.src
  },
  {
    title: "Prayer",
    text: "We believe in the power of prayer and love praying for one another.",
    href: "/contact",
    icon: HeartHandshake,
    image: siteImages.prayer.src
  },
  {
    title: "Worship",
    text: "Lift your voice in worship and praise to our God through songs and music.",
    href: "/worship",
    icon: Music,
    image: siteImages.worship.src
  },
  {
    title: "Women's Fellowship",
    text: "A gathering for women to worship, learn, pray, and encourage one another in faith.",
    href: "/connect",
    icon: Sparkles,
    image: ministryFellowship
  },
  {
    title: "Men's Fellowship",
    text: "A time for men to grow in faith, encourage one another, and build Christ-centered relationships.",
    href: "/connect",
    icon: Users,
    image: ministryTestimony
  },
  {
    title: "Community Outreach",
    text: "Serving neighbors through compassion, prayer, and practical care.",
    href: "/serve",
    icon: Megaphone,
    image: ministryCommunion
  }
];

export const growItems = [
  {
    title: "Bible Study & Prayer",
    text: "Midweek Scripture study and prayer for spiritual formation.",
    href: "/grow/bible-study-prayer",
    icon: BookOpen
  },
  {
    title: "Sunday School",
    text: "B.L.A.S.T. helps children experience the gospel through Bible Learning And Spiritual Training.",
    href: "/grow/sunday-school",
    icon: School
  },
  {
    title: "Kids Circle",
    text: "A joyful ministry for children during the Sunday gathering rhythm.",
    href: "/grow/kids-circle",
    icon: Users
  },
  {
    title: "Community Outreach",
    text: "Serving neighbors through compassion, prayer, and practical care.",
    href: "/serve",
    icon: HandHeart
  }
];

export type ChurchEvent = {
  title: string;
  frequency: string;
  time?: string;
  category: string;
  description: string;
  cadence: "Weekly" | "Monthly" | "Annual" | "Seasonal" | "Periodic";
  date: string;
  location: string;
  image: string | null;
  flyerImage: string | null;
  ctaText: string;
  ctaLink: string;
  isFeatured: boolean;
  isAnnual: boolean;
  isRecurring: boolean;
  showOnHome?: boolean;
  homeFeatured?: boolean;
};

// Church admin/developer note:
// Add or update future events here. Home intentionally previews only events
// marked showOnHome, while Connect can display the full list.
export const churchEvents: ChurchEvent[] = [
  {
    title: "Sunday Worship Service",
    frequency: "Every Sunday",
    time: churchInfo.worship.time,
    category: "Tamil & English Worship",
    description:
      "Join us for Tamil and English worship, prayer, Scripture, sermon, children's ministry, communion, and fellowship.",
    cadence: "Weekly",
    date: "Every Sunday",
    location: "Christ Tamil Church",
    image: siteImages.hero.src,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true,
    showOnHome: true,
    homeFeatured: true
  },
  {
    title: "Sunday School",
    frequency: "Every Sunday",
    time: "During worship",
    category: "Children's Ministry",
    description:
      "Bible-based learning for children to grow in faith through age-appropriate lessons and activities.",
    cadence: "Weekly",
    date: "Every Sunday",
    location: "Children's Ministry Area",
    image: ministrySchool,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Prayer Conference",
    frequency: "Monday to Thursday",
    time: "7:00 PM",
    category: "Prayer Gathering",
    description:
      "Join us during the week for prayer, encouragement, and spiritual strengthening as a church family.",
    cadence: "Weekly",
    date: "Monday to Thursday",
    location: "Christ Tamil Church",
    image: siteImages.prayer.src,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: true,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Bible Study & Prayer",
    frequency: "Wednesday",
    time: "7:30 PM",
    category: "Midweek Bible Study",
    description:
      "Grow deeper in God's Word through midweek Bible study and prayer.",
    cadence: "Weekly",
    date: "Wednesday",
    location: "Christ Tamil Church",
    image: siteImages.bibleStudy.src,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/grow/bible-study-prayer",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true,
    showOnHome: true
  },
  {
    title: "Fasting Prayer",
    frequency: "First Saturday of every month",
    time: "10:30 AM",
    category: "Prayer & Fasting",
    description:
      "A dedicated time of prayer, fasting, worship, and seeking God together.",
    cadence: "Monthly",
    date: "First Saturday of every month",
    location: "Christ Tamil Church",
    image: siteImages.prayer.src,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: true,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Men's Fellowship",
    frequency: "Periodic Gathering",
    time: "Time To Be Announced",
    category: "Men's Ministry",
    description:
      "A time for men to grow in faith, encourage one another, and build Christ-centered relationships.",
    cadence: "Periodic",
    date: "Periodic Gathering",
    location: "Christ Tamil Church",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true
  },
  {
    title: "Women's Conference",
    frequency: "Annual / Periodic Gathering",
    time: "Time To Be Announced",
    category: "Women's Ministry",
    description:
      "A gathering for women to worship, learn, pray, and encourage one another in faith.",
    cadence: "Annual",
    date: "Annual / Periodic Gathering",
    location: "Christ Tamil Church",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: true,
    isRecurring: true
  },
  {
    title: "Outreach",
    frequency: "Seasonal / As Scheduled",
    time: "First Saturday of every month 4:30 PM",
    category: "Community Outreach",
    description:
      "Serving our community through love, care, prayer, and practical support.",
    cadence: "Seasonal",
    date: "Seasonal / As Scheduled",
    location: "Chicago Area",
    image: siteImages.events.src,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: true,
    isRecurring: true,
    showOnHome: true
  },
  {
    title: "Vacation Bible School",
    frequency: "Every Summer",
    time: "Time To Be Announced",
    category: "Children's Summer Ministry",
    description:
      "A joyful summer program where children learn God's Word through Bible stories, songs, games, crafts, and activities.",
    cadence: "Annual",
    date: "Every Summer",
    location: "Christ Tamil Church",
    image: ministryKids,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: true,
    isRecurring: true
  },
  {
    title: "Church Picnic",
    frequency: "Every June",
    time: "Time To Be Announced",
    category: "Family Fellowship",
    description:
      "A yearly outdoor gathering for food, fellowship, games, and community as a church family.",
    cadence: "Annual",
    date: "Every June",
    location: "Location To Be Announced",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: true,
    isRecurring: true
  },
  {
    title: "Family Camp",
    frequency: "Labor Day Weekend Every Year",
    category: "Family Retreat",
    description:
      "A yearly family retreat for worship, teaching, fellowship, rest, and spiritual renewal.",
    cadence: "Annual",
    date: "Labor Day Weekend Every Year",
    location: "Retreat Location To Be Announced",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: true,
    isAnnual: true,
    isRecurring: true
  },
  {
    title: "Fellowship Hour",
    frequency: "After Sunday Worship",
    time: "After Service",
    category: "Fellowship Hall",
    description:
      "Stay after worship to connect, encourage one another, and share life together.",
    cadence: "Weekly",
    date: "After Sunday Worship",
    location: "Fellowship Hall",
    image: ministryFellowship,
    flyerImage: null,
    ctaText: "Learn More",
    ctaLink: "/contact",
    isFeatured: false,
    isAnnual: false,
    isRecurring: true
  }
];

export const sermons = [
  {
    title: "Kingdom of God",
    speaker: "Dr. John Raju",
    date: "September 26, 2021",
    text: "Legacy sermon archive recording.",
    href: "https://fb.watch/8oO_aqBPfE/"
  },
  {
    title: "Justice and Mercy",
    speaker: "Rev. Godwin Kanaka Raj",
    date: "September 12, 2021",
    text: "Legacy sermon archive recording.",
    href: "https://fb.watch/86tjNogahZ/"
  },
  {
    title: "Who Do You Say I Am?",
    speaker: "Rev. Jagan Sathiya Seelan",
    date: "September 5, 2021",
    text: "Legacy sermon archive recording.",
    href: "https://fb.watch/86t7RYQz7h/"
  }
];

export const pastors = [
  {
    name: "Rev. Jagan Samuelraj",
    role: "Pastor",
    text: "Rev. Jagan Samuelraj serves as our pastor. He has a heart for teaching God's Word and shepherding His people.",
    image: pastorJagan
  }
];

export const beliefs = [
  {
    title: "God, the Father Almighty",
    text:
      "We believe in God, the Father Almighty, maker of heaven and earth (Heb. 11:3); and in Jesus Christ, His only Son, our Lord (Matt. 26:63-64); and in the Holy Spirit, the Comforter sent by God to teach and remind us (John 14:26); and that these three are one God."
  },
  {
    title: "The Scriptures",
    text:
      "We reverently receive the Scriptures of the Old and New Testaments, and believe that every part of Scripture is God-breathed and useful for showing us truth, exposing rebellion, correcting mistakes, and training us to live God's way (II Tim. 3:16)."
  },
  {
    title: "The Lord Jesus Christ",
    text:
      "We believe in the Lord Jesus Christ, who in the beginning was with God and was God, and who Himself bore our sins in His body on the tree, so that we might die to sins and live for righteousness (1 Peter 2:24)."
  },
  {
    title: "The Holy Spirit",
    text:
      "We believe the Holy Spirit has led us to repent of all our sins, turn from them, and obey Christ where He says, \"If anyone would come after me, he must deny himself and take up his cross and follow me\" (Mark 8:34)."
  },
  {
    title: "Resurrection and Judgement",
    text:
      "We believe the resurrection of the dead and the final judgement of all people. Whoever believes in the Son has eternal life, but whoever rejects the Son will not see life, for God's wrath remains on him (John 3:36)."
  },
  {
    title: "Grace Through Faith",
    text:
      "We believe that we are saved by grace through faith in the Lord Jesus Christ, and that good works are the certain fruit of such faith. Salvation is a gift of God, claimed by faith and not through our works (Eph. 2:8), and we have to endure unto the end to be saved (Matt. 10:22)."
  },
  {
    title: "Church Life",
    text:
      "We cheerfully submit ourselves to the instruction and government of this church, and we promise to promote its purity, peace, and welfare by all means within our power, so long as we shall continue to be a member."
  }
];

export const pageSummaries = [
  {
    title: "Visit",
    text: "Service time, directions, what to expect, children, and fellowship.",
    href: "/visit",
    icon: MapPin
  },
  {
    title: "Worship",
    text: "Sunday worship, music, prayer, sermon, testimony, and communion.",
    href: "/worship",
    icon: Church
  },
  {
    title: "Grow",
    text: "Bible study, Sunday school, Kids Circle, and sermon resources.",
    href: "/grow",
    icon: BookOpen
  },
  {
    title: "Serve",
    text: "Community outreach and ministry opportunities.",
    href: "/serve",
    icon: HandHeart
  },
  {
    title: "Sermons",
    text: "Latest message and sermon archive.",
    href: "/sermons",
    icon: MicVocal
  },
  {
    title: "Connect",
    text: "Upcoming gatherings, fellowship, and retreat information.",
    href: "/connect",
    icon: CalendarDays
  }
];
