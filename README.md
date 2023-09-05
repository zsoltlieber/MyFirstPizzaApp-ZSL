# MY FIRST PIZZA APP for pizza bakers and sellers and hungry pizza eaters :)
###  -- PETPROJECT! --
##### Purpose: showing that as a junior developer how I can solve a difficult MERN stack task

##### The APP is able to manage all relevant tasks
Showing sellable products as a menu, depends on set allergens, client authorization, ordering, message collecting from customers, manage admin tasks.

## Features
1. **Client registration & Login**: It is needed to be registered and loged in if you want to order, or send message via this APP.
2. **Client**: After log in can dealing with his order, message sending, but his delete only remove in reality.
3. **Populate basic data**: The backend ensure basic data with running 'npm run populate' order.
4. **Admin user/STAFF**: Special client. Only the admin user can remove anything, in connection with his or other client's data but he can only set inactive status of the items.
5. **Main admin/BOSS**: Special admin user. He can delete in reality.
6. **Data access rights**: The access rights are checked on the backend side.

## Technological background:
| Function | Solution |
| :------ | :------ |
| database | MongoDB |
| backend | Express.js |
| frontend | React.js |
| framework | Node.js |

## How to run this APP

### 1. VS Code must be installed on your computer

#### You can check that wheter you have VS Code on your PC with this command below:
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

### 2. Clone the aplication from GitHub repository
```
    git clone https://github.com/zsoltlieber/MyFirstPizzaApp-ZSL.git
```

### 3. You must have MongoDb connection
Without MongoDb account you have to start with MongoDb registration and create a MongoDb account. 
```
https://account.mongodb.com/account/register
```
With MongoDb account please copy the embedded 'template_env_file' as .env file on the backend for your mongodb connection. Use the the given template below (mongodb url and JWT declaration is a must).
```
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.bjwcssz.mongodb.net/<databasename>
JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGl6emFBcHAiLCJwYXNzd29yZCI6InBhc3N3b3JkIn0.GEMK9chTUlL_FlKM9GeKEwF6NnYJKUgNd3KGJDES33A
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
