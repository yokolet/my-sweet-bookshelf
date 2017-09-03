import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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

  changeBookShelf = (book, shelf, search) => {
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
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks
                  shelfTitle="Currently Reading"
                  shelf = "currentlyReading"
                  books={this.state.books.currentlyReading}
                  search={false}
                  onChangeShelf={this.changeBookShelf}
                />
                <ListBooks
                  shelfTitle="Want To Read"
                  shelf = "wantToRead"
                  books={this.state.books.wantToRead}
                  search={false}
                  onChangeShelf={this.changeBookShelf}
                />
                <ListBooks
                  shelfTitle="Read"
                  shelf = "read"
                  books={this.state.books.read}
                  search={false}
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
