const createError = require('http-errors');
const admins = ["tova@shal3v.com","i@shal3v.com"]

module.exports = async function(req, res, next) {
    try {
        if (req.user) {
            if(admins.includes(req.user.email))
                res.locals.isAdmin = true;
            else
                res.locals.isAdmin = false;
            return next();
        }
        else{
            res.locals.isAdmin = false;
            return next();
        }
    } catch (error) {
        return next(error);    
    }
}
