import { clerkClient } from "@clerk/express";

export const protect = async (req, res, next) => {
  try {
    if (!req.auth.userId) {
      return res.status(401).json({ error: "unauthorized accesss" });
    }
    next();
  } catch (error) {
    console.error("authorization error", error.message);
  }
};

export const adminAccess = async (req, res, next) => {
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === user.primaryEmailAddress.emailAddress;

    if (!isAdmin) {
      return res.status(401).json({ error: "unauthorized access" });
    }
    next();
  } catch (error) {
    console.error("admin authorization error", error.message);
  }
};
