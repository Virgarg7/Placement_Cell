Placement Tracker
-----------------
Placement Tracker is a Web App which would be useful to the Placement Cells and students for any
colleges during placement. The App would be able to ease the process of placement process. Students would be able to make their resumes and save their details to be able to send to the placement cell when any placement offer is kept in the app by the Placement Cell. While the Placement Cell would be able to add offers and see the statistics for the placement during the term.

Technology/Tools: Node JS, Express JS, React JS, Mongo DB, Elastic UI, Redis (MERN Stack)

* Here, I have used redis for sending email in the background
* In the backend side Clean Coding Architecture has been followed.

To Run this app
---------------
1) Server
    1. Go to server folder
    2. Create .env file and set environment variables
        DB_URL
        PORT
        DB_EMAIL_USER
        DB_EMAIL_PASSWORD
        REDIS_URL
        JWT_PRIVATE_KEY
        JWT_EXPIRES_IN
    3. Run npm install to install node_modules
    4. Execute Command npm start

2) Frontend
    1. Go to frontend folder
    2. run yarn install to install node_modules
    3. Execute command npm start
    4. Go to http://localhost:3000/


Note: Before running this make sure redis is installed and redis server is started.


Hope you will like this :)