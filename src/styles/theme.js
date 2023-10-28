const colors = {
  mainDark: "#0027B0",
  main30: "#B3BEE7",
  yellow: "#F9CA24",
  mostLight: "#FAFAFA",
  gray900: "#101010", // sub color dark
  gray800: "#3D3D3D", // sub color dark2
  gray500: "#8F8F8F", // sub color light1
  gray300: "#C6C6C6", // sub color light2
  gray200: "#F0F0F0", // sub color light3
};

function FONT({ weight, size, lineHeight }) {
  return `
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: ${weight};
      font-size: ${size}rem;
      line-height: ${lineHeight}px;
      `;
}
function FONT_EN({ weight, size, lineHeight }) {
  return `
      font-family: 'Inter', sans-serif;
      font-weight: ${weight};
      font-size: ${size}rem;
      line-height: ${lineHeight}px;
      `;
}
const fonts = {
  // 10px = 1rem
  logo: FONT_EN({ weight: 700, size: 4, lineHeight: 48 }),
  heading1Bold: FONT({ weight: 700, size: 2.4, lineHeight: 35 }), // 24px
  heading2Bold: FONT({ weight: 700, size: 2, lineHeight: 29 }), // 20px
  heading2: FONT({ weight: 400, size: 2, lineHeight: 29 }), // 20px

  body1Bold: FONT({ weight: 700, size: 1.8, lineHeight: 26 }), // 18px
  body1: FONT({ weight: 400, size: 1.8, lineHeight: 26 }), // 18px
  body2Bold: FONT({ weight: 700, size: 1.6, lineHeight: 23 }), // 16px
  body2: FONT({ weight: 400, size: 1.6, lineHeight: 23 }), // 16px
  body3: FONT({ weight: 400, size: 1.3, lineHeight: 20 }), // 13px

  caption1: FONT({ weight: 400, size: 1.4, lineHeight: 20 }), // 14px
  caption2: FONT({ weight: 400, size: 1.2, lineHeight: 20 }), // 12px
};

const theme = {
  colors: colors,
  fonts: fonts,
};
export default theme;
