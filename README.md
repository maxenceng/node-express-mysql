# node-express-mysql

### This boilerplate provides a RESTful API and authentication for the website's users.

In order to make this work on your machine, you need to have [MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04) and [Redis](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-redis-on-ubuntu-16-04) installed as services.

It uses MySQL to store data used by the API and the users credentials.
Redis is used as a store for sessions.


* * *
#### How to use this:

You have to first add your MySQL password in the file called **knexfile.js**.
If you want to use the mailing system, you need to add your gmail credentials in the file called **mailfile.js**.

Then, you need to initialize the project.
```
npm run init
```

You can start the server with the command :
```
gulp
```

The server is now running on the port [8000](http://localhost:8000/).


