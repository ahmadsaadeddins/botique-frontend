const arabicNumbers = ["۰", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const convertToArabic = (number) => {
  let str = String(number);
  if (str.endsWith("00")) {
    return str
      .substring(0, str.length - 3)
      .split("")
      .map((char) => arabicNumbers[Number(char)] || char)
      .join("");
  } else {
    return str
      .split("")
      .map((char) => arabicNumbers[Number(char)] || char)
      .join("");
  }
};

export { convertToArabic, arabicNumbers };
