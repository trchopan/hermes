export const defaultAvatar = "/images/bloody-smile.jpg";

export const profileParser = data => ({
  fullname: data.fullname || "",
  position: data.position || "",
  avatar: data.avatar || defaultAvatar
});

export const phoneCountries = {
  vn: { value: "+84", text: "🇻🇳 Việt Nam (+84)" }
};

export const authRoles = {
  admin: "admin",
  manager: "manager",
  worker: "worker"
};
