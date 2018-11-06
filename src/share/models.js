export const themes = {
  light: "Light",
  dark: "Dark"
};

export const languages = {
  vi: { code: "vi", name: "Tiếng Việt", char: "🇻🇳" },
  en: { code: "en", name: "English", char: "🇬🇧" }
};

export const profileParser = data => ({
  fullname: data.fullname || "",
  position: data.position || "user",
  avatar: data.avatar || "/images/bloody-smile.jpg"
});
