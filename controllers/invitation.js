const User = require("../models/User");
module.exports = {
    getInvite: async (req, res) => {
        const user = await User.findById(req.params.userId)
        console.log("getInvite", req.params.userId, user)
        user.invitations.push({from:req.user._id, message:`${req.user.firstName} ${req.user.lastName} ${req.user.email} would like to connect with you on Meet Me On The Track`})
        req.user.sentInvitations.push(user._id)
        user.save()
        req.user.save()
        res.redirect("/runners");
    },
  };
  