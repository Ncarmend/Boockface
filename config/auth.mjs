const
    ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'please login to view this resource');
        //res.redirect('/users/login');
        res.redirect('/login')
    }
export default ensureAuthenticated
