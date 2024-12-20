const { model, Schema } = require("mongoose");
const slugify = require("slugify");
const DOCUMENT_NAME = "post";
const COLLECTION_NAME = "posts";

const postSchema = new Schema(
  {
    post_name: { type: String, required: true },
    topic_id: { type: String, require: true },
    post_short_description: String,
    post_image: { type: String },
    post_slug: String,
    post_title: String,
    post_content: String,
    isPublished: { type: Boolean, default: false, index: true },
    isDeleted: { type: Boolean, default: false, index: true },
    isDraft: { type: Boolean, default: true, index: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
postSchema.pre("save", function (next) {
  this.post_slug = slugify(this.post_name, { lower: true });
  next();
});
postSchema.index({ post_name: "text" });

module.exports = model(DOCUMENT_NAME, postSchema);
