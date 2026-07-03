export type DailyVerse = {
  english: string;
  tamil: string;
  reference: string;
  tamilReference: string;
};

export const dailyVerses: DailyVerse[] = [
  {
    english: "Trust in the Lord with all your heart, and lean not on your own understanding.",
    tamil: "உன் சுயபுத்தியின்மேல் சாயாமல், உன் முழு இருதயத்தோடும் கர்த்தரில் நம்பிக்கையாயிரு.",
    reference: "Proverbs 3:5",
    tamilReference: "நீதிமொழிகள் 3:5"
  },
  {
    english: "The Lord is my shepherd; I shall not want.",
    tamil: "கர்த்தர் என் மேய்ப்பராயிருக்கிறார்; எனக்கு குறைவில்லை.",
    reference: "Psalm 23:1",
    tamilReference: "சங்கீதம் 23:1"
  },
  {
    english: "God is our refuge and strength, a very present help in trouble.",
    tamil: "தேவன் நமக்கு அடைக்கலமும் பெலனும், ஆபத்துக்காலத்தில் அருகில் இருக்கும் துணையும் ஆவார்.",
    reference: "Psalm 46:1",
    tamilReference: "சங்கீதம் 46:1"
  },
  {
    english: "Let all that you do be done in love.",
    tamil: "நீங்கள் செய்கிற யாவும் அன்பினாலே செய்யப்படக்கடவது.",
    reference: "1 Corinthians 16:14",
    tamilReference: "1 கொரிந்தியர் 16:14"
  },
  {
    english: "Be still, and know that I am God.",
    tamil: "நீங்கள் அமர்ந்து, நானே தேவன் என்று அறிந்துகொள்ளுங்கள்.",
    reference: "Psalm 46:10",
    tamilReference: "சங்கீதம் 46:10"
  },
  {
    english: "The joy of the Lord is your strength.",
    tamil: "கர்த்தருக்குள் மகிழ்ச்சியாயிருப்பதே உங்களுடைய பெலன்.",
    reference: "Nehemiah 8:10",
    tamilReference: "நெகேமியா 8:10"
  },
  {
    english: "Your word is a lamp to my feet and a light to my path.",
    tamil: "உமது வசனம் என் கால்களுக்கு விளக்கும், என் பாதைக்கு வெளிச்சமுமாயிருக்கிறது.",
    reference: "Psalm 119:105",
    tamilReference: "சங்கீதம் 119:105"
  }
];

export function getTodayVerse(date = new Date()): DailyVerse {
  const localDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const dayIndex = Math.floor(localDay / 86_400_000);

  return dailyVerses[dayIndex % dailyVerses.length];
}
