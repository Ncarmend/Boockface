//import register from "./users/register.mjs";
console.log('hello register')
// Define a function for creating a new user
const register = async (request, response) => {
    const { email, password, passwordreset } = request.body;


    let errors = [];
    console.log(' email :' + email + ' pass:' + password);
    if (!email || !password || !passwordreset) {
        errors.push({ msg: "Please fill in all fields" })
    }
    //check if match
    if (password !== passwordreset) {
        errors.push({ msg: "Passwords dont match" });
    }

    //check if password is more than 6 characters
    if (password.length < 6) {
        errors.push({ msg: 'Password atleast 6 characters' })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            email: email,
            password: password,
            passwordreset: passwordreset
        })
    } else {
        //validation passed
        User.findOne({ email: email }).exec((err, user) => {
            console.log(user);
            if (user) {
                errors.push({ msg: 'Email already registered' });
                res.render('register', { errors, email, password, password2 })
            } else {
                const newUser = new User({

                    email: email,
                    password: password
                });

                //hash password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt,
                        (err, hash) => {
                            if (err) throw err;
                            //save pass to hash
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then((value) => {
                                    console.log(value)
                                    res.redirect('/login');
                                })
                                .catch(value => console.log(value));

                        }));
            }
        })
    }
};



// Hash the password using bcrypt
const hashedPassword = await bcrypt.hash(password, 10);
console.log("enregistrerle user")

// Write a SQL query to insert the new user into the database

client.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword],
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
);
/*const btregister = async(
    enregistrerOk = document.getElementsByName("btn btn-primary btn-block")
    if()
)*/

export default register;