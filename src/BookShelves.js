import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

class BookShelves extends Component {
  static propTypes = {
    bookShelfData: PropTypes.array.isRequired,
    allBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { bookShelfData, allBooks, onChangeShelf} = this.props

    return (
      <div>
        { bookShelfData.map(shelfData => (
          <ListBooks
            shelfTitle={shelfData["shelfTitle"]}
            shelf={shelfData["shelf"]}
            books={shelfData["books"]}
            allBooks={allBooks}
            onChangeShelf={onChangeShelf}
          />
        )) }
      </div>
    )
  }
}

export default BookShelves
