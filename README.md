# Web app for testing MongoDB manipulations and Authentication implementation

=======================

## How to run

First of all
```
git clone ...
cd ...
npm install
```

Create .env file  and specify appropriet variables
```
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/test
SECRET=<your_secret>
```

To generate SECRET you can use openssl in your terminal
```
openssl rand -hex 256
```

To run just use
```
npm start
```

Or run in developer mode
```
npm run dev
```
