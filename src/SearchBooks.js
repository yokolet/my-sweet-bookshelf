import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    allBooks: PropTypes.array.isRequired,
  }

  state = {
     query: '',
     results: [],
     tempAllBooks: [],
     tempBooks: {}
  }

  searchBooks = (query, maxResults, allBooks) => {
    let queryWord = query.trim()
    this.setState({ query: queryWord })
    if (queryWord) {
      BooksAPI.search(query, maxResults).then((results) => {
        if (!results || results["error"]) {
          this.setState({
            results: []
          })
        } else {
          let allIds = allBooks.map(book => book.id)
          this.setState({
            results: results.filter(book => !allIds.includes(book.id))
          })
        }
      })
    } else {
      this.setState({
        results: []
      })
    }
  }

  changeShelfOnSearch = (book, shelf, allBooks) => {
    book["shelf"] = shelf
    BooksAPI.update(book, shelf).then((bookIds) => {
      if (bookIds && !bookIds["error"]) {
        var allIds = allBooks.map((book) => book.id)
        if (!allIds.includes(book.id)) {
          allBooks.push(book)
        }
        this.setState({
          tempAllBooks: allBooks,
          tempBooks: {
            "currentlyReading": allBooks.filter((book) => bookIds["currentlyReading"].includes(book.id)),
            "wantToRead": allBooks.filter((book) => bookIds["wantToRead"].includes(book.id)),
            "read": allBooks.filter((book) => bookIds["read"].includes(book.id))
          }
        })
      }
    })
  }

  render() {
    const { allBooks, books} = this.props
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>
            Close
          </Link>
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
              onChange={(event => this.searchBooks(event.target.value, 10, allBooks))}
            />
          </div>
        </div>
        <div className="search-books-results custom-search-books-result">
          <div>
            <ListBooks
              shelfTitle="Results"
              shelf = "none"
              books={this.state.results}
              allBooks={allBooks}
              onChangeShelf={this.changeShelfOnSearch}
            />
            <ListBooks
              shelfTitle="Currently Reading"
              shelf = "currentlyReading"
              books={books.currentlyReading}
              allBooks={allBooks}
              onChangeShelf={this.changeShelfOnSearch}
            />
            <ListBooks
              shelfTitle="Want To Read"
              shelf = "wantToRead"
              books={books.wantToRead}
              allBooks={allBooks}
              onChangeShelf={this.changeShelfOnSearch}
            />
            <ListBooks
              shelfTitle="Read"
              shelf = "read"
              books={books.read}
              allBooks={allBooks}
              onChangeShelf={this.changeShelfOnSearch}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks
