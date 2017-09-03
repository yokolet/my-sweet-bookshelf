import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import './Custom.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
     allBooks: [],
     books: {}
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState((state) => ({
        allBooks: allBooks,
        books: {
          "currentlyReading": allBooks.filter((book) => book.shelf === "currentlyReading"),
          "wantToRead": allBooks.filter((book) => book.shelf === "wantToRead"),
          "read": allBooks.filter((book) => book.shelf === "read")
        }
      }))
    })
  }

  componentDidUpdate(prevProps, prevState) {
    BooksAPI.getAll().then((allBooks) => {
      if (allBooks && !allBooks["error"]) {
        this.setState((state) => ({
          allBooks: allBooks,
          books: {
            "currentlyReading": allBooks.filter((book) => book.shelf === "currentlyReading"),
            "wantToRead": allBooks.filter((book) => book.shelf === "wantToRead"),
            "read": allBooks.filter((book) => book.shelf === "read")
          }
        }))
      }
    })
  }

  changeBookShelf = (book, shelf) => {
    book["shelf"] = shelf
    BooksAPI.update(book, shelf).then((bookIds) => {
      if (bookIds && !bookIds["error"]) {
        let allBooks = this.state.allBooks
        this.setState({
          allBooks: allBooks,
          books: {
            "currentlyReading": allBooks.filter((book) => bookIds["currentlyReading"].includes(book.id)),
            "wantToRead": allBooks.filter((book) => bookIds["wantToRead"].includes(book.id)),
            "read": allBooks.filter((book) => bookIds["read"].includes(book.id))
          }
        })
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks/>
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books custom-list-books">
            <div className="list-books-title custom-list-books-title">
              <h1>My Sweet Bookshelf</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks
                  shelfTitle="Currently Reading"
                  shelf = "currentlyReading"
                  books={this.state.books.currentlyReading}
                  onChangeShelf={this.changeBookShelf}
                />
                <ListBooks
                  shelfTitle="Want To Read"
                  shelf = "wantToRead"
                  books={this.state.books.wantToRead}
                  onChangeShelf={this.changeBookShelf}
                />
                <ListBooks
                  shelfTitle="Read"
                  shelf = "read"
                  books={this.state.books.read}
                  onChangeShelf={this.changeBookShelf}
                />
              </div>
            </div>
            <Link className="open-search" to='/search'>
              <a>Add a book</a>
            </Link>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
