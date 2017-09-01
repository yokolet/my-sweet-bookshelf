import React, { Component } from 'react'

class ListBooks extends Component {
  render() {
    const { shelfTitle, catalog } = this.props
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {catalog.map((book) => (
                <li key={book.id} id={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover"
                           style={{ width: book.cover.width,
                                    height: book.cover.height,
                                    backgroundImage: `url(${book.cover.url})` }}>
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
                    <div className="book-authors">{book.author}</div>
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
