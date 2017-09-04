# MyReads Project

This is the "MyReads: A Book Lending App" project. The app shows three bookshelves
which have some books. All details of books are collected making query to API server.

The app allows to move a book from a shelf to another. Also, the app has a search
feature to add more books to the shelves. Within the search page, books can be move
to another shelf as well.

## How To Use App

To use the app:

- npm
  * install all project dependencies with `npm install`
  * start the development server with `npm start`

- yarn
  * install all project dependencies with `yarn install`
  * start the development server with `yarn start`


## Files In the App
```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css # Styles for app copied from a project template.
    ├── App.js # This is the root of the app. Contains static HTML and React code.
    ├── App.test.js # A test file created by create-react-app. Currently, it doesn't test any.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend.
    ├── Custom.css # Additional styles to keep App.css as is.
    ├── ListBooks.js # React component to render each book.
    ├── SearchBooks.js # React component for the search page.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # For DOM rendering only.
```
