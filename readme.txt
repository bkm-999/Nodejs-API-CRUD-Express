# Http request without Express framework/module/package

const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello Fox');
        res.end();
    }
    if (req.url === '/api/users'){
        res.write(JSON.stringify([1,2,3,4]));
        res.end();
    }
});

######################################################################

# Usig Current App without DB, just useing Endpoint
# Using backticks for assign Dynamic Value `${variable}`
# Assign especefic PORT(variable) number in MAC OS ==> export PORT=4000
#                          in Windows OS ==> set PORT=5000
# Install npm install -g nodemon 
# Query string parameters ==> "?sortBy=name" e.g http://localhost:7000/api/posts/2020/Aug?sortBy=name
# The result of req.params.id is always string, can also change it to intiger by using parseInt(req.params.id);
# The return/output of the "joi" module is a class therefore, I used here "Joi" name(first capital letter/pascal name(for classes' name) in javascript.
# Schema(in this app) is the shape of an object.
# After install latest version of the "joi" validation, in assign schema const must follow below structure:

# const schema = Joi.object({ name: Joi.string().min(4).required(),
                               age: Joi.number().min(3).required()
                            });

const validation = schema.validate(req.body);
res.send(validation);

######################################################################

# // app.get('/api/posts/:year/:month', (req,res) => {
//     res.send(req.params);
// });
//How read query string parameters
// app.get('/api/posts/:year/:month', (req,res) =>{
//     res.send(req.query);
// });

######################################################################

# Object destructuring features
# //Handling PUT request
app.put('/api/users/:id', (req, res) => {

    //looking of the asked user with that given id
    //chek for existing it unless return 404 message
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The User with The Given ID Does not Exist!!!');

    //validate by Joi
    //if not valid display 400(bad request)
    // const schema = Joi.object({
    //     name: Joi.string().min(4).required(),
    //     age: Joi.number().min(3).required()
    // });
    // const validation = schema.validate(req.body);
    // if (validation.error) {
    //     res.status(400).send(validation.error.details[0].message);
    //     return;
    // const validation = userValidation(req.body);
    const { error } = userValidation(req.body);
    if (error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }
        //update the specific user
        //return back the updated user
        user.name = req.body.name;
        user.age = req.body.age;
        res.send(user);
});

######################################################################

//http Post Request
// app.post('/api/users', (req,res) => {
//     const newUser = {
//         id: users.length + 1,
//         name: req.body.name,
//         age: req.body.age
//     };
//     users.push(newUser);
//     res.send(newUser);
// });

######################################################################

#   // Manually create validation without joi
    // if (!req.body.name || req.body.name < 4) {
    //     //Display Error 400
    //     return res.status(400).send('You must enter the name nor should be atleast 4 letters!!!');
    // }

######################################################################

    //Create an object for shapping new user and validation right after
        const schema = Joi.object({
        name: Joi.string().min(4).required(),
        age: Joi.number().min(3).required()
    });
    const validation = schema.validate(req.body);
    // console.log(validation);
    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

######################################################################

    //http delete request
    app.delete('/api/users/:id', (req,res) => {
    
    //looking of the asked user with that given id
    //chek for existing it unless return 404 message

    //Delete

    //return that the same user

});

######################################################################

app.get('/api/users', (req, res) => {
    //Incase without express framework
    // res.end(JSON.stringify(['user1','user2','user3','user4']));
    //Incase with express framework
    // res.send(['user1','user2', 'user3', 'user4']);
    res.send(users);
})
