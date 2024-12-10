const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");
const Comment = require("../models/Comment");
const User = require("../models/User");
const invitation = require("./invitation");

module.exports = {
  getProfile: async (req, res) => {
    console.log("get profile user",req.user)
    try {
      res.render("profile.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getRunners: async (req, res) => {
    try {
      const runners = await User.find().lean();
      res.render("runners.ejs", { runners: runners, user: req.user});
    } catch (err) {
      console.log(err);
    }
   
  },
  getPost: async (req, res) => {
    try {
      const post = await Profile.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id })
        .sort({ createdAt: -1 })
        .lean();
      res.render("profile.ejs", {
        post: post,
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateProfile: async (req, res) => {
    console.log("Here", req.file);
    try {
      // Upload image to cloudinary
let result 
if(req.file){
  result = await cloudinary.uploader.upload(req.file.path)
}
  console.log(req.body)
        req.user.firstName = req.body.firstName
        req.user.lastName = req.body.lastName
        req.user.time100m = req.body.time100m
        req.user.time200m = req.body.time200m
        req.user.time400m =req.body.time400m
        req.user.time800m =req.body.time800m
        req.user.time1500m =req.body.time1500m
        req.user.time3000m =req.body.time3000m
        req.user.availability = req.body.availability
        req.user.workoutPreference = req.body.workoutPreference
        if(req.file){
          req.user.cloudinaryId = result.public_id
          req.user.image = result.secure_url
        }
        req.user.save()
     
      console.log("Profile has been updated!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Profile.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteInvitation: async (req, res) => {
    try {
      const userIdtoDelete = req.params.id
       const index = req.user.invitations.findIndex(invitation=>invitation.from.toString() === userIdtoDelete)
       req.user.invitations.splice(index, 1)
       req.user.save()
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
