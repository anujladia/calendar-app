# Calendar App

## Description
This app servers a calendar widget

## Tech Stack
* `Node.js` for backend
* `Firestore` for Database, which is a NoSQL 

## Database
* Collection called `events`
  * Document ID is the locale time in the TIMEZONE. The fields in the documents follows the givenn schema
    * start_time: Number (unix time stamp)
    * end_time: Number (unix time stamp)
    * duration: Number (in mintues)
    * status: Boolean

## Getting started
1. Clone the repo
2. Run `npm i` in terminal
3. Create `.env` and for data ask the manager
4. Run `npm run start` to start the server


## Constants
* DURATION
* TIMEZONE


## API

### Create events for the admin
```
`DESCRIPTION`: API adds avaliable free slots for the user
`URL`: /api/admin/event/create/:start_date?/:end_data?/:duration?
`METHOD`: POST
`PARAMS`:
* `start_date`: timestamp (optional)
* `end_data`: timestamp (optional)
* `duration`: number (optional) - in minutes
`RESPONSE`:
Status: 200
Body: Empty slots added
```

### Get all events
```
`DESCRIPTION`: API to fetch all the slots in the given date range
`URL`: /api/event/all/:start_date/:end_data
`METHOD`: GET
`PARAMS`:
* `start_date`: timestamp
* `end_data`: timestamp
`RESPONSE`:
Status: 200
Body: Array of timestamps
```


### Get free slots
```
`DESCRIPTION`: API to fetch all the free slots for a given date in the given timezone format
`URL`: /api/event/free/:date/:timezone
`METHOD`: GET
`PARAMS`:
* `start_date`: timestamp (optional)
* `end_data`: timestamp (optional)
* `duration`: number (optional) - in minutes
`RESPONSE`:
Status: 200
Body: Array of timestamps in hh:mm a format
```


### Book an event
```
`DESCRIPTION`: API to book an event for a given time and duration
`URL`: /api/event/book/:date/:duration
`METHOD`: PUT
`RESPONSE`:
Status: 200
Body: Slot is booked successfully

Status: 422
Message: Time slot passed is already booked
```

