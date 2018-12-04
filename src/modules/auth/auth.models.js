export const defaultAvatar = "/images/bloody-smile.jpg";

export const profileParser = data => ({
  fullname: data.fullname || "",
  position: data.position || "",
  avatar: data.avatar || defaultAvatar
});
