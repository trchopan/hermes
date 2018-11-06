export const profileParser = data => ({
  fullname: data.fullname || "",
  position: data.position || "user",
  avatar: data.avatar || "/images/bloody-smile.jpg"
});
