const express = require('express');
const app = express();
const config = require('./config');
const Task = require('./Models/Task');
const cors = require('cors'); app.use(cors());

app.use(express.urlencoded({extended: false}));

//establish connection to database

config.authenticate().then(function(){
    console.log('mySQL Database Connected!',);;
}).catch(function(err){
    console.log(err);
});

//get all Tasks:

app.get('/', function(req, res){
    let data = {
        where: {} //for example, put here section: req.params.section  (to search by section)
    }
    
    if(req.query.id !== undefined){
        data.where.id = req.query.id;
    }
    Task.findAll(data).then(function(result){
        res.send(result);
        
    }).catch(function(err){
        res.send(err)
    });
});

//create a new Task

app.post('/', function(req, res){
    Task.create(req.body).then(function(result){
        console.log(req.body);
        res.redirect('/');//redirect to get route to display all Tasks 
    }).catch(function(err){
        res.send(err);
    });
});

//update progress/priority level of Task via Id:

app.patch('/:id', function(req, res){
    let taskId = req.params.id;

        //find the task

    Task.findByPk(taskId).then(function(result){

        //check if task was found

        if(result){

            //update task progress level
            if (req.body.progress_level === undefined) {
                result.progress_level = result.progress_level
            } else {
            result.progress_level = req.body.progress_level;
            console.log('Patch completed for task "' + result.title + '", -> Progress Level updated to: ' + req.body.progress_level);
            console.log('Patch completed for task "' + result.title + '", -> Progress Level updated to: "' + req.body.progress_level + '",',);
        } 
         if (req.body.priority_level === undefined) {
            result.priority_level = result.priority_level
         } else {
            result.priority_level = req.body.priority_level;
            console.log('Priority Level updated to: "' + req.body.priority_level + '."',);
        }
            //save changes to DB

            result.save().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Task id not found!');
        }
    }).catch(function(err){
        res.send(err);
    });
});

//delete a task:

app.delete('/:id', function(req, res){
    let taskId = req.params.id;
    //find task
    Task.findByPk(taskId).then(function(result){
        if(result){
            //delete the task:
            result.destroy().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Task id not found!');
        }
    })
})

//figlet console logs:

console.log('listening on port 3000.......',);

app.listen(3000, function(){
    console.log('Server Online -> Port 3000!',);
});