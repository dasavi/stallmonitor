# Stall Monitor

An IOT application to monitor the occupancy of the Men's restroom at work.
 
## Getting Started

##### Clone and install
* `git clone "https://github.com/dasavi/stallmonitor.git"`
* `npm install`

##### Set Environment Variables
* Create a file called `.env` in the project directory
* Add the following to it:

`EMAIL_ADDRESS=[Email address that server will use to send notifications]`

`EMAIL_PASSWORD=[Password for server email address]`

`STATUS_EXPIRE_TIME=[Milliseconds to wait since the last update before marking the stall status as unknown]`

`DB_URL=[URL of Firebase that the application will use]`

##### Edit config.js
* `DB_URL` should be the same value as the `.env` file

##### Start Node server
`node index.js`

##### Goto:
`http://localhost:5000`


## FE Tools
##### Start watcher for scss files only
`grunt watch`

##### Run ESLint and scss watchers together
`grunt dev`

##### Run ESLint standalone
`grunt lint`
