# Weaver Labs Technical Test

## How to setup

After cloning the repo run the below commands to get you up and running

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

## Local host

After the above steps are complete the app will be available on [localhost:3000](https://localhost:3000)

Alternatively you can access the live version [here](https://dev.jamesdimonaco.com)

---

## API endpoints
These endpoints allow you to create, read, update and delete 



### Rectangle: /api/rectangle  


#### GET 

returns three items in an array called results

|ID | Width| Length |
|--|--|--|
|62b863c...| 12.3 | 6.5|

---
#### POST
post the length and width to add the new rectangle to the database


|Name |Required|Type| Description |
|--|--| --|--|
|Width|true|string| set the width of your rectangle|
|Length|true|string|set the length of your rectangle|

---

#### UPDATE
Edit the width and length of the selected rectangle

|Name |Required|Type| Description |
|--|--| --|--|
|ID|true|string|ID of rectangle
|Width|true|string|update the width of rectangle |
|length|true|string|update the length of rectangle|

---

#### DELETE
Removing the rectangle from the database

|Name |Required|Type| Description |
|--|--| --|--|
|ID|true|string|ID of rectangle so it can be specifically deleted 

---

### Triangle: /api/triangle  

#### GET 

returns three items in an array called results

|ID | Height|Base |
|--|--|--|
|62b869a...| 16 | 22|

---
#### POST
post the length and width to add the new triangle to the database


|Name |Required|Type| Description |
|--|--| --|--|
|Height|true|string| set the width of your triangle|
|Base|true|string|set the length of your triangle|

---

#### UPDATE
Edit the width and length of the selected triangle

|Name |Required|Type| Description |
|--|--| --|--|
|ID|true|string|ID of triangle
|Height|true|string|update the width of triangle |
|Base|true|string|update the length of triangle|

---

#### DELETE
Removing the triangle from the database

|Name |Required|Type| Description |
|--|--| --|--|
|ID|true|string|ID of triangle so it can be specifically deleted 
