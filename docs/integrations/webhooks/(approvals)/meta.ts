import { defineMeta } from "blume";

export default defineMeta({
  title: "Approvals",
  icon: "circle-check",
  order: 3,
  pages: ["post-approval-requested", "post-approval-approved", "campaign-approval-requested", "campaign-approval-approved"],
});
