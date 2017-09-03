import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class SearchBooks extends Component {
  state = {
     query: '',
     results: [],
     tempAllBooks: [],
     tempBooks: {}
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

  changeShelfOnSearch = (book, shelf) => {
    book["shelf"] = shelf
    BooksAPI.update(book, shelf).then((bookIds) => {
      if (bookIds && !bookIds["error"]) {
        let tempAllBooks = this.state.tempAllBooks
        if (!tempAllBooks.includes(book)) {
          tempAllBooks.push(book)
        }
        this.setState({
          tempAllBooks: tempAllBooks,
          tempBooks: {
            "currentlyReading": tempAllBooks.filter((book) => bookIds["currentlyReading"].includes(book.id)),
            "wantToRead": tempAllBooks.filter((book) => bookIds["wantToRead"].includes(book.id)),
            "read": tempAllBooks.filter((book) => bookIds["read"].includes(book.id))
          }
        })
      }
    })
  }

  render() {
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
              onChange={(event => this.searchBooks(event.target.value, 10))}
            />
          </div>
        </div>
        <div className="search-books-results custom-search-books-result">
          <div>
            <ListBooks
              shelfTitle="Results"
              shelf = "none"
              books={this.state.results}
              onChangeShelf={this.changeShelfOnSearch}
            />
            <ListBooks
              shelfTitle="Currently Reading"
              shelf = "currentlyReading"
              books={this.state.tempBooks.currentlyReading}
              onChangeShelf={this.changeShelfOnSearch}
            />
            <ListBooks
              shelfTitle="Want To Read"
              shelf = "wantToRead"
              books={this.state.tempBooks.wantToRead}
              onChangeShelf={this.changeShelfOnSearch}
            />
            <ListBooks
              shelfTitle="Read"
              shelf = "read"
              books={this.state.tempBooks.read}
              onChangeShelf={this.changeShelfOnSearch}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks
