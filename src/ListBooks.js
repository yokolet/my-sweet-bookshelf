import React, { Component } from 'react'

class ListBooks extends Component {
  render() {
    const { shelfTitle, shelf, books } = this.props
    let showingBooks
    showingBooks = books.filter(book => book.shelf === shelf)
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {showingBooks.map((book) => (
                <li key={book.id} id={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover"
                           style={{ width: 128,
                                    height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                      </div>
                      <div className="book-shelf-changer">
                        <select>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
