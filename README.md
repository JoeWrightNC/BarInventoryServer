# Bar Inventory CLI App

### General Overview

This is a CLI application built with Node.js and MySQL that mimicks the architecture of a bar Point of Sale system.  Consequently, this app has two modules:

* **Customer Module** - Allows for potential customers to view products for sale and associated prices, select a product to purchase, and then be billed their total amount due for the purcahse.
* **Manager Module** - Allows manager to view currently inventory, recieve low inventory warnings, update exisiting stock levels upon purchase, and add new item to the store inventory.

## Getting Started

Follow these instructions to clone the project and run this CLI on your local drive utilizing your local host as server.

### Prerequisites

You will need [Node.JS](https://www.npmjs.com/) installed on your system.

### Installing

1. Clone project by running the following command in your terminal/bash: 

        `git clone https://github.com/ricopella/bamazon.git`

2. To install the various dependencies for this project run the following command inside the root directory of the cloned filed in your terminal/bash:

        `npm install`

## Commands to run application

1. `node barCustomer.js`

    * This will start the customer facing module.
    * You will first see available bar inventory and the price of each item.
    * Customer may then select what item they'd like to purchase, and how many of those they want to buy.
    * The system will check to verify there is sufficient stock.  If not, the user will be informed accordingly of how many they do have for that product, then asked to order again.
    * If there is sufficient stock the order will be filled, the customer will be notified of their total, and the stock will be updated via MySQL instanteously.
    

2. `node barManager.js`

    * This will start the manager facing module. Managers are able to:
        * `View Products For Sale`
            * This option allows the manager to view the current store inventory levels.
        * `View Low Inventory`.
            * This option lists all items in the store, issuing an alert for an item with an inventory count lower than 30.
        * `Add to Inventory`.
            * This option allows the manager to add more stock to any item already existing in inventory.
        * `Add New Product`.
            * This option takes the manager through a series of prompts in order to add new items to the store inventory.

# Demo

 ![Customer Demo](./demos/customer.webm) 

# Packages Used

* [Node.JS](https://www.npmjs.com/)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [MySQL](https://www.npmjs.com/package/mysql)
