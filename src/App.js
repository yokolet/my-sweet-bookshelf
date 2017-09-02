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
     allBookIds: [],
     books: {},
     showSearchPage: false,
     query: '',
     results: [],
     tempBooks: {"currentlyReading": [], "wantToRead": [], "read":[]}
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState((state) => ({
        allBooks: allBooks,
        allBookIds: new Set(allBooks.map((book) => book.id)),
        books: {
          "currentlyReading": allBooks.filter((book) => book.shelf === "currentlyReading"),
          "wantToRead": allBooks.filter((book) => book.shelf === "wantToRead"),
          "read": allBooks.filter((book) => book.shelf === "read")
        }
      }))
    })
  }

  changeBookShelf = (book, shelf, search) => {
    BooksAPI.update(book, shelf).then((bookIds) => {
      book["shelf"] = shelf
      if (search) {
        let tempBooks = this.state.tempBooks
        tempBooks[shelf].push(book)
        this.setState({
          tempBooks: tempBooks
        })
      } else {
        let allBooks = this.state.allBooks
        this.setState({
          books: {
            "currentlyReading": allBooks.filter((book) => bookIds["currentlyReading"].includes(book.id)),
            "wantToRead": allBooks.filter((book) => bookIds["wantToRead"].includes(book.id)),
            "read": allBooks.filter((book) => bookIds["read"].includes(book.id))
          }
        })
      }
    })
  }

  searchBooks = (query, maxResults) => {
    let queryWord = query.trim()
    this.setState({ query: queryWord })
    if (queryWord) {
      BooksAPI.search(query, maxResults).then((results) => {
        if (!results || results["error"]) {
          this.setState({
            results: []
          })
        } else {
          this.setState({results})
        }
      })
    } else {
      this.setState({
        results: []
      })
    }
  }

  closeSearch = () => {
    let allBooks = this.state.allBooks
    let allBookIds = this.state.allBookIds
    let books = this.state.books
    for (var key in books) {
      let toBeAdded = this.state.tempBooks[key]
      for (var i=0; i<toBeAdded.length; i++) {
        let book = toBeAdded[i]
        if (!allBookIds.has(book.id)) {
          books[key].push(book)
          allBooks.push(book)
          allBookIds.add(book.id)
        }
      }
    }
    this.setState({
      allBooks: allBooks,
      allBookIds: allBookIds,
      books: books,
      showSearchPage: false,
      query: '',
      results: [],
      tempBooks: {"currentlyReading": [], "wantToRead": [], "read":[]}
    })
  }

  render() {
    const { query } = this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search"
                onClick={this.closeSearch}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event => this.searchBooks(event.target.value, 10))}
                />
              </div>
            </div>
            <div className="search-books-results">
              <div>
                <ListBooks
                  shelfTitle="Results"
                  shelf = "none"
                  books={this.state.results}
                  search={true}
                  onChangeShelf={this.changeBookShelf}
                />
                <ListBooks
                  shelfTitle="Currently Reading"
                  shelf = "currentlyReading"
                  books={this.state.tempBooks.currentlyReading}
                  search={true}
                  onChangeShelf={this.changeBookShelf}
                />
                <ListBooks
                  shelfTitle="Want To Read"
                  shelf = "wantToRead"
                  books={this.state.tempBooks.wantToRead}
                  search={true}
                  onChangeShelf={this.changeBookShelf}
                />
                <ListBooks
                  shelfTitle="Read"
                  shelf = "read"
                  books={this.state.tempBooks.read}
                  search={true}
                  onChangeShelf={this.changeBookShelf}
                />
              </div>
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
