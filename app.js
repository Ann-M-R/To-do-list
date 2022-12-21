    const express = require("express");
    const bodyParser = require("body-parser");
    const ejs = require("ejs");
    const mongoose = require("mongoose");
    const date = require(__dirname + "/date.js") //ewruiring the date.js with dirname cos we mae it
    const _ = require("lodash");

    const app = express();

    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(express.static("public"));

    app.set('view engine', 'ejs');

    mongoose.connect("mongodb+srv://Ann:Einstein@cluster0.ri7hzm6.mongodb.net/todolistDB");

    const taskSchema = new mongoose.Schema({
      name: String
    });

    const Task = mongoose.model("Task", taskSchema);

    const task1 = new Task({
      name: 'Assign Tasks'
    });

    const task2 = new Task({
      name: 'Finish story'
    });

    const task3 = new Task({
      name: 'Make lasagna'
    });

    defaultTasks= [task1,task2,task3];

    // Task.insertMany([task1,task2,task3], function(err){
    //   if(err){
    //     console.log(err);
    //   }else{
    //     console.log('Successfully Added');
    //   }
    // });

  const listSchema = new mongoose.Schema({
    name: String,
    items: [taskSchema]
  });

  const List = mongoose.model("List", listSchema);


    // var newTasks = ['write story', 'cook food', 'Meet Leo'];
    var workTasks = [];

    app.get("/", function(req, res) {
      //let thisDay = date.getDate(); //getting date
      let thisDay = "Today";

      Task.find(function(err, tasks) {
        if (tasks.length === 0) { //Adding default tasks only if the coolection is empty
          Task.insertMany(defaultTasks, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Successfully Added');
            }
          });

          res.redirect("/");
        } else {
          res.render('list', {
            pageTitle: thisDay,
            tasksAdded: tasks
          });
        }

      });

    });


    app.post("/", function(req, res) {

    const  taskAdded = req.body.task;
    const  listName = req.body.button;      //Name of the submit button +

      const task4 = new Task({
        name: taskAdded
      });

      if(listName==="Today")
      {
        task4.save();
        res.redirect("/");
      }else{
        List.findOne({name: listName}, function(err, foundList){
          foundList.items.push(task4);
          foundList.save();
          res.redirect("/"+listName);
        });
      }




      // if(req.body.button=="work")
      // {
      //   var newTask = req.body.task;
      //   workTasks.push(newTask);
      //   res.redirect("/work");
      // }
      // else{
      //   var newTask = req.body.task;
      //   newTasks.push(newTask);
      //   console.log(newTasks);
      //   res.redirect("/");
      // }
    });

    app.post("/delete", function(req,res){
      checkedTask=req.body.checkbox;
      listName = req.body.listName;

      if(listName === "Today")
      {
        Task.findByIdAndRemove(checkedTask, function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log('Successfully Deleted');
              }
            });
            res.redirect("/");
      }else{
        List.findOneAndUpdate({name : listName}, {$pull: {items: {_id: checkedTask}}}, function(err, foundList){
          if(!err)
          {
            res.redirect("/"+listName);
          }
        })
      }


    });

    app.get("/:listName", function(req, res) { //handling dynamic url  http://expressjs.com/en/guide/routing.html#route-parameters
      const nameofList =_.capitalize(req.params.listName);

      List.findOne({name: nameofList}, function(err, lists){
        if(err)
        {
          console.log(err);
        }
        else{
          if(!lists){   //since list with same name doesn't exist, we create list
            const list= new List({
              name: nameofList,
              items: defaultTasks
            });

            list.save();
            res.redirect("/"+ nameofList);
          }
          else{
             res.render("list.ejs",{pageTitle:lists.name, tasksAdded: lists.items});
          }
        }

      });




 });


    app.listen(3000, function() {
      console.log("server started on port 3000");
    });
