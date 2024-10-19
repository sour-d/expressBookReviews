const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log({ username, password })

  if (username && password) {
    const user = users.find(u => u.username === username);
    if (!user) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    }
    return res.status(404).json({ message: "User already exists!" });
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const bookInfo = books[isbn];
  return res.status(200).json(bookInfo);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const bookInfo = Object.values(books).filter(b => b.author === req.params.author);
  return res.status(200).json(bookInfo);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const bookInfo = Object.values(books).filter(b => b.title === req.params.title);
  return res.status(200).json(bookInfo);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const bookInfo = books[req.params.isbn];
  return res.status(200).send(bookInfo?.reviews);
});

module.exports.general = public_users;
