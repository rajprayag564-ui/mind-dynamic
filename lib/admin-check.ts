import { getFirestore } from "@/lib/firebase/admin";

export async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    const db = getFirestore();
    const userDoc = await db.collection("users").doc(uid).get();
    const user = userDoc.data();

    // Check if role is explicitly set to admin
    if (user?.role === "admin") {
      return true;
    }

    // Check if email is in admin email list
    const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
    if (user?.email && adminEmails.includes(user.email)) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("Error checking admin status:", err);
    return false;
  }
}
