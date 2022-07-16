# SPAN SEARCH
Spans search dashboard, allowing free text search.

## Technologies Used
- Client side: React + Typescript + Material UI + Styled Components
- Server side: Nodejs + express server.

###
Packages used:

[node-cache](https://www.npmjs.com/package/node-cache) - for cache on server side

[json-bigint](https://www.npmjs.com/package/json-bigint) - parsing large numbers from json file

## Pages
* Home page ("/")
* Span Viewer ("/span/:id")


## Features
- Home page - displaying all span's data in a table with pigination.
- Span page - displaying single span data

# Searching Algorithem

* get search terms from request and validate them.
* process and parse search terms to create list of objects with the following structure:
```
{
    leftOperand, 
    operator,
    rightOperand
}
```

example: the following search terms "resource.type" === "http" and "duration” > 1000 will convert to;
```
[
    {
        leftOperand: "resource.type",
        operator: "===",
        rightOperand: "http"
    },
    {
        leftOperand: "duration",
        operator: ">",
        rightOperand: 1000
    }
]
```
* traverse recursivly on each key,value in the javascript object until all search terms are matched.
* return spans

## Usage
to run the project, run npm install on both "client" and "server".
```
./client > npm i
./server > npm i

./client > npm start
./server > node server.js
```

## TODO
* add testing server + client
* add paging to dashboard