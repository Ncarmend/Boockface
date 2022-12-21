//import welcome from  "./views/welcome.ejs"
console.log('hello login')

app.get('/login', (req, res) => {
    res.render('../views/login.ejs')
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/homepage',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);

})