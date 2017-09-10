import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Custom.css'

class ListBooks extends Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    allBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth
    }
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth
    })
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  bookCoverStyle = (imageUrl) => {
    let style
    if (this.state.width > 760) {
      style = {
        width: 128,
        height: 192,
        backgroundImage: `url(${imageUrl})`
      }
    } else if (this.state.width > 350){
      style = {
        width: 102,
        height: 154,
        backgroundImage: `url(${imageUrl})`
      }
    } else {
      style = {
        width: 80,
        height: 124,
        backgroundImage: `url(${imageUrl})`
      }
    }
    return style
  }

  render() {
    const { shelfTitle, shelf, books, allBooks, onChangeShelf } = this.props
    let noBook = shelfTitle === "Results" ? "No Results" : "No Book"

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title custom-shelf-title">{shelfTitle}</h2>
          <div className="bookshelf-books">
            { books && books.length > 0 ? (
              <ol className="books-grid">
                { books.map((book) => (
                  <li key={book.id} id={book.id}>
                    <div className="book">
                      <div className="book-top">
                        { book.imageLinks && book.imageLinks.thumbnail &&
                          <div className="book-cover custom-book-cover"
                               style={this.bookCoverStyle(book.imageLinks.thumbnail)}>
                          </div>
                        }
                        <div className="book-shelf-changer">
                          <select
                            value={shelf}
                            onChange={(event) => onChangeShelf(book, event.target.value, allBooks)}>
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
              <div className="no-book">{noBook}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
