# democratreats
Bringing Ancient Greek politics to the office

## What

Democratreats is a polling web app designed to help offices make decisions, whether it's a global change or a simple snack suggestion. This allows office administrators to create polls that employees can vote on, and gives everyone a platform to drop a suggestion. Additionally, all accounts use native chat features to communicate privately.

## Tech

```html
<p><strong>Node.js,
Handlebars.js,
Passport.js,
Sequelize</strong></p>
```
 
## How

THE EMPLOYEE - 
*creates an account
*suggests an item
*joins a poll
*votes on items
*chats with other users
*sees the final result

THE ADMIN - 
*creates an account
*reviews employee suggestions
*creates a poll with certain fields at a certain time
*chats with other users
*reviews poll answers
*finalizes and publishes result

## Exactly How

There will be two kinds of accounts that can be created with different privileges: admin accounts, and employee accounts. Admins have full CRUD functionality regarding polls. Employees can vote in open polls and view their poll's final result. Employees can also create requests to suggest certain items they want in the office. Once a poll is closed, everyone will be able to see the winning result of the poll, yet only admins may see the current vote totals. The polls will be open for voting until a set date that is determined by the admin when they create the poll. The employees will be able to see when the poll closes so they know how long they have to submit a vote. 
We will use an authentication system to enable new accounts to be created and signed into. A database with several tables will handle all the poll data, and voting records.

## Why

Democratreats makes an easy-to-use space for community input to build a healthy, active culture and make decisions with transparency.

## Contributors

Wiley Buchanan,
Jordan Larios,
Andrew Smyth,
Ritesh 