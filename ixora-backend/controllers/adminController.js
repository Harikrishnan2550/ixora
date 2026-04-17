export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Sanitize inputs to remove invisible spaces or line breaks
    const safeInputUser = username ? username.trim() : "";
    const safeInputPass = password ? password.trim() : "";
    const safeEnvUser = process.env.ADMIN_USER ? process.env.ADMIN_USER.trim() : "";
    const safeEnvPass = process.env.ADMIN_PASS ? process.env.ADMIN_PASS.trim() : "";

    
    // 3. Compare the sanitized variables
    if (
      safeInputUser === safeEnvUser &&
      safeInputPass === safeEnvPass
    ) {
      return res.json({
        success: true,
        token: process.env.ADMIN_SECRET,
      });
    }

    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};