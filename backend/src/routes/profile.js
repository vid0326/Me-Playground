import express from "express";
import mongoose from "mongoose";
import Profile from "../models/profile.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * @route   POST /api/profile
 * @desc    Create or update the authenticated user's profile
 * @access  Private
 */
/**
 * @route   POST /api/profile
 * @desc    Create or update the main profile
 * @access  Private (Basic Auth)
 */
router.post("/", auth, async (req, res) => {
  try {
    // 1. Get the profile data directly from the request body.
    const profileData = req.body;

    // 2. Find the first profile and update it. The filter is now empty {}.
    //    `upsert: true` will create the profile if it doesn't exist yet.
    const profile = await Profile.findOneAndUpdate({}, profileData, {
      new: true,
      upsert: true,
      runValidators: true,
    });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   GET /api/profile/me
 * @desc    Get the currently authenticated user's profile
 * @access  Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.user.email }).populate("projects");

    if (!profile) {
      return res.status(404).json({ msg: "No profile found for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ✅ NEW: GET ALL PROFILES ROUTE
/**
 * @route   GET /api/profile
 * @desc    Get all profiles
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate('projects');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


/**
 * @route   GET /api/profile/:id
 * @desc    Get a profile by its ID (for public viewing)
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    const profile = await Profile.findById(req.params.id).populate("projects");

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ✅ NEW: UPDATE PROFILE ROUTE
/**
 * @route   PUT /api/profile/:id
 * @desc    Update a profile by its ID
 * @access  Private
 */
router.put("/:id", auth, async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// ✅ NEW: DELETE PROFILE ROUTE
/**
 * @route   DELETE /api/profile/:id
 * @desc    Delete a profile by its ID
 * @access  Private
 */
router.delete("/:id", auth, async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);

        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.json({ msg: 'Profile removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


export default router;