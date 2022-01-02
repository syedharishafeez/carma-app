# Application Details
- In this repo we have a frontend which is build on react and a backend which is build on node and we use mysql as our DB and the node version that we use for both frontend and backend is v14.17.3.
- A user can enter only one card
- You can add card via API or from frontend (Enter all the details and then click on submit button)
- So in order to add new one, you have to delete the previously added card.
- A card can be deleted via API or from frontend (by clicking on the **Delete** button)

After cloning this app follow the steps mentioned in Backend and Frontend sections

## Backend
- We use AES-256 for encrypting Card Number and CVV because currently AES-256 is one of the best encryption algorithm.
- We also used **luhn-alg** to validate Credit card number

### How to start backend application
- cd backend
- create a database in mysql
- Set environment variables according to .env.dev file
- npm i
- npm start

Once backend application has started, you can test it by hitting the url **http://BACKEND_IP:BACKEND_PORT**

### Enhancements
- We can use ORM rather than the native queries because ORM comes up with different advantages.

## Frontend
- cd frontend
- Set url variable in constants.js file
- npm i
- npm start