import fs from "node:fs";
import path from "node:path";

const messagesDir = path.resolve("messages");

const copies = {
  en: {
    subtitle: "Our policy on returns, refunds, and replacements.",
    returnsBody: {
      noReturn: {
        title: "1. No Return / No Refund Policy",
        body: "Due to the nature of wellness and nutraceutical products, all sales are final. Products once sold are not returnable or refundable.",
      },
      damaged: {
        title: "2. Damaged or Incorrect Products",
        intro: "In case of damaged or wrong product delivery:",
        items: [
          "Notify us within 24 hours of receiving the order",
          "Share clear images and invoice details",
          "Replacement may be provided at the company's discretion after verification.",
        ],
      },
      ineligible: {
        title: "3. Non-Eligibility for Refund",
        intro: "Refunds will not be issued for:",
        items: [
          "Change of mind",
          "Improper usage",
          "Opened or used products",
          "Delays caused by courier partners",
        ],
      },
      associate: {
        title: "4. Associate & Promotional Purchases",
        body: "Products purchased under offers, discounts, rewards, or business volumes are non-refundable and non-returnable.",
      },
    },
  },
  hi: {
    subtitle: "वापसी, रिफंड और प्रतिस्थापन पर हमारी नीति।",
    returnsBody: {
      noReturn: {
        title: "1. कोई वापसी नहीं / कोई रिफंड नहीं नीति",
        body: "वेलनेस और न्यूट्रास्यूटिकल उत्पादों की प्रकृति के कारण, सभी बिक्री अंतिम है। एक बार बेचे गए उत्पाद वापस नहीं किए जा सकते और न ही उनका रिफंड दिया जा सकता है।",
      },
      damaged: {
        title: "2. क्षतिग्रस्त या गलत उत्पाद",
        intro: "क्षतिग्रस्त या गलत उत्पाद की डिलीवरी होने पर:",
        items: [
          "ऑर्डर प्राप्त होने के 24 घंटे के भीतर हमें सूचित करें",
          "स्पष्ट तस्वीरें और इनवॉइस का विवरण साझा करें",
          "सत्यापन के बाद कंपनी के विवेक पर प्रतिस्थापन दिया जा सकता है।",
        ],
      },
      ineligible: {
        title: "3. रिफंड के लिए अपात्रता",
        intro: "इन स्थितियों में रिफंड नहीं दिया जाएगा:",
        items: [
          "मन बदलना",
          "अनुचित उपयोग",
          "खुले या इस्तेमाल किए गए उत्पाद",
          "कूरियर पार्टनर के कारण हुई देरी",
        ],
      },
      associate: {
        title: "4. एसोसिएट और प्रमोशनल खरीद",
        body: "ऑफर, छूट, रिवॉर्ड या बिज़नेस वॉल्यूम के तहत खरीदे गए उत्पाद न तो रिफंड किए जा सकते हैं और न ही वापस लिए जा सकते हैं।",
      },
    },
  },
  te: {
    subtitle: "రిటర్న్‌లు, రీఫండ్‌లు మరియు రీప్లేస్‌మెంట్‌లపై మా విధానం.",
    returnsBody: {
      noReturn: {
        title: "1. రిటర్న్ లేదు / రీఫండ్ లేదు విధానం",
        body: "వెల్నెస్ మరియు న్యూట్రాస్యూటికల్ ఉత్పత్తుల స్వభావం వల్ల, అన్ని అమ్మకాలు తుది. ఒకసారి అమ్మిన ఉత్పత్తులు తిరిగి ఇవ్వబడవు మరియు రీఫండ్ చేయబడవు.",
      },
      damaged: {
        title: "2. పాడైన లేదా తప్పు ఉత్పత్తులు",
        intro: "పాడైన లేదా తప్పు ఉత్పత్తి డెలివరీ అయినప్పుడు:",
        items: [
          "ఆర్డర్ అందిన 24 గంటలలోపు మాకు తెలియజేయండి",
          "స్పష్టమైన చిత్రాలు మరియు ఇన్‌వాయిస్ వివరాలు పంచుకోండి",
          "ధృవీకరణ తర్వాత కంపెనీ విచక్షణ మేరకు రీప్లేస్‌మెంట్ ఇవ్వవచ్చు.",
        ],
      },
      ineligible: {
        title: "3. రీఫండ్‌కు అనర్హత",
        intro: "వీటికి రీఫండ్ ఇవ్వబడదు:",
        items: [
          "మనసు మారడం",
          "అనుచిత వినియోగం",
          "తెరిచిన లేదా ఉపయోగించిన ఉత్పత్తులు",
          "కొరియర్ భాగస్వాముల వల్ల కలిగే ఆలస్యం",
        ],
      },
      associate: {
        title: "4. అసోసియేట్ మరియు ప్రమోషనల్ కొనుగోళ్లు",
        body: "ఆఫర్లు, డిస్కౌంట్లు, రివార్డులు లేదా బిజినెస్ వాల్యూమ్‌ల కింద కొనుగోలు చేసిన ఉత్పత్తులు రీఫండ్ చేయబడవు మరియు తిరిగి ఇవ్వబడవు.",
      },
    },
  },
  ta: {
    subtitle: "திரும்பப்பெறுதல், பணத்திரும்பம் மற்றும் மாற்றீடு குறித்த எங்கள் கொள்கை.",
    returnsBody: {
      noReturn: {
        title: "1. திரும்பப்பெறுதல் இல்லை / பணத்திரும்பம் இல்லை கொள்கை",
        body: "ஆரோக்கியம் மற்றும் நியூட்ராசூட்டிகல் பொருட்களின் தன்மை காரணமாக, அனைத்து விற்பனைகளும் இறுதியானவை. ஒருமுறை விற்கப்பட்ட பொருட்களைத் திருப்பித் தரவோ, பணத்தைத் திருப்பிப் பெறவோ முடியாது.",
      },
      damaged: {
        title: "2. சேதமடைந்த அல்லது தவறான பொருட்கள்",
        intro: "சேதமடைந்த அல்லது தவறான பொருள் வழங்கப்பட்டால்:",
        items: [
          "ஆர்டர் கிடைத்த 24 மணி நேரத்திற்குள் எங்களுக்குத் தெரிவிக்கவும்",
          "தெளிவான படங்கள் மற்றும் இன்வாய்ஸ் விவரங்களைப் பகிரவும்",
          "சரிபார்ப்பிற்குப் பிறகு நிறுவனத்தின் விருப்புரிமைப்படி மாற்றீடு வழங்கப்படலாம்.",
        ],
      },
      ineligible: {
        title: "3. பணத்திரும்பத்திற்கு தகுதியின்மை",
        intro: "இவற்றுக்கு பணத்திரும்பம் வழங்கப்படாது:",
        items: [
          "மனம் மாறுதல்",
          "தவறான பயன்பாடு",
          "திறந்த அல்லது பயன்படுத்திய பொருட்கள்",
          "கூரியர் கூட்டாளர்களால் ஏற்பட்ட தாமதம்",
        ],
      },
      associate: {
        title: "4. அசோசியேட் மற்றும் விளம்பர கொள்முதல்கள்",
        body: "சலுகைகள், தள்ளுபடிகள், வெகுமதிகள் அல்லது வணிக அளவுகளின் கீழ் வாங்கிய பொருட்களுக்கு பணத்திரும்பம் இல்லை; அவற்றைத் திருப்பித் தரவும் முடியாது.",
      },
    },
  },
  kn: {
    subtitle: "ಹಿಂತಿರುಗಿಸುವಿಕೆ, ಮರುಪಾವತಿ ಮತ್ತು ಬದಲಿಗಳ ಕುರಿತ ನಮ್ಮ ನೀತಿ.",
    returnsBody: {
      noReturn: {
        title: "1. ಹಿಂತಿರುಗಿಸುವಿಕೆ ಇಲ್ಲ / ಮರುಪಾವತಿ ಇಲ್ಲ ನೀತಿ",
        body: "ವೆಲ್‌ನೆಸ್ ಮತ್ತು ನ್ಯೂಟ್ರಾಸ್ಯೂಟಿಕಲ್ ಉತ್ಪನ್ನಗಳ ಸ್ವಭಾವದಿಂದಾಗಿ, ಎಲ್ಲಾ ಮಾರಾಟಗಳು ಅಂತಿಮ. ಒಮ್ಮೆ ಮಾರಾಟವಾದ ಉತ್ಪನ್ನಗಳನ್ನು ಹಿಂತಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ ಮತ್ತು ಮರುಪಾವತಿ ನೀಡಲಾಗುವುದಿಲ್ಲ.",
      },
      damaged: {
        title: "2. ಹಾನಿಗೊಳಗಾದ ಅಥವಾ ತಪ್ಪಾದ ಉತ್ಪನ್ನಗಳು",
        intro: "ಹಾನಿಗೊಳಗಾದ ಅಥವಾ ತಪ್ಪು ಉತ್ಪನ್ನ ವಿತರಣೆಯ ಸಂದರ್ಭದಲ್ಲಿ:",
        items: [
          "ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಿದ 24 ಗಂಟೆಗಳೊಳಗೆ ನಮಗೆ ತಿಳಿಸಿ",
          "ಸ್ಪಷ್ಟ ಚಿತ್ರಗಳು ಮತ್ತು ಇನ್‌ವಾಯ್ಸ್ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
          "ಪರಿಶೀಲನೆಯ ನಂತರ ಕಂಪನಿಯ ವಿವೇಚನೆಗೆ ಅನುಸಾರ ಬದಲಿ ನೀಡಬಹುದು.",
        ],
      },
      ineligible: {
        title: "3. ಮರುಪಾವತಿಗೆ ಅನರ್ಹತೆ",
        intro: "ಇವುಗಳಿಗೆ ಮರುಪಾವತಿ ನೀಡಲಾಗುವುದಿಲ್ಲ:",
        items: [
          "ಮನಸ್ಸು ಬದಲಾಯಿಸುವುದು",
          "ಅನುಚಿತ ಬಳಕೆ",
          "ತೆರೆದ ಅಥವಾ ಬಳಸಿದ ಉತ್ಪನ್ನಗಳು",
          "ಕೊರಿಯರ್ ಪಾಲುದಾರರಿಂದ ಉಂಟಾದ ವಿಳಂಬ",
        ],
      },
      associate: {
        title: "4. ಅಸೋಸಿಯೇಟ್ ಮತ್ತು ಪ್ರಚಾರ ಖರೀದಿಗಳು",
        body: "ಆಫರ್‌ಗಳು, ರಿಯಾಯಿತಿಗಳು, ಬಹುಮಾನಗಳು ಅಥವಾ ವ್ಯಾಪಾರ ಪ್ರಮಾಣಗಳ ಅಡಿಯಲ್ಲಿ ಖರೀದಿಸಿದ ಉತ್ಪನ್ನಗಳಿಗೆ ಮರುಪಾವತಿ ಇಲ್ಲ ಮತ್ತು ಅವುಗಳನ್ನು ಹಿಂತಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ.",
      },
    },
  },
  ml: {
    subtitle: "റിട്ടേണുകൾ, റീഫണ്ടുകൾ, പകരം നൽകൽ എന്നിവയെക്കുറിച്ചുള്ള ഞങ്ങളുടെ നയം.",
    returnsBody: {
      noReturn: {
        title: "1. റിട്ടേൺ ഇല്ല / റീഫണ്ട് ഇല്ല നയം",
        body: "വെൽനസ്, ന്യൂട്രാസ്യൂട്ടിക്കൽ ഉൽപ്പന്നങ്ങളുടെ സ്വഭാവം കാരണം, എല്ലാ വിൽപ്പനയും അന്തിമമാണ്. ഒരിക്കൽ വിൽക്കപ്പെട്ട ഉൽപ്പന്നങ്ങൾ തിരികെ നൽകാനോ റീഫണ്ട് ചെയ്യാനോ കഴിയില്ല.",
      },
      damaged: {
        title: "2. കേടായതോ തെറ്റായതോ ആയ ഉൽപ്പന്നങ്ങൾ",
        intro: "കേടായതോ തെറ്റായതോ ആയ ഉൽപ്പന്നം എത്തിച്ചാൽ:",
        items: [
          "ഓർഡർ ലഭിച്ച് 24 മണിക്കൂറിനുള്ളിൽ ഞങ്ങളെ അറിയിക്കുക",
          "വ്യക്തമായ ചിത്രങ്ങളും ഇൻവോയ്സ് വിവരങ്ങളും പങ്കിടുക",
          "പരിശോധനയ്ക്ക് ശേഷം കമ്പനിയുടെ വിവേചനാധികാരത്തിൽ പകരം നൽകാം.",
        ],
      },
      ineligible: {
        title: "3. റീഫണ്ടിന് അയോഗ്യത",
        intro: "ഇവയ്ക്ക് റീഫണ്ട് നൽകില്ല:",
        items: [
          "മനസ്സ് മാറ്റം",
          "തെറ്റായ ഉപയോഗം",
          "തുറന്നതോ ഉപയോഗിച്ചതോ ആയ ഉൽപ്പന്നങ്ങൾ",
          "കൊറിയർ പങ്കാളികൾ മൂലമുണ്ടാകുന്ന കാലതാമസം",
        ],
      },
      associate: {
        title: "4. അസോസിയേറ്റ്, പ്രമോഷണൽ വാങ്ങലുകൾ",
        body: "ഓഫറുകൾ, കിഴിവുകൾ, റിവാർഡുകൾ അല്ലെങ്കിൽ ബിസിനസ് വോള്യങ്ങൾക്ക് കീഴിൽ വാങ്ങിയ ഉൽപ്പന്നങ്ങൾ റീഫണ്ട് ചെയ്യില്ല, തിരികെ നൽകാനും കഴിയില്ല.",
      },
    },
  },
  mr: {
    subtitle: "परतावे, रिफंड आणि बदली यांबाबत आमचे धोरण.",
    returnsBody: {
      noReturn: {
        title: "1. परतावा नाही / रिफंड नाही धोरण",
        body: "वेलनेस आणि न्यूट्रास्युटिकल उत्पादनांच्या स्वरूपामुळे, सर्व विक्री अंतिम आहे. एकदा विकलेली उत्पादने परत करता येत नाहीत आणि त्यांचे रिफंड मिळत नाही.",
      },
      damaged: {
        title: "2. खराब झालेली किंवा चुकीची उत्पादने",
        intro: "खराब किंवा चुकीचे उत्पादन वितरित झाल्यास:",
        items: [
          "ऑर्डर मिळाल्यापासून 24 तासांच्या आत आम्हाला कळवा",
          "स्पष्ट छायाचित्रे आणि इनव्हॉइस तपशील शेअर करा",
          "पडताळणीनंतर कंपनीच्या विवेकानुसार बदली दिली जाऊ शकते.",
        ],
      },
      ineligible: {
        title: "3. रिफंडसाठी अपात्रता",
        intro: "यांसाठी रिफंड दिला जाणार नाही:",
        items: [
          "मन बदलणे",
          "अयोग्य वापर",
          "उघडलेली किंवा वापरलेली उत्पादने",
          "कुरिअर भागीदारांमुळे झालेला विलंब",
        ],
      },
      associate: {
        title: "4. असोसिएट आणि प्रमोशनल खरेदी",
        body: "ऑफर, सवलत, बक्षिसे किंवा बिझनेस व्हॉल्यूम अंतर्गत खरेदी केलेली उत्पादने रिफंडयोग्य नाहीत आणि परत करता येत नाहीत.",
      },
    },
  },
  bn: {
    subtitle: "ফেরত, রিফান্ড ও প্রতিস্থাপন বিষয়ে আমাদের নীতি।",
    returnsBody: {
      noReturn: {
        title: "1. ফেরত নেই / রিফান্ড নেই নীতি",
        body: "ওয়েলনেস ও নিউট্রাসিউটিক্যাল পণ্যের প্রকৃতির কারণে, সব বিক্রি চূড়ান্ত। একবার বিক্রি হওয়া পণ্য ফেরত দেওয়া হয় না এবং রিফান্ডযোগ্যও নয়।",
      },
      damaged: {
        title: "2. ক্ষতিগ্রস্ত বা ভুল পণ্য",
        intro: "ক্ষতিগ্রস্ত বা ভুল পণ্য সরবরাহ হলে:",
        items: [
          "অর্ডার পাওয়ার 24 ঘণ্টার মধ্যে আমাদের জানান",
          "স্পষ্ট ছবি ও ইনভয়েসের বিবরণ শেয়ার করুন",
          "যাচাইয়ের পর কোম্পানির বিবেচনায় প্রতিস্থাপন দেওয়া হতে পারে।",
        ],
      },
      ineligible: {
        title: "3. রিফান্ডের অযোগ্যতা",
        intro: "এসব ক্ষেত্রে রিফান্ড দেওয়া হবে না:",
        items: [
          "মন পরিবর্তন",
          "অনুচিত ব্যবহার",
          "খোলা বা ব্যবহৃত পণ্য",
          "কুরিয়ার অংশীদারদের কারণে বিলম্ব",
        ],
      },
      associate: {
        title: "4. অ্যাসোসিয়েট ও প্রমোশনাল কেনাকাটা",
        body: "অফার, ছাড়, পুরস্কার বা বিজনেস ভলিউমের অধীনে কেনা পণ্য ফেরতযোগ্য নয় এবং রিফান্ডযোগ্যও নয়।",
      },
    },
  },
  gu: {
    subtitle: "પરત, રિફંડ અને રિપ્લેસમેન્ટ અંગેની અમારી નીતિ.",
    returnsBody: {
      noReturn: {
        title: "1. પરત નહીં / રિફંડ નહીં નીતિ",
        body: "વેલનેસ અને ન્યુટ્રાસ્યુટિકલ ઉત્પાદનોના સ્વભાવને કારણે, તમામ વેચાણ અંતિમ છે. એકવાર વેચાયેલા ઉત્પાદનો પરત કરી શકાતા નથી અને તેમનું રિફંડ મળતું નથી.",
      },
      damaged: {
        title: "2. નુકસાન પામેલા અથવા ખોટા ઉત્પાદનો",
        intro: "નુકસાન પામેલા અથવા ખોટા ઉત્પાદનની ડિલિવરીના કિસ્સામાં:",
        items: [
          "ઑર્ડર મળ્યાના 24 કલાકની અંદર અમને જાણ કરો",
          "સ્પષ્ટ તસવીરો અને ઇન્વૉઇસની વિગતો શેર કરો",
          "ચકાસણી પછી કંપનીના વિવેકાનુસાર રિપ્લેસમેન્ટ આપી શકાય છે.",
        ],
      },
      ineligible: {
        title: "3. રિફંડ માટે અપાત્રતા",
        intro: "આ માટે રિફંડ આપવામાં આવશે નહીં:",
        items: [
          "મન બદલવું",
          "અયોગ્ય ઉપયોગ",
          "ખોલેલા અથવા વપરાયેલા ઉત્પાદનો",
          "કુરિયર ભાગીદારોને કારણે થયેલો વિલંબ",
        ],
      },
      associate: {
        title: "4. એસોસિએટ અને પ્રમોશનલ ખરીદી",
        body: "ઑફર, ડિસ્કાઉન્ટ, રિવૉર્ડ અથવા બિઝનેસ વૉલ્યુમ હેઠળ ખરીદેલા ઉત્પાદનો રિફંડપાત્ર નથી અને પરત કરી શકાતા નથી.",
      },
    },
  },
  or: {
    subtitle: "ଫେରସ୍ତ, ରିଫଣ୍ଡ ଓ ପ୍ରତିସ୍ଥାପନ ଉପରେ ଆମ ନୀତି।",
    returnsBody: {
      noReturn: {
        title: "1. ଫେରସ୍ତ ନାହିଁ / ରିଫଣ୍ଡ ନାହିଁ ନୀତି",
        body: "ୱେଲନେସ ଓ ନ୍ୟୁଟ୍ରାସ୍ୟୁଟିକାଲ୍ ଉତ୍ପାଦର ପ୍ରକୃତି ଯୋଗୁଁ, ସମସ୍ତ ବିକ୍ରୟ ଅନ୍ତିମ। ଥରେ ବିକ୍ରି ହୋଇଥିବା ଉତ୍ପାଦ ଫେରସ୍ତ କରାଯାଏ ନାହିଁ ଏବଂ ରିଫଣ୍ଡଯୋଗ୍ୟ ନୁହେଁ।",
      },
      damaged: {
        title: "2. କ୍ଷତିଗ୍ରସ୍ତ କିମ୍ବା ଭୁଲ ଉତ୍ପାଦ",
        intro: "କ୍ଷତିଗ୍ରସ୍ତ କିମ୍ବା ଭୁଲ ଉତ୍ପାଦ ବିତରଣ ହେଲେ:",
        items: [
          "ଅର୍ଡର ମିଳିବାର 24 ଘଣ୍ଟା ମଧ୍ୟରେ ଆମକୁ ଜଣାନ୍ତୁ",
          "ସ୍ପଷ୍ଟ ଫଟୋ ଓ ଇନଭଏସ୍ ବିବରଣୀ ଅଂଶୀଦାର କରନ୍ତୁ",
          "ଯାଞ୍ଚ ପରେ କମ୍ପାନୀର ବିବେଚନାରେ ପ୍ରତିସ୍ଥାପନ ଦିଆଯାଇପାରେ।",
        ],
      },
      ineligible: {
        title: "3. ରିଫଣ୍ଡ ପାଇଁ ଅଯୋଗ୍ୟତା",
        intro: "ଏଥିପାଇଁ ରିଫଣ୍ଡ ଦିଆଯିବ ନାହିଁ:",
        items: [
          "ମନ ବଦଳ",
          "ଅନୁଚିତ ବ୍ୟବହାର",
          "ଖୋଲା କିମ୍ବା ବ୍ୟବହୃତ ଉତ୍ପାଦ",
          "କୁରିଅର୍ ସହଯୋଗୀଙ୍କ ଯୋଗୁଁ ବିଳମ୍ବ",
        ],
      },
      associate: {
        title: "4. ଆସୋସିଏଟ୍ ଓ ପ୍ରମୋସନାଲ୍ କ୍ରୟ",
        body: "ଅଫର୍, ରିହାତି, ପୁରସ୍କାର କିମ୍ବା ବିଜନେସ୍ ଭଲ୍ୟୁମ୍ ଅଧୀନରେ କିଣାଯାଇଥିବା ଉତ୍ପାଦ ରିଫଣ୍ଡଯୋଗ୍ୟ ନୁହେଁ ଏବଂ ଫେରସ୍ତ କରାଯାଇପାରିବ ନାହିଁ।",
      },
    },
  },
  pa: {
    subtitle: "ਵਾਪਸੀ, ਰਿਫੰਡ ਅਤੇ ਬਦਲਾਅ ਬਾਰੇ ਸਾਡੀ ਨੀਤੀ।",
    returnsBody: {
      noReturn: {
        title: "1. ਕੋਈ ਵਾਪਸੀ ਨਹੀਂ / ਕੋਈ ਰਿਫੰਡ ਨਹੀਂ ਨੀਤੀ",
        body: "ਵੈਲਨੈੱਸ ਅਤੇ ਨਿਊਟਰਾਸਿਊਟੀਕਲ ਉਤਪਾਦਾਂ ਦੀ ਪ੍ਰਕਿਰਤੀ ਕਾਰਨ, ਸਾਰੀਆਂ ਵਿਕਰੀਆਂ ਅੰਤਿਮ ਹਨ। ਇੱਕ ਵਾਰ ਵਿਕੇ ਉਤਪਾਦ ਵਾਪਸ ਨਹੀਂ ਕੀਤੇ ਜਾ ਸਕਦੇ ਅਤੇ ਨਾ ਹੀ ਉਨ੍ਹਾਂ ਦਾ ਰਿਫੰਡ ਮਿਲਦਾ ਹੈ।",
      },
      damaged: {
        title: "2. ਨੁਕਸਾਨੇ ਜਾਂ ਗਲਤ ਉਤਪਾਦ",
        intro: "ਨੁਕਸਾਨੇ ਜਾਂ ਗਲਤ ਉਤਪਾਦ ਦੀ ਡਿਲੀਵਰੀ ਦੀ ਸੂਰਤ ਵਿੱਚ:",
        items: [
          "ਆਰਡਰ ਮਿਲਣ ਦੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਸਾਨੂੰ ਦੱਸੋ",
          "ਸਾਫ਼ ਤਸਵੀਰਾਂ ਅਤੇ ਇਨਵੌਇਸ ਵੇਰਵੇ ਸਾਂਝੇ ਕਰੋ",
          "ਜਾਂਚ ਤੋਂ ਬਾਅਦ ਕੰਪਨੀ ਦੀ ਮਰਜ਼ੀ ਅਨੁਸਾਰ ਬਦਲਾਅ ਦਿੱਤਾ ਜਾ ਸਕਦਾ ਹੈ।",
        ],
      },
      ineligible: {
        title: "3. ਰਿਫੰਡ ਲਈ ਅਯੋਗਤਾ",
        intro: "ਇਹਨਾਂ ਲਈ ਰਿਫੰਡ ਨਹੀਂ ਦਿੱਤਾ ਜਾਵੇਗਾ:",
        items: [
          "ਮਨ ਬਦਲਣਾ",
          "ਗਲਤ ਵਰਤੋਂ",
          "ਖੋਲ੍ਹੇ ਜਾਂ ਵਰਤੇ ਹੋਏ ਉਤਪਾਦ",
          "ਕੋਰੀਅਰ ਭਾਈਵਾਲਾਂ ਕਾਰਨ ਹੋਈ ਦੇਰੀ",
        ],
      },
      associate: {
        title: "4. ਐਸੋਸੀਏਟ ਅਤੇ ਪ੍ਰਮੋਸ਼ਨਲ ਖਰੀਦਾਂ",
        body: "ਆਫ਼ਰਾਂ, ਛੋਟਾਂ, ਇਨਾਮਾਂ ਜਾਂ ਬਿਜ਼ਨਸ ਵਾਲੀਅਮ ਹੇਠ ਖਰੀਦੇ ਉਤਪਾਦ ਰਿਫੰਡਯੋਗ ਨਹੀਂ ਅਤੇ ਵਾਪਸ ਨਹੀਂ ਕੀਤੇ ਜਾ ਸਕਦੇ।",
      },
    },
  },
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function keyBlock(key, value, nl) {
  const serialized = JSON.stringify({ [key]: value }, null, 2);
  const inner = serialized.slice(1, -1).replace(/^\n/, "").replace(/\n$/, "");
  return nl === "\n" ? inner : inner.replace(/\n/g, nl);
}

function replaceTopLevelKey(raw, key, value, nl) {
  const needle = `${nl}  "${key}":`;
  const start = raw.indexOf(needle);
  if (start === -1) return null;
  const brace = raw.indexOf("{", start);
  let depth = 0;
  let end = -1;
  for (let i = brace; i < raw.length; i += 1) {
    const char = raw[i];
    if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) throw new Error(`Unclosed ${key}`);
  const comma = raw[end + 1] === "," ? "," : "";
  const block = keyBlock(key, value, nl);
  return raw.slice(0, start + nl.length) + block + comma + raw.slice(end + 1 + comma.length);
}

function appendTopLevelKey(raw, key, value, nl) {
  const trimmed = raw.replace(/\s*$/, "");
  const idx = trimmed.lastIndexOf("}");
  if (idx === -1) throw new Error("Missing closing brace");
  const head = trimmed.slice(0, idx).replace(/\s*$/, "");
  const comma = head.endsWith(",") ? "" : ",";
  return `${head}${comma}${nl}${keyBlock(key, value, nl)}${nl}}${nl}`;
}

function replaceDescription(raw, subtitle) {
  const data = JSON.parse(raw);
  const block = data.routes?.returns;
  if (!block || typeof block.title !== "string" || typeof block.description !== "string") {
    throw new Error("routes.returns is missing");
  }
  if (block.description === subtitle) return raw;
  const titleEncoded = escapeRegExp(JSON.stringify(block.title));
  const oldEncoded = escapeRegExp(JSON.stringify(block.description));
  const newEncoded = JSON.stringify(subtitle);
  const re = new RegExp(
    `("returns"\\s*:\\s*\\{\\s*"title"\\s*:\\s*${titleEncoded}\\s*,\\s*"description"\\s*:\\s*)${oldEncoded}`,
  );
  if (!re.test(raw)) {
    throw new Error("Could not locate routes.returns description");
  }
  return raw.replace(re, `$1${newEncoded}`);
}

for (const [locale, copy] of Object.entries(copies)) {
  const file = path.join(messagesDir, `${locale}.json`);
  const raw = fs.readFileSync(file, "utf8");
  const before = JSON.parse(raw);
  const beforeKeys = Object.keys(before);
  const nl = raw.includes("\r\n") ? "\r\n" : "\n";
  let next = replaceDescription(raw, copy.subtitle);
  if (Object.prototype.hasOwnProperty.call(before, "returnsBody")) {
    const replaced = replaceTopLevelKey(next, "returnsBody", copy.returnsBody, nl);
    if (!replaced) throw new Error(`${locale}: returnsBody key not found in text`);
    next = replaced;
  } else {
    next = appendTopLevelKey(next, "returnsBody", copy.returnsBody, nl);
  }
  const after = JSON.parse(next);
  for (const key of beforeKeys) {
    if (!Object.prototype.hasOwnProperty.call(after, key)) {
      throw new Error(`${locale}: dropped key ${key}`);
    }
  }
  if (after.routes.returns.description !== copy.subtitle) {
    throw new Error(`${locale}: description was not updated`);
  }
  if (after.returnsBody.damaged.items.length !== 3) {
    throw new Error(`${locale}: damaged list length`);
  }
  if (after.returnsBody.ineligible.items.length !== 4) {
    throw new Error(`${locale}: ineligible list length`);
  }
  if (!after.returnsBody.noReturn.body.includes("24") && !after.returnsBody.damaged.items[0].includes("24")) {
    throw new Error(`${locale}: missing 24 hours`);
  }
  fs.writeFileSync(file, next);
  console.log(`updated ${locale}.json`);
}
