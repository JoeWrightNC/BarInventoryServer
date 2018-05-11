const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password : '',
  database: "barManager"
});

function startUpManager() {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    managerOptions()
  });
}

function managerOptions() {
  inquirer.prompt([
    {
      name: "managerHome",
      type: "list",
      message: "Welcome to the manager portal.  What would you like to do?",
      choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
    }
  ]).then(function(selection) {
    switch (selection.managerHome) {
      case "View Products For Sale":
        viewProducts()
        break;
      case "View Low Inventory":
        viewLowInventory()
        break;
      case "Add To Inventory":
        addToInventory()
        break;
      case "Add New Product":
        addNew()
        break;
      default:
        console.log("this isn't possible dude, you're using an inquirer list");
    }
  })
}

function viewProducts() {
  console.log("Your current inventory is: \n")
  const query = connection.query("SELECT * FROM inventory", function (err, res) {
    if (err) throw err;
    res.forEach(item => {
      console.log(`ID: ${item.id} || Item: ${item.itemName} || Storage Loc: ${item.storageLocation} || Stock Quantity: ${item.stockQuantity}`)
    })
    setTimeout( function() {managerOptions()},2500);
  })
}


function viewLowInventory() {
  connection.query("SELECT * FROM inventory", function (err, res) {
    if (err) throw err;
    res.forEach(item => {
      if (item.stockQuantity < 30) {
        console.log(item.itemName + " is low.  Please Order More!")
      } else {
        console.log(item.itemName + " is in stock!")
      }
    })
    setTimeout( function() {managerOptions()},3500);
  })
}

function addToInventory() {
  console.log("Your current inventory is: \n")
  const query = connection.query("SELECT * FROM inventory", function (err, res) {
    if (err) throw err;
    res.forEach(item => {
      console.log(`ID: ${item.id} || Item: ${item.itemName} || Storage Loc: ${item.storageLocation} || Stock Quantity: ${item.stockQuantity}`)
    })
    updateInventory()
  })
}

function updateInventory() {
  inquirer.prompt ([{
    name: "getID",
    type: "input",
    message: "Enter the ID of the item you'd like to add inventory for:"
  } , {
    name: "quantityToAdd",
    type: "input",
    message: "How many units would you like to add?"
  }
  ]).then(function(answers) {
    const itemID = answers.getID
    const itemIDInt = parseInt(itemID)
    console.log(itemIDInt)
    const quantity = answers.quantityToAdd
    const dbQuery = 'SELECT * FROM inventory WHERE ?';
    connection.query(dbQuery, {id: itemIDInt}, function(err, data) {
      if (err) throw err;
      if (data.length === 0) {
      console.log("That number is not an Item ID. Please select a valid Item ID.");
      } else {
        const itemDataPacket = data[0]
        const nameyName =itemDataPacket.itemName
        const stockQuan = itemDataPacket.stockQuantity
        const stockQuanInt = parseInt(stockQuan)
        console.log(quantity)
        const quantityInt = parseInt(quantity)
        const newQuantityBuyer = stockQuanInt + quantityInt
        const updateInventoryDBQuery = "UPDATE inventory SET stockQuantity = " + newQuantityBuyer+ " WHERE id = " + itemID;
        connection.query(updateInventoryDBQuery, function(err, data) {
          if (err) throw err;
          console.log("The Stock for "+ nameyName + " is now " + newQuantityBuyer);
          setTimeout( function() {managerOptions()},1500);
        })
      }
    })
  })
}

function addNew(){
  inquirer.prompt([
    {
      name: "newName",
      type: "input",
      message: "What is the name of the new item?",
    },
    {
      name: "newStorageLoc",
      type: "input",
      message: "Where will the new item be stored?",
    },
    {
      name: "newPrice",
      type: "input",
      message: "How much does the new item cost?",
    },
    {
      name: "newQuantity",
      type: "input",
      message: "How many do you want to add to the initial stock inventory?",
    }
  ]).then(function(answers){
    var newItemName = answers.newName;
    var newItemStorageLoc = answers.newStorageLoc;
    var newItemPrice= answers.newPrice;
    var newItemStockQuan = answers.newQuantity;
    connection.query("INSERT INTO inventory SET ?", {
      itemName: newItemName,
      storageLocation: newItemStorageLoc,
      price: newItemPrice,
      stockQuantity: newItemStockQuan,
    }, function(err, res) {
      if (err) throw err;
      console.log(newItemName+ " has been added to the inventory!")
      setTimeout( function() {managerOptions()},1500);
    });
  });
}

startUpManager()