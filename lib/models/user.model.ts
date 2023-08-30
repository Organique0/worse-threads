import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
    onBoarded: { type: Boolean, default: false },
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
});

type User = InferSchemaType<typeof userSchema>;

const User = mongoose.models?.User || mongoose.model<User>('User', userSchema);

export default User;