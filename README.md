# MY FIRST PIZZA APP for pizza bakers and sellers 
###  -- PETPROJECT! --
##### It was made for showing my level of javascript knowledge after last exam

## Purpose
##### This aplication was built for managers who want to administrate all of a Pizza Buffet work. 
##### The APP is able to manage all relevant tasks
(showing sellable products as a menu, client authorization, ordering, payment (future plan), message collecting from customers etc.).

## Features
1. **Client registration & Login**: It is needed to be registered and loged in if you want to order via this APP.
3. **Populate basic data**: The backend ensure basic data with running 'npm run populate' order.
4. **Admin user(client)**: Only the admin user can delete anything, the normal user can only set inactive status of the items (order, client registration, meessage etc.)
5. **Data access rights**: The access is checked on the backend side.

## Technological background:
| Function | Solution |
| :------ | :------ |
| database | MongoDB |
| backend | Express.js |
| frontend | React.js |
| framework | Node.js |

## How to run this APP

### 1. VS Code must be installed on your computer

#### You can check if you have VS Code on your PC with this command below:
```
code--version
```
If you do not have VS Code on your PC chose one solution depending on your OS!

#### In case of LINUX:
```
https://code.visualstudio.com/docs/setup/linux
```

#### In case of WINDOWS:
```
https://code.visualstudio.com/docs/setup/windows
```

### 2. You must have MongoDb connection
Without MongoDb account you have to start with MongoDb registration and create a MongoDb account. 
```
https://account.mongodb.com/account/register
```
With MongoDb account please create a .env file from embedded 'template_env_file' file on this the backend (location: MyFirstPizzaApp-ZSL/bankend/)
```
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.bjwcssz.mongodb.net/<databasename>
JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGl6emFBcHAiLCJwYXNzd29yZCI6InBhc3N3b3JkIn0.GEMK9chTUlL_FlKM9GeKEwF6NnYJKUgNd3KGJDES33A
```

### 3. Clone the aplication from GitHub repository
```
    git clone https://github.com/zsoltlieber/MyFirstPizzaApp-ZSL.git
```

### 4. Chose backend directory as active one and run the orders below
```
    cd backend
    npm install
    npm run populate
    npm run dev
```
### 5. Chose frontend directory as active one and run the orders below
```
    cd frontend
    npm start
```
