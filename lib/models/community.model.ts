import mongoose, { InferSchemaType } from "mongoose";

const communitySchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

type Community = InferSchemaType<typeof communitySchema>;

const Community = mongoose.models?.Community || mongoose.model<Community>('Community', communitySchema);

export default Community;