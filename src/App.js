import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import './Custom.css'
import BookShelves from './BookShelves'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
     allBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState((state) => ({
        allBooks: allBooks
      }))
    })
  }

  changeBookShelf = (book, shelf, allBooks) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(state => ({
          allBooks: state.allBooks.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  render() {
    const { allBooks } = this.state

    const currentlyReading = allBooks.filter(book => book.shelf === "currentlyReading")
    const wantToRead = allBooks.filter(book => book.shelf === "wantToRead")
    const read = allBooks.filter(book => book.shelf === "read")
    const bookShelfData = [
      {
        shelfTitle: "Currently Reading",
        shelf: "currentlyReading",
        books: currentlyReading
      },
      {
        shelfTitle: "Want To Read",
        shelf: "wantToRead",
        books: wantToRead
      },
      {
        shelfTitle: "Read",
        shelf: "read",
        books: read
      }
    ]

    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <SearchBooks
            allBooks={allBooks}
            onChangeShelf={this.changeBookShelf}
            />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books custom-list-books">
            <div className="list-books-title custom-list-books-title">
              <h1>My Sweet Bookshelf</h1>
            </div>
            <div className="list-books-content">
              <BookShelves
                bookShelfData={bookShelfData}
                allBooks={allBooks}
                onChangeShelf={this.changeBookShelf}
              />
            </div>
            <Link className="open-search" to="/search">
              <a>Add a book</a>
            </Link>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
