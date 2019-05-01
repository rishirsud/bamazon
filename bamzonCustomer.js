// import required modules
const inquirer = require("inquirer");
const mysql = require("mysql");

// connect to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "300Atrium",
  database: "bamazon"
});

// test connection
connection.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected with ID: " + connection.threadId);
});

// Show available products
let availableProducts = function () {
  connection.query("SELECT * FROM products", function (err, result) {
    if (err) {
      throw (err);
    };

    // loop through products and display information
    for (let i = 0; i < result.length; i++) {
      console.log(
        `ID: ${result[i].item_id} |`,
        `${result[i].product_name} |`,
        `${result[i].department_name} |`,
        `${result[i].price} |`,
        `Quantity: ${result[i].stock_quantity} `
      );
    }
    // Ask what the user would like to select using it's ID
    inquirer.prompt(
      [{
          type: "input",
          name: "item_id",
          message: "Enter the ID of the item you want to purchase.",
          validate: function (input) {
            if (!isNaN(input) && parseInt(input) <= result.length && parseInt(input) > 0) {
              return true;
            } else {
              return false;
            }
          }
        },
        {
          // Ask for how many user wants to purchase
          type: "input",
          name: "stock_quantity",
          message: "How many would you like to purchase?",
          validate: function (input) {
            if (isNaN(input)) {
              return false;
            } else {
              return true;
            }
          }
        }
      ]
    ).then(function (input) {
      var selectedItem = input.item_id - 1;
      var quantitySelected = parseInt(input.stock_quantity);
      var total = parseFloat(result[selectedItem].price * quantitySelected);
      console.log(selectedItem);
      console.log(quantitySelected);

      if (result[selectedItem].stock_quantity >= quantitySelected) {
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [{
              stock_quantity: result[selectedItem].stock_quantity - quantitySelected
            },
            {
              item_id: input.item_id
            }
          ],
          function (err, result) {
            if (err) {
              throw err;
            };
            console.log(
              "Total is $" + total.toFixed(2)
            );
          }
        );
      } else {
        console.log("Sorry. Not enough stock.");
      }
    });
  });
};



availableProducts();