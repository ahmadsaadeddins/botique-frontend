const arabicNumbers = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const convertToArabic = (number) => {
  return String(number)
    .split("")
    .map((char) => arabicNumbers[Number(char)] || char)
    .join("");
};

export { convertToArabic, arabicNumbers };
