import {
  BookOpen,
  CalendarDays,
  Church,
  HandHeart,
  HeartHandshake,
  MapPin,
  MicVocal,
  Music,
  Phone,
  School,
  Users
} from "lucide-react";
import guestSpeakerSamReeves from "../assets/images/guest-speaker-sam-reeves.jpeg";
import ministryCommunion from "../assets/images/ministry-communion.jpg";
import ministryFellowship from "../assets/images/ministry-fellowship.jpg";
import ministryKids from "../assets/images/ministry-kids.jpg";
import ministryMusic from "../assets/images/ministry-music.jpg";
import ministryPrayer from "../assets/images/ministry-prayer.jpg";
import ministrySchool from "../assets/images/ministry-school.jpg";
import ministrySermon from "../assets/images/ministry-sermon.jpg";
import ministryTestimony from "../assets/images/ministry-testimony.jpg";
import pastorJagan from "../assets/images/pastor-jagan.jpg";

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

export const quickLinks = [
  {
    title: "Sunday Worship",
    detail: "Join us every Sunday for inspiring worship, Bible teaching, and a time of fellowship.",
    meta: "Sunday at 10.30 AM",
    metaSecond: "Everyone is welcome!",
    href: "/worship",
    icon: CalendarDays
  },
  {
    title: "Location",
    detail: "We are located in the heart of Chicago and would love to welcome you in person.",
    meta: "1330, 63rd St Downers Grove, IL-60516",
    metaHref: "https://www.google.com/maps/search/?api=1&query=1330%2063rd%20St%20Downers%20Grove%20IL%2060516",
    href: "/visit",
    icon: MapPin
  },
  {
    title: "Contact",
    detail: "We'd love to hear from you. Reach out to us for questions or prayer requests.",
    meta: "(773) 936-3697",
    metaSecond: "ctcchicago@gmail.com",
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
    title: "Music",
    text: "Lift your voice in worship and praise to our God through songs and music.",
    href: "/worship",
    icon: Music,
    image: ministryMusic
  },
  {
    title: "Testimony",
    text: "Be encouraged as we hear how God is working in the lives of His people.",
    href: "/worship",
    icon: MicVocal,
    image: ministryTestimony
  },
  {
    title: "Kids Circle",
    text: "A fun and safe place for children to learn about God's love.",
    href: "/grow/kids-circle",
    icon: Users,
    image: ministryKids
  },
  {
    title: "Prayer",
    text: "We believe in the power of prayer and love praying for one another.",
    href: "/contact",
    icon: HeartHandshake,
    image: ministryPrayer
  },
  {
    title: "Sunday School",
    text: "Bible-based teaching to help children grow in their faith.",
    href: "/grow/sunday-school",
    icon: School,
    image: ministrySchool
  },
  {
    title: "Sermon",
    text: "Expository Bible teaching that is practical and life-transforming.",
    href: "/sermons",
    icon: BookOpen,
    image: ministrySermon
  },
  {
    title: "Holy Communion",
    text: "Remembering Christ's sacrifice and celebrating His love.",
    href: "/worship",
    icon: Church,
    image: ministryCommunion
  },
  {
    title: "Fellowship",
    text: "Building relationships and sharing life together during fellowship hour.",
    href: "/connect",
    icon: HandHeart,
    image: ministryFellowship
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

export const events = [
  {
    title: "Bible Study & Prayer",
    date: "Every Wednesday",
    text: "Gather around Scripture and pray for the church, families, and city."
  },
  {
    title: "Fellowship Hour",
    date: "After Sunday Worship",
    text: "Stay after worship for conversation, encouragement, and community."
  },
  {
    title: "Annual Church Retreat",
    date: "Seasonal",
    text: "A dedicated time for worship, teaching, rest, and church family connection."
  },
  {
    title: "Community Outreach",
    date: "Throughout the year",
    text: "Opportunities to serve neighbors and support local needs in Chicago."
  }
];

export const eventPromos = [
  {
    title: "Sunday Service with Rev. Dr. Sam J Reeves",
    dateLabel: "Jun 14",
    category: "Guest Speaker",
    flyer: guestSpeakerSamReeves,
    featured: true,
    href: "/connect"
  }
];

export const sermons = [
  {
    title: "Christ Our Hope",
    speaker: "Rev. Jagan Samuelraj",
    date: "Latest Message",
    text: "A biblical message for worship, renewal, and faithful witness."
  },
  {
    title: "Faith for the Family",
    speaker: "Rev. Godwin Kanaka Raj",
    date: "Archive",
    text: "Teaching that encourages homes to follow Christ in daily life."
  },
  {
    title: "Prayer and Perseverance",
    speaker: "Guest Speaker",
    date: "Archive",
    text: "A sermon focused on steadfast prayer and trust in God."
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
