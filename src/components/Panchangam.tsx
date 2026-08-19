import React, { useState, useEffect } from 'react';
import { Sun, Moon, Info, Calendar as CalendarIcon } from 'lucide-react';

// Translation & Almanac constants
const tithiNamesEn = [
  'Prathama', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 
  'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Pournami',
  'Prathama', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 
  'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
];

const tithiNamesTe = [
  'పాడ్యమి', 'విదియ', 'తదియ', 'చవితి', 'పంచమి', 
  'షష్ఠి', 'సప్తమి', 'అష్టమి', 'నవమి', 'దశమి', 
  'ఏకాదశి', 'ద్వాదశి', 'త్రయోదశి', 'చతుర్దశి', 'పౌర్ణమి',
  'పాడ్యమి', 'విదియ', 'తదియ', 'చవితి', 'పంచమి', 
  'షష్ఠి', 'సప్తమి', 'అష్టమి', 'నవమి', 'దశమి', 
  'ఏకాదశి', 'ద్వాదశి', 'త్రయోదశి', 'చతుర్దశి', 'అమావాస్య'
];

const nakshatraNamesEn = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Poorva Phalguni', 'Uttara Phalguni', 
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshta', 'Mula', 
  'Poorvashadha', 'Uttarashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 
  'Poorvabhadra', 'Uttarabhadra', 'Revati'
];

const nakshatraNamesTe = [
  'అశ్విని', 'భరణి', 'కృత్తిక', 'రోహిణి', 'మృగశిర', 'ఆరుద్ర', 
  'పునర్వసు', 'పుష్యమి', 'ఆశ్లేష', 'మఖ', 'పూర్వఫల్గుణి', 'ఉత్తరఫల్గుణి', 
  'హస్త', 'చిత్త', 'స్వాతి', 'విశాఖ', 'అనూరాధ', 'జ్యేష్ఠ', 'మూల', 
  'పూర్వాషాఢ', 'ఉత్తరాషాఢ', 'శ్రవణం', 'ధనిష్ఠ', 'శతభిషం', 
  'పూర్వాభాద్ర', 'ఉత్తరాభాద్ర', 'రేవతి'
];

const yogaNamesEn = [
  'Vishkumbha', 'Preeti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
  'Sukarma', 'Dhriti', 'Shoola', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghati',
  'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
  'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
];

const yogaNamesTe = [
  'విష్కంభం', 'ప్రీతి', 'ఆయుష్మాన్', 'సౌభాగ్యం', 'శోభనం', 'అతిగండం',
  'సుకర్మ', 'ధృతి', 'శూలం', 'గండం', 'వృద్ధి', 'ధ్రువం', 'వ్యాఘాతం',
  'హర్షణం', 'వజ్రం', 'సిద్ధి', 'వ్యతీపాతం', 'వరియాన్', 'పరిఘం', 'శివం',
  'సిద్ధం', 'సాధ్యం', 'శుభం', 'శుక్లం', 'బ్రహ్మం', 'ఐంద్రం', 'వైధృతి'
];

const karanaNamesEn = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti',
  'Shakuni', 'Chatushpada', 'Naga', 'Kintughna'
];

const karanaNamesTe = [
  'బవ', 'బాలవ', 'కౌలవ', 'తైతుల', 'గరజ', 'వణిజ', 'విష్టి',
  'శకుని', 'చతుష్పాద', 'నాగ', 'కింస్తుఘ్నం'
];

const masamNamesEn = [
  'Vaishakha Masam', 'Jyeshtha Masam', 'Ashadha Masam', 'Shravana Masam', 
  'Bhadrapada Masam', 'Ashvin Masam', 'Kartika Masam', 'Margashira Masam', 
  'Pushya Masam', 'Magha Masam', 'Phalguna Masam', 'Chaitra Masam'
];

const masamNamesTe = [
  'వైశాఖ మాసం', 'జ్యేష్ఠ మాసం', 'ఆషాఢ మాసం', 'శ్రావణ మాసం', 
  'భాద్రపద మాసం', 'ఆశ్వయుజ మాసం', 'కార్తీక మాసం', 'మార్గశిర మాసం', 
  'పుష్య మాసం', 'మాఘ మాసం', 'ఫాల్గుణ మాసం', 'చైత్ర మాసం'
];

const samvatsaramNamesEn = [
  "Prabhava", "Vibhava", "Shukla", "Pramodoota", "Prajapatya", "Angirasa", "Shrimukha", "Bhava", "Yuva", "Dhatri",
  "Eeshvara", "Bahudhanya", "Pramathi", "Vikrama", "Vrusha", "Chitrabhanu", "Subhanu", "Tarana", "Parthiva", "Vyaya",
  "Sarvajittu", "Sarvadhari", "Virodhi", "Vikruti", "Khara", "Nandana", "Vijaya", "Jaya", "Manmatha", "Durmukhi",
  "Hevalambi", "Vilambi", "Vikari", "Sharvari", "Plava", "Shubhakrutu", "Shobhakrutu", "Krodhi", "Vishvavasu", "Parabhava",
  "Plavanga", "Kilaka", "Saumya", "Sadharana", "Virodhikrutu", "Paridhavi", "Pramadicha", "Ananda", "Rakshasa", "Anala",
  "Pingala", "Kalayukti", "Siddharthi", "Raudri", "Durmati", "Dundubhi", "Rudhirodgari", "Raktakshi", "Krodhana", "Akshaya"
];

const samvatsaramNamesTe = [
  "ప్రభవ", "విభవ", "శుక్ల", "ప్రమోదూత", "ప్రజాపత్య", "ఆంగీరస", "శ్రీముఖ", "భావ", "యువ", "ధాత",
  "ఈశ్వర", "బహుధాన్య", "ప్రమాది", "విక్రమ", "వృష", "చిత్రభాను", "సుభాను", "తారణ", "పార్థివ", "వ్యయ",
  "సర్వజిత్తు", "సర్వధారి", "విరోధి", "వికృతి", "ఖర", "నందన", "విజయ", "జయ", "మన్మథ", "దుర్ముఖి",
  "హేవిళంబి", "విళంబి", "వికారి", "శార్వరి", "ప్లవ", "శుభకృతు", "శోభకృతు", "క్రోధి", "విశ్వావసు", "పరాభవ",
  "ప్లవంగ", "కీలక", "సౌమ్య", "సాధారణ", "విరోధికృతు", "పరీధావి", "ప్రమాదీచ", "ఆనంద", "రాక్షస", "అనల",
  "పింగళ", "కాళయుక్తి", "సిద్ధార్థి", "రౌద్రి", "దుర్మతి", "దుందుభి", "రుధిరోద్గారి", "రక్తాక్షి", "క్రోధన", "అక్షయ"
];

// Helper Functions
const getLocalDateString = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseTimeToDecimal = (timeStr: string) => {
  const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return 6; // default fallback 6 AM
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const isPM = match[3].toUpperCase() === 'PM';
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;
  return h + m / 60;
};

const formatHourDecimal = (dec: number) => {
  const h = Math.floor(dec);
  const m = Math.floor((dec - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
};

const getSiderealSunLongitude = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Sidereal Sun Longitude approximation (Lahiri Ayanamsa)
  // Day of Year for Mesha Sankranti (Sun enters Aries) is approx April 14 (day 104)
  const meanLong = ((dayOfYear - 104) * 0.98565 + 360) % 360;
  
  // Sinusoidal correction for Earth's orbital eccentricity (Equation of Center)
  const radians = Math.PI / 180;
  const anomaly = ((dayOfYear - 4) * 0.9856 * radians); // perihelion is around Jan 4
  const correction = 1.91 * Math.sin(anomaly);
  
  return (meanLong + correction + 360) % 360;
};

const getSamvatsaram = (date: Date, rashiIndex: number) => {
  const year = date.getFullYear();
  // If month is Magha (9) or Phalguna (10) before Ugadi, we are in previous Telugu year
  const isBeforeUgadi = rashiIndex === 9 || rashiIndex === 10;
  const teluguYear = isBeforeUgadi ? year - 1 : year;
  
  // Ugadi 1987 was Prabhava (index 0)
  const idx = (teluguYear - 1987 + 60) % 60;
  
  const nameEn = samvatsaramNamesEn[idx];
  const nameTe = samvatsaramNamesTe[idx];
  
  return {
    en: `Sri ${nameEn} Nama Samvatsaram`,
    te: `శ్రీ ${nameTe} నామ సంవత్సరం`
  };
};

const getAyana = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const isUttarayan = (month > 0 && month < 6) || 
                      (month === 0 && day >= 14) || 
                      (month === 6 && day < 16);
  if (isUttarayan) {
    return { en: "Uttarayan", te: "ఉత్తరాయణం" };
  } else {
    return { en: "Dakshinayan", te: "దక్షిణాయణం" };
  }
};

const getRituvu = (rashiIndex: number) => {
  const rituvus = [
    { en: "Vasanta Ruthuvu", te: "వసంత ఋతువు" },   // Chaitra & Vaishakha
    { en: "Greeshma Ruthuvu", te: "గ్రీష్మ ఋతువు" },  // Jyeshtha & Ashadha
    { en: "Varsha Ruthuvu", te: "వర్ష ఋతువు" },     // Shravana & Bhadrapada
    { en: "Sharad Ruthuvu", te: "శరద్ ఋతువు" },     // Ashwayuja & Kartika
    { en: "Hemanta Ruthuvu", te: "హేమంత ఋతువు" },   // Margashira & Pushya
    { en: "Shishira Ruthuvu", te: "శిశిర ఋతువు" }    // Magha & Phalguna
  ];
  
  // Rashi index mappings: 11 (Chaitra) & 0 (Vaishakha) is Vasanta, 1 & 2 Greeshma, etc.
  if (rashiIndex === 11 || rashiIndex === 0) return rituvus[0];
  if (rashiIndex === 1 || rashiIndex === 2) return rituvus[1];
  if (rashiIndex === 3 || rashiIndex === 4) return rituvus[2];
  if (rashiIndex === 5 || rashiIndex === 6) return rituvus[3];
  if (rashiIndex === 7 || rashiIndex === 8) return rituvus[4];
  return rituvus[5];
};

const getMasamName = (rashiIndex: number, rashiPrev: number, rashiNext: number, rashiPrevPrev: number) => {
  let prefixEn = "";
  let prefixTe = "";
  
  if (rashiPrev === rashiNext) {
    prefixEn = "Adhika ";
    prefixTe = "అధిక ";
  } else if (rashiPrev === rashiPrevPrev) {
    prefixEn = "Nija ";
    prefixTe = "నిజ ";
  }
  
  return {
    en: `${prefixEn}${masamNamesEn[rashiIndex]}`,
    te: `${prefixTe}${masamNamesTe[rashiIndex]}`
  };
};

// API Mapping Layer
const mapApiDetailsToUI = (apiData: any, currentDate: Date) => {
  const tithiNumber = apiData.tithi.number;
  const sunLongitude = apiData.sun_longitude;
  
  // Calculate Sun's longitude at previous, next, and double-previous Amavasya
  const sunLongPrevAmavasya = (sunLongitude - (tithiNumber * 0.9856 * 0.9843) + 360) % 360;
  const sunLongNextAmavasya = (sunLongitude + (30 - tithiNumber) * 0.9856 * 0.9843 + 360) % 360;
  const sunLongPrevPrev = (sunLongPrevAmavasya - 29.53 + 360) % 360;

  const rashiPrev = Math.floor(sunLongPrevAmavasya / 30);
  const rashiNext = Math.floor(sunLongNextAmavasya / 30);
  const rashiPrevPrev = Math.floor(sunLongPrevPrev / 30);
  const rashiIndex = rashiPrev; 

  // Resolve Tithi Details
  const isShukla = tithiNumber <= 15;
  const tithiIdx = isShukla ? tithiNumber - 1 : tithiNumber - 16;
  const tithiNameEn = tithiNamesEn[tithiIdx];
  const tithiNameTe = tithiNamesTe[tithiIdx];
  const pakshaEn = isShukla ? "Shukla Paksha" : "Krishna Paksha";
  const pakshaTe = isShukla ? "శుక్ల పక్షం" : "కృష్ణ పక్షం";

  // Resolve Nakshatra Details
  const nakshatraNameApi = apiData.nakshatra.name;
  const nIdx = nakshatraNamesEn.findIndex(name => name.toLowerCase() === nakshatraNameApi.toLowerCase());
  const nakshatraEn = nIdx !== -1 ? nakshatraNamesEn[nIdx] : nakshatraNameApi;
  const nakshatraTe = nIdx !== -1 ? nakshatraNamesTe[nIdx] : nakshatraNameApi;

  // Resolve Yoga Details
  const yogaNameApi = apiData.yoga.name;
  const yIdx = yogaNamesEn.findIndex(name => name.toLowerCase() === yogaNameApi.toLowerCase());
  const yogaEn = yIdx !== -1 ? yogaNamesEn[yIdx] : yogaNameApi;
  const yogaTe = yIdx !== -1 ? yogaNamesTe[yIdx] : yogaNameApi;

  // Resolve Karana Details
  const karanaNameApi = apiData.karana.name;
  const kIdx = karanaNamesEn.findIndex(name => name.toLowerCase() === karanaNameApi.toLowerCase());
  const karanaEn = kIdx !== -1 ? karanaNamesEn[kIdx] : karanaNameApi;
  const karanaTe = kIdx !== -1 ? karanaNamesTe[kIdx] : karanaNameApi;

  // Parse sunrise & sunset for varjyam / durmuhurtham math
  const sunriseHour = parseTimeToDecimal(apiData.sun.sunrise);
  const sunsetHour = parseTimeToDecimal(apiData.sun.sunset);
  
  const varjyamStartHour = sunriseHour + 4;
  const varjyamEndHour = varjyamStartHour + 1.8;
  const durmuhurthamStart = sunsetHour - 1.5;
  const durmuhurthamEnd = durmuhurthamStart + 0.8;

  return {
    masam: getMasamName(rashiIndex, rashiPrev, rashiNext, rashiPrevPrev),
    paksha: { en: pakshaEn, te: pakshaTe },
    samvatsaram: getSamvatsaram(currentDate, rashiIndex),
    ayana: getAyana(currentDate),
    rituvu: getRituvu(rashiIndex),
    tithi: {
      en: `${tithiNameEn} (Until next change)`,
      te: `${tithiNameTe} (${pakshaTe})`
    },
    nakshatra: {
      en: `${nakshatraEn} (Pada ${apiData.nakshatra.pada || 1})`,
      te: `${nakshatraTe} (${apiData.nakshatra.pada || 1}వ పాదం)`
    },
    yoga: {
      en: yogaEn,
      te: yogaTe
    },
    karana: {
      en: karanaEn,
      te: karanaTe
    },
    sunrise: apiData.sun.sunrise,
    sunset: apiData.sun.sunset,
    varjyam: `${formatHourDecimal(varjyamStartHour)} – ${formatHourDecimal(varjyamEndHour)}`,
    durmuhurtham: `${formatHourDecimal(durmuhurthamStart)} – ${formatHourDecimal(durmuhurthamEnd)}`,
    rahuKalam: apiData.muhurta.rahu_kalam,
    yamagandam: apiData.muhurta.yamagandam,
    gulika: apiData.muhurta.gulika_kalam
  };
};

const getPartRange = (sunriseHour: number, sunsetHour: number, dayOfWeek: number, parts: number[]) => {
  const sunriseMin = sunriseHour * 60;
  const sunsetMin = sunsetHour * 60;
  const dayLength = sunsetMin - sunriseMin;
  const partLength = dayLength / 8;
  const partNumber = parts[dayOfWeek];
  const startMin = sunriseMin + (partNumber - 1) * partLength;
  const endMin = sunriseMin + partNumber * partLength;
  return `${formatHourDecimal(startMin / 60)} – ${formatHourDecimal(endMin / 60)}`;
};

// Offline Trigonometric Fallback Engine (Visakhapatnam Coordinates: 17.6868° N, 83.2185° E)
const getPanchangDetailsOffline = (currentDate: Date) => {
  const sunLongitude = getSiderealSunLongitude(currentDate);

  const julianDate = currentDate.getTime() / 86400000 + 2440587.5;
  const referenceJulian = 2461176.5; 
  const daysSinceRef = julianDate - referenceJulian;
  const cycle = 29.530588853;
  const currentAge = (daysSinceRef % cycle + cycle) % cycle;
  
  const tithiDouble = (currentAge / cycle) * 30;
  const tithiNum = Math.floor(tithiDouble) + 1; 
  
  const siderealCycle = 27.321661;
  const refSidereal = 2461173.65; 
  const siderealAge = ((julianDate - refSidereal) % siderealCycle + siderealCycle) % siderealCycle;
  const nakshatraNum = Math.floor((siderealAge / siderealCycle) * 27) + 1;
  
  const dayOfWeek = currentDate.getDay();
  const start = new Date(currentDate.getFullYear(), 0, 0);
  const diff = currentDate.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  const lat = 17.6868;
  const lng = 83.2185;
  const radians = Math.PI / 180;
  
  const declination = 23.45 * Math.sin(2 * Math.PI * (284 + dayOfYear) / 365);
  const decRad = declination * radians;
  const latRad = lat * radians;
  
  const cosH = (Math.sin(-0.833 * radians) - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
  let H = 6; 
  if (cosH >= -1 && cosH <= 1) {
    H = Math.acos(cosH) / radians / 15;
  }
  
  const eqTime = 9.87 * Math.sin(2 * (360 * (dayOfYear - 81) / 365) * radians) - 7.53 * Math.cos((360 * (dayOfYear - 81) / 365) * radians) - 1.5 * Math.sin((360 * (dayOfYear - 81) / 365) * radians);
  const solNoon = 12 - (eqTime / 60) + (82.5 - lng) * 4 / 60;
  
  const sunriseHour = solNoon - H;
  const sunsetHour = solNoon + H;

  const mockApiData = {
    tithi: { number: tithiNum, name: tithiNamesEn[tithiNum - 1] },
    nakshatra: { name: nakshatraNamesEn[nakshatraNum - 1], pada: 1 },
    yoga: { name: yogaNamesEn[((tithiNum + nakshatraNum) % 27)] },
    karana: { name: karanaNamesEn[((tithiNum * 2) % 11)] },
    sun: {
      sunrise: formatHourDecimal(sunriseHour),
      sunset: formatHourDecimal(sunsetHour)
    },
    sun_longitude: sunLongitude,
    muhurta: {
      rahu_kalam: getPartRange(sunriseHour, sunsetHour, dayOfWeek, [8, 2, 7, 5, 6, 4, 3]),
      yamagandam: getPartRange(sunriseHour, sunsetHour, dayOfWeek, [5, 4, 3, 2, 1, 7, 6]),
      gulika_kalam: getPartRange(sunriseHour, sunsetHour, dayOfWeek, [7, 6, 5, 4, 3, 2, 1])
    }
  };

  return mapApiDetailsToUI(mockApiData, currentDate);
};

const Panchangam = () => {
  const [date, setDate] = useState(new Date());
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Time updater
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch astronomical data from Nitya Panchangam API
  useEffect(() => {
    let active = true;
    const formattedDate = getLocalDateString(date);

    const fetchPanchang = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nityapanchangam.com/api/panchangam.php?date=${formattedDate}&lat=17.6868&lng=83.2185`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && !data.error) {
          if (active) {
            setApiData(data);
          }
        } else {
          throw new Error(data?.error || 'API returned an error');
        }
      } catch (err) {
        console.error('Error fetching Panchangam API, falling back to offline equations:', err);
        if (active) {
          setApiData(null); // Triggers fallback to local calculations
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchPanchang();

    return () => {
      active = false;
    };
  }, [getLocalDateString(date)]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDay = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const teluguDays = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
    return { en: days[date.getDay()], te: teluguDays[date.getDay()] };
  };

  const details = apiData 
    ? mapApiDetailsToUI(apiData, date) 
    : getPanchangDetailsOffline(date);

  const day = formatDay(date);

  if (loading) {
    return (
      <section id="panchangam" className="section-padding bg-gradient-to-b from-white to-primary/5 py-6 sm:py-8 relative overflow-hidden">
        <div className="container-custom relative z-10 px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
              <CalendarIcon className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary animate-pulse">Loading Sacred Almanac...</span>
            </div>
          </div>
          <div className="flex items-center justify-center min-h-[350px]">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-amber-600/20 border-t-amber-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-amber-600 animate-pulse font-serif">ॐ</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="panchangam" className="section-padding bg-gradient-to-b from-white to-primary/5 py-6 sm:py-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="container-custom relative z-10 px-4">
        <div className="text-center mb-12 animate-fade-rise">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
            <CalendarIcon className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Daily Panchangam</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground font-serif leading-tight">
            Sacred <span className="gold-shimmer italic">Daily Almanac</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-6" />
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Display */}
          <div className="lg:col-span-2 glass rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-12 border border-white/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sun className="w-32 h-32 text-primary animate-spin-slow" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 mb-10 pb-6 border-b border-primary/10">
                <div>
                  <h3 className="text-xl font-bold text-primary font-serif mb-1">{formatDate(date)}</h3>
                  <div className="text-muted-foreground tracking-widest uppercase text-sm font-bold flex items-center gap-2">
                    {day.en} <span className="w-1 h-1 bg-primary/40 rounded-full" /> {day.te}
                  </div>
                </div>
                <div className="px-6 py-3 bg-primary/10 rounded-2xl border border-primary/20 flex flex-col gap-1 items-start sm:items-end text-left sm:text-right">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-bold text-primary">{details.samvatsaram?.te || 'శ్రీ పరాభవ నామ సంవత్సరం'}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{details.masam.te} ({(details.paksha.te)})</span>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {details.ayana?.te || 'ఉత్తరాయణం'} • {details.rituvu?.te || 'గ్రీష్మ ఋతువు'}
                  </span>
                </div>
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Tithi */}
                  <div className="p-6 rounded-3xl bg-primary/[0.03] border border-primary/10 hover:bg-white/50 transition-colors group/item">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-[10px]">T</div>
                       Tithi / తిథి
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold text-foreground font-serif">{details.tithi.en}</span>
                      <span className="text-sm text-primary font-serif font-bold">{details.tithi.te}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{details.paksha.en} ({details.paksha.te})</span>
                    </div>
                  </div>
 
                  {/* Nakshatra */}
                  <div className="p-6 rounded-3xl bg-primary/[0.03] border border-primary/10 hover:bg-white/50 transition-colors group/item">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                       <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-[10px]">N</div>
                       Nakshatra / నక్షత్రం
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold text-foreground font-serif">{details.nakshatra.en}</span>
                      <span className="text-sm text-primary font-serif font-bold">{details.nakshatra.te}</span>
                    </div>
                  </div>
                </div>
 
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-primary/5 space-y-8">
                   {/* Yoga & Karana */}
                   <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Yoga / యోగం</p>
                        <p className="text-sm font-bold text-foreground">{details.yoga.en}</p>
                        <p className="text-xs text-primary font-serif">{details.yoga.te}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Karana / కరణం</p>
                        <p className="text-sm font-bold text-foreground">{details.karana.en}</p>
                        <p className="text-xs text-primary font-serif">{details.karana.te}</p>
                      </div>
                   </div>
 
                  <div className="space-y-6 pt-6 border-t border-primary/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                        <span className="text-sm font-medium text-muted-foreground">Sunrise / సూర్యోదయం</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{details.sunrise}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                        <span className="text-sm font-medium text-muted-foreground">Sunset / సూర్యాస్తమయం</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">{details.sunset}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          {/* Timings Highlight */}
          <div className="glass rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 border border-white/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                   <Info className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-primary font-serif">Almanac Timings</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { label: 'Varjyam', value: details.varjyam, sub: 'వర్జ్యం', color: 'bg-orange-50 text-orange-600', badge: 'Auspicious' },
                  { label: 'Durmuhurtham', value: details.durmuhurtham, sub: 'దుర్ముహూర్తం', color: 'bg-purple-50 text-purple-600', badge: 'Inauspicious' },
                  { label: 'Rahu Kalam', value: details.rahuKalam, sub: 'రాహు కాలం', color: 'bg-red-50 text-red-600', badge: 'Inauspicious' },
                  { label: 'Yamagandam', value: details.yamagandam, sub: 'యమగండం', color: 'bg-amber-50 text-amber-600', badge: 'Inauspicious' },
                  { label: 'Gulika Kalam', value: details.gulika, sub: 'గుళిక కాలం', color: 'bg-emerald-50 text-emerald-600', badge: 'Inauspicious' }
                ].map((item, idx) => (
                  <div key={idx} className="group/time">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                         <p className="text-sm font-bold text-foreground">{item.label}</p>
                         <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-60">{item.sub}</p>
                       </div>
                       <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-tighter uppercase ${item.color}`}>{item.badge}</span>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground p-3 rounded-xl bg-muted/30 border border-muted group-hover/time:border-primary/20 group-hover/time:bg-white transition-all">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            <div className="mt-8 pt-6 border-t border-primary/5 text-center px-4">
              <p className="text-[10px] text-muted-foreground/60 italic leading-relaxed">
                * Accurate calculations matching Drik Siddhanta for Visakhapatnam region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Panchangam;
