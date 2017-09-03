import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { shelfTitle, shelf, books, onChangeShelf } = this.props

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfTitle}</h2>
          <div className="bookshelf-books">
            {books && books.length > 0 ? (
              <ol className="books-grid">
                {books.map((book) => (
                  <li key={book.id} id={book.id}>
                    <div className="book">
                      <div className="book-top">
                        {book.imageLinks && book.imageLinks.thumbnail &&
                          <div className="book-cover"
                               style={{ width: 128,
                                        height: 193,
                                        backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                          </div>
                        }
                        <div className="book-shelf-changer">
                          <select value={shelf}
                                onChange={(event) => onChangeShelf(book, event.target.value)}>
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
            ) : (
              <div>No Book</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
