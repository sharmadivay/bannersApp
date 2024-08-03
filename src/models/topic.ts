import mongoose, { Schema, Document } from "mongoose";

interface ITopic extends Document {
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

const TopicSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cta: { type: String, default: "Learn More" },
  image: { type: String, required: true },
  background: { type: String, required: true },
});

const Topic =
  mongoose.models.Topic || mongoose.model<ITopic>("Topic", TopicSchema);
export default Topic;
