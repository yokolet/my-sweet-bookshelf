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

  render() {
    const { allBooks, onChangeShelf} = this.props
    const { query } = this.state

    const resultBooks = this.state.results.filter(book => (!book.shelf || book.shelf === "none"))
    const currentlyReading = allBooks.filter(book => book.shelf === "currentlyReading")
    const wantToRead = allBooks.filter(book => book.shelf === "wantToRead")
    const read = allBooks.filter(book => book.shelf === "read")

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
              books={resultBooks}
              allBooks={allBooks}
              onChangeShelf={onChangeShelf}
            />
            <ListBooks
              shelfTitle="Currently Reading"
              shelf = "currentlyReading"
              books={currentlyReading}
              allBooks={allBooks}
              onChangeShelf={onChangeShelf}
            />
            <ListBooks
              shelfTitle="Want To Read"
              shelf = "wantToRead"
              books={wantToRead}
              allBooks={allBooks}
              onChangeShelf={onChangeShelf}
            />
            <ListBooks
              shelfTitle="Read"
              shelf = "read"
              books={read}
              allBooks={allBooks}
              onChangeShelf={onChangeShelf}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks
