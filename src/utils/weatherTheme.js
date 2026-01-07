export const weatherTheme = (type) => {
  switch (type) {
    case "Clear":
      return {
        bg: "linear-gradient(135deg, #00BCFF 0%, #51A2FF 50%, #615FFF 100%), #FFF",
        color: "#fff",
      };
    case "Clouds":
      return {
        bg: "linear-gradient(117deg, #99A1AF 0.07%, #6A7282 50%, #4A5565 99.93%)",
        color: "#fff",
      };
    case "Rain":
      return {
        bg: "linear-gradient(117deg, #45556C 0.07%, #314158 50%, #1D293D 99.93%)",
        color: "#fff",
      };
    case "Thunderstorm":
      return {
        bg: "linear-gradient(117deg, #312C85 0.07%, #59168B 50%, #0F172B 99.93%)",
        color: "#fff",
      };
    default:
      return {
        bg: "#000",
        color: "#fff",
      };
  }
}
