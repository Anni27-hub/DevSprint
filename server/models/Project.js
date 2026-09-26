import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // Optional for anonymous guest runs, required for logged-in users
    },
    title: {
      type: String,
      required: true
    },
    prompt: {
      type: String,
      required: true
    },
    artifacts: {
      prd: { type: Object },
      architecture: { type: Object },
      database: { type: Object },
      frontend: { type: Object }
    },
    modelUsed: {
      type: String,
      default: 'qwen2.5:1.5b'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Project', projectSchema);
