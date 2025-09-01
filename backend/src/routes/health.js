import express from "express";
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Checks if the service is running
 * @access  Public
 */
router.get("/", (req, res) => {
  // Respond with a 200 OK status and a simple JSON body
  res.status(200).json({ status: "UP" });
});

export default router;