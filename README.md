# node-express-mysql

### This boilerplate provides a RESTful API and authentication for the website's users.

In order to make this work on your machine, you need to have [MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04) and [Redis](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04) installed as services.

It uses MySQL to store data used by the API and the users credentials.
Redis is used as a store for sessions.


* * *
#### How to use this:

You have to first add your MySQL password in the file called **knexfile.js**.

Then, you need to initialize the project.
```
npm run init
```

You can now start the server with the command :
```
gulp
```



