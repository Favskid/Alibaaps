// Size Recommendation Logic for Alibaaps

// Men's foot length (cm) → EU size mapping
const MENS_SIZE_TABLE = [
  { footLength: 24.5, eu: 39, us: 6.5 },
  { footLength: 25.1, eu: 40, us: 7 },
  { footLength: 25.4, eu: 40.5, us: 7.5 },
  { footLength: 25.7, eu: 41, us: 8 },
  { footLength: 26.0, eu: 42, us: 8.5 },
  { footLength: 26.7, eu: 42.5, us: 9 },
  { footLength: 27.0, eu: 43, us: 9.5 },
  { footLength: 27.3, eu: 44, us: 10 },
  { footLength: 27.9, eu: 44.5, us: 10.5 },
  { footLength: 28.3, eu: 45, us: 11 },
  { footLength: 28.6, eu: 46, us: 11.5 },
  { footLength: 29.2, eu: 46.5, us: 12 }
];

// Women's foot length (cm) → EU size mapping
const WOMENS_SIZE_TABLE = [
  { footLength: 22.5, eu: 36, us: 5.5 },
  { footLength: 23.0, eu: 36.5, us: 6 },
  { footLength: 23.5, eu: 37, us: 6.5 },
  { footLength: 23.8, eu: 37.5, us: 7 },
  { footLength: 24.1, eu: 38, us: 7.5 },
  { footLength: 24.6, eu: 38.5, us: 8 },
  { footLength: 25.1, eu: 39, us: 8.5 },
  { footLength: 25.4, eu: 39.5, us: 9 },
  { footLength: 25.7, eu: 40, us: 9.5 },
  { footLength: 26.0, eu: 40.5, us: 10 },
  { footLength: 26.7, eu: 41, us: 10.5 }
];

/**
 * Recommend a shoe size based on body measurements
 * @param {string} gender - "male" or "female"
 * @param {number} footLength - foot length in cm
 * @param {string} footWidth - "narrow", "medium", or "wide"
 * @returns {object} - { euSize, usSize, widthNote, recommendation }
 */
window.recommendSize = function(gender, footLength, footWidth) {
  const table = gender === 'female' ? WOMENS_SIZE_TABLE : MENS_SIZE_TABLE;
  const fl = parseFloat(footLength);

  if (isNaN(fl) || fl <= 0) {
    return { error: "Please enter a valid foot length." };
  }

  // Find the closest match — look for the entry where foot length is >= and closest
  let match = table[0];
  for (let i = 0; i < table.length; i++) {
    if (fl >= table[i].footLength) {
      match = table[i];
    } else {
      break;
    }
  }

  // Check if we're between two entries — round up if closer to next
  const idx = table.indexOf(match);
  if (idx < table.length - 1) {
    const next = table[idx + 1];
    const midpoint = (match.footLength + next.footLength) / 2;
    if (fl >= midpoint) {
      match = next;
    }
  }

  let widthNote = "";
  let widthAdjust = 0;

  if (footWidth === "narrow") {
    widthNote = "Your foot is narrow — you may find the standard width comfortable, or consider going half a size down for a snugger fit.";
    widthAdjust = -0.5;
  } else if (footWidth === "wide") {
    widthNote = "Your foot is wide — we recommend going half a size up to ensure a comfortable fit without pinching.";
    widthAdjust = 0.5;
  } else {
    widthNote = "Your foot width is standard — the recommended size should fit well right away.";
  }

  const finalEU = match.eu + (widthAdjust !== 0 ? widthAdjust : 0);
  const finalUS = match.us + widthAdjust;

  const recommendation = `We recommend EU ${finalEU} (US ${finalUS > 0 ? finalUS : match.us}). ${widthNote}`;

  return {
    euSize: finalEU,
    usSize: finalUS > 0 ? finalUS : match.us,
    widthNote,
    recommendation
  };
};
