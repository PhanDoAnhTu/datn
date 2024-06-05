const { model, Schema } = require("mongoose");
const slugify = require("slugify");
const DOCUMENT_NAME = "topic";
const COLLECTION_NAME = "topics";

const topicSchema = new Schema(
  {
    topic_name: { type: String, required: true },
    topic_parent_id: { type: String, default: null },
    topic_image: { type: String, default: null },
    topic_description: String,
    topic_slug: String,
    isPublished: { type: Boolean, default: false, index: true, select: false },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);
topicSchema.pre("save", function (next) {
  this.topic_slug = slugify(this.topic_name, { lower: true });
  next();
});
topicSchema.index({ topic_name: "text" });

module.exports = model(DOCUMENT_NAME, topicSchema);
