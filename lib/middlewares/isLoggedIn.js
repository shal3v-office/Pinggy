module.exports = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.render("sessions/new" ,{ title: "login" ,user:null});
}