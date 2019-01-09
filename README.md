# democratreats
Office Supplies application for Admin and Employee

What

Democratreats is a web app designed to help offices decide how company resources are allocated. This allows office administrators to create polls that employees can vote on.

How

The employee - 
*creates an account
*suggests an item
*joins a poll
*votes on items
*chats with other users
*sees the final result

The admin - 
*creates an account
*reviews employee suggestions
*creates a poll with certain fields at a certain time
*chats with other users
*reviews poll answers
*finalizes and publishes result

Exactly How

There will be two kinds of accounts that can be created with different privileges: admin accounts, and employee accounts. Admins have full CRUD functionality regarding polls. Employees can vote in open polls and view their poll's final result. Employees can also create requests to suggest certain items they want in the office. Once a poll is closed, everyone will be able to see the winning result of the poll, yet only admins may see the current vote totals. The polls will be open for voting until a set date that is determined by the admin when they create the poll. The employees will be able to see when the poll closes so they know how long they have to submit a vote. 
We will use an authentication system to enable new accounts to be created and signed into. A database with several tables will handle all the poll data, and voting records.


Why

From week 9 of the UC Berkeley Coding Bootcamp, this project is a first attempt at a creative, full-stack Node and Sequelize application. Users can utilize CRUD functionality to communicate with one another. Making a space for community input reflects an active culture that makes its decisions with transparency.

Contributors

Wiley Buchanan
Jordan Larios
Ritesh Patel
Andrew Smyth