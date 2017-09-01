import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     allBooks: [],
     books: {},
     showSearchPage: false
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

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((bookIds) => {
      let allBooks = this.state.allBooks
      this.setState((state) => ({
        books: {
          "currentlyReading": allBooks.filter((book) => bookIds.currentlyReading.includes(book.id)),
          "wantToRead": allBooks.filter((book) => bookIds.wantToRead.includes(book.id)),
          "read": allBooks.filter((book) => bookIds.read.includes(book.id))
        }
      }))
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
