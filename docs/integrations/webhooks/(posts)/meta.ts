import { defineMeta } from "blume";

export default defineMeta({
  title: "Posts",
  icon: "file-text",
  order: 2,
  pages: ["post-created", "post-scheduled", "post-rescheduled", "post-unscheduled", "post-published", "post-publish-failed", "post-archived", "post-permanently-deleted", "post-content-edited", "post-comment-created", "post-inline-comment-created"],
});
