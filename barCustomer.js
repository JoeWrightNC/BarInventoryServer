const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password : '',
  database: "barManager"
});

function startUp() {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showItems()
  });
}

function showItems() {
  console.log("Your current inventory is: \n")
  const query = connection.query("SELECT * FROM inventory", function (err, res) {
    if (err) throw err;
    res.forEach(item => {
      console.log(`ID: ${item.id} || Item: ${item.itemName} || Price: $${item.price}`)
    })
    updateInventory()
  })
}

function updateInventory() {
  inquirer.prompt ([{
    name: "getID",
    type: "input",
    message: "Enter the ID of the item you'd like to purchase:",
  } , {
    name: "quantityPurchased",
    type: "input",
    message: "How many would you like to purchase?",
    }
]).then(function(answers) {
  const itemID = answers.getID
  const quantity = answers.quantityPurchased
  const dbQuery = 'SELECT * FROM inventory WHERE ?';
  connection.query(dbQuery, {id: itemID}, function(err, data) {
    if (err) throw err;
    if (data.length === 0) {
      console.log("That number is not an Item ID. Please select a valid Item ID.");
      showItems();
    } else {
      const itemDataPacket = data[0]
      if (quantity <= itemDataPacket.stockQuantity) {
        console.log("I have enough to get you that!  Just one second.")
        const newQuantityBuyer = itemDataPacket.stockQuantity - quantity
        const updateInventoryDBQuery = "UPDATE inventory SET stockQuantity = " + newQuantityBuyer+ " WHERE id = " + itemID;
        connection.query(updateInventoryDBQuery, function(err, data) {
          if (err) throw err;
          console.log("Here are your drinks! Your total is $" + (itemDataPacket.price * quantity) + ". Enjoy your drinks!!");
          connection.end();
        })
      } else {
        console.log("Sorry, I don't have enough.  I have " + itemDataPacket.stockQuantity + " of those.  Can I get you something else? \n Here is what I have:")
        showItems();
      }
    }
  })
})
}

startUp()