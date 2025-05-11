import {User} from "../models/user.model.js";

export const user = async (req, res) => {
  try {
    const { firstname, lastname, email, imageUrl, clerkId } = req.body;

    const user = await User.findOne({ clerkId });

    if (!user) {
      await User.create({
        fullname: `${firstname} ${lastname}`,
        email: email,
        imageUrl: imageUrl,
        clerkId: clerkId,
      });
    }

    return res.status(200).json({ sucess: true });
  } catch (error) {
    console.error("user creation error",error.message)
  }
};
