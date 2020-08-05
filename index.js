const Joi = require('joi');
const express = require('express');
const { json } = require('express');
const app = express();

app.use(express.json());

const users = [
    { id: 1, name: 'user1', age: 20 },
    { id: 2, name: 'user2', age: 30 },
    { id: 3, name: 'user3', age: 40 },
    { id: 4, name: 'user4', age: 50 },
    { id: 5, name: 'user5', age: 60 }
];

//http Post Request and assign Validation
app.post('/api/users', (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    users.push(newUser);
    res.send(newUser);
});

//http Get Request
app.get('/', (req, res) => {
    res.send('WOW Hello Guys!!!');
});
//Access to entire collection
app.get('/api/users', (req, res) => {
    res.send(users);
});

//Access to specific route
app.get('/api/users/:id', (req, res) => {
    // res.send(req.params.id);
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The User with The Given ID Does not Exist!!!');
    res.send(user);
});


//handling PUT request
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The User with The Given ID Does not Exist!!!');

    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

        user.name = req.body.name;
        user.age = req.body.age;
        res.send(user);
});

//making function for user validation only
function userValidation(user) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        age: Joi.number().min(3).required()
    });
    return schema.validate(user);
};

//http Delete request
app.delete('/api/users/:id', (req,res) => {
    

    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The User with The Given ID Does not Exist!!!');

    const delIndex = users.indexOf(user);
    users.splice(delIndex, 1);

    res.send(user);

});



const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`App Running on Port ${port}`));