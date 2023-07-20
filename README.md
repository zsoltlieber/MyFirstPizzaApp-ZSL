# MyFirstPizzaApp-ZSL

## MY FIRST PIZZA APP for pizza bakers and sellers 

## This aplication was built for managers who want to administrate all of a Pizza Buffet work. 
The App able to make all relevant job (showing sellable producte, authorization, ordering, payment, message sending from clients and answering by the admin user).

## In details: 
- the user administration (authentication, authorization using jwt token, bcrypt etc.), 
- the product administration (load pizza types, allergens, make admin tasks),
- the client role (list pizza types, list own data (e.g cliend name, address, order, message, remove own client data, remove that own order which procedure has not started)
- the admin role (load pizza types, allergens, make admin tasks, list all (contained removed data), delete all data)

## Features

1. **Client registration & Login**: In order to save client (user included Admin user too). It is need to register and log in who want to use the APP.
2. **Populate basic data**: The backend ensure basic data with running 'NMP RUN POPULATE' order.
3. **Admin user(client)**: Only the admin user can delete anything, the normal user can set inactive status it is named remove e.g. his order, his client registratio etc.
4. **Data access rights**: The access is checked on the backend.

## Technological background:
- MongoDB   database
- Express   backend 
- React     frontend
- NodeJs    framework

## How to run this APP

### 1. VS Code must be installed on your computer
####    You can check it with this command:  code --version

### 2. Clone the aplication code from GitHub repository
```
    git clone https://github.com/zsoltlieber/MyFirstPizzaApp-ZSL.git
```

### 3. Chose backend directory as active one and run 
```
    cd backend
    npm install
    npm run populate
    npm run dev
```
### 4. Chose frontend directory as active one and run
```
    cd frontend
    npm start
```
