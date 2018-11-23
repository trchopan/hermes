export const profileParser = data => ({
  fullname: data.fullname || "",
  position: data.position || "",
  avatar: data.avatar || "/images/bloody-smile.jpg"
});
