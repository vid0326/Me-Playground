import express from "express";
import Project from "../models/project.js"; // We use the Project model to analyze skills

const router = express.Router();

/**
 * @route   GET /api/skills/top
 * @desc    Get the most frequently used skills across all projects
 * @access  Public
 */
router.get("/top", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10; // Default to the top 10 skills

    // Use a MongoDB Aggregation Pipeline to find and count the top skills
    const topSkills = await Project.aggregate([
      // Stage 1: Deconstruct the skills array from each project
      { $unwind: "$skills" },
      // Stage 2: Group documents by the skill name and count each occurrence
      { $group: { _id: "$skills", count: { $sum: 1 } } },
      // Stage 3: Sort the skills by count in descending order
      { $sort: { count: -1 } },
      // Stage 4: Limit the result to the specified number
      { $limit: limit },
      // Stage 5: Reshape the output for a cleaner API response
      { $project: { _id: 0, skill: "$_id", count: 1 } }
    ]);

    res.json(topSkills);
  } catch (err) {
    console.error("Error in GET /api/skills/top:", err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET /api/skills/search
 * @desc    Search for unique skill names (useful for autocomplete)
 * @access  Public
 */
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "A search query 'q' is required." });
    }

    // This pipeline finds all unique skills that match the search query
    const matchedSkills = await Project.aggregate([
      { $unwind: "$skills" },
      { $group: { _id: "$skills" } }, // Creates a list of all unique skills
      { $match: { _id: { $regex: q, $options: "i" } } }, // Filters the list based on the query
      { $limit: 10 }, // Returns a maximum of 10 suggestions
      { $project: { _id: 0, name: "$_id" } }
    ]);
    
    // Return a simple array of skill names, e.g., ["React", "Node.js"]
    res.json(matchedSkills.map(s => s.name));
  } catch (err) {
    console.error("Error in GET /api/skills/search:", err.message);
    res.status(500).send("Server Error");
  }
});

export default router;