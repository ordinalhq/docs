import { defineMeta } from "blume";

export default defineMeta({
  title: "Social Profile",
  icon: "circle-user",
  order: 1,
  pages: ["social-profile-connected", "social-profile-disconnected", "social-profile-reconnect-needed"],
});
