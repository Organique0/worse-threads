import mongoose, { InferSchemaType } from "mongoose";

const threadSchema = new mongoose.Schema({
    text: { type: 'string', required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: String
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thread'
    }]
});

type Thread = InferSchemaType<typeof threadSchema>;

const Thread = mongoose.models?.Thread || mongoose.model<Thread>('Thread', threadSchema);

export default Thread;