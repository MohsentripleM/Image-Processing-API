#  Typescript Image resizing project

## Project Name 

### Image Processing API

### Installing Dependencies

project requires having node installed https://nodejs.org/en/download/

run ```npm install``` to install the dependencies

### Project Dependencies

* typescript 4.6.3

* Express 4.17.3

* sharp 0.30.4

* Jasmine 4.1.0

* supertest 6.2.2

* nodemon 2.0.15

* eslint 8.4.1

### Content

> Packages for Testing/Developping backend apps, eslint and prettier configured

## Testing

* Testing is done using jasmine

* To run the tests, run

> `npm run test`


## Formatting

> Formating is using eslint and prettier

> To run the tests, run

> `npm run lint`

> `npm run prettier` 

## Server starting

> To start the server, run

> `npm start`

## Project Description

> This project used to making server for resizing photos using sharp liberary



### Error Handeling

> Return 400 for 'bad request'

> Return 404 for 'not found'



## End points



### Get/

> localhost:3000

> Return message "root route"



### Get/image

> localhost:3000/images

> Return message "The queries must include filename!!"

### Queries

* The server takes three queries  file name, height, and width and returns resized image

> `curl localhost:3000/images?filename={validfilename}&&height={imageHeight}&&width=
{imageWidth}`

 * Returns error if no file name sent or image does not exist

 * Returns original image if no width nore height sent

 * Returns error if height and width equal zero

* Takes the absolute value of height and width even if ir sent as negative number

* If only height sent with the file name, it takes the width of the original image 

* If only width sent with the file name, it takes the height of the original image

* The code create new folder with name 'Result' if it does not exist and put the resized images on it

## References:

* Udacity classroom

* Express Documentation [https://www.npmjs.com/package/express]

* Sharp Documentation [https://www.npmjs.com/package/sharp]

* Jasmine Documentation [https://jasmine.github.io/]

* Typescript documnetation [https://www.typescriptlang.org/docs/]

* Math JS object [https://www.w3schools.com/js/js_math.asp]

* File system documentation [https://nodejs.org/api/fs.html]




## Author

**Mohamed Mohsen**






# Image-Processing-API
# Image-Processing-API
# Image-Processing-API
# Image-Processing-API
# Image-Processing-API
# Image-Processing-API
# Image-Processing-API
# Image-Processing-API-Project
