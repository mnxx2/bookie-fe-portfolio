import { useState } from "react";
import BookModal from "./BookModal";
import "./BookShelvesCard.css";

export default function BookShelvesCard({ books = [], refetchShelves }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = (book) => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);

  // 한 줄에 7권의 책만 오도록, 나머지는 밑줄로
  const booksPerRow = 7;
  const chunkedBooks = [];

  for (let i = 0; i < books.length; i += booksPerRow) {
    chunkedBooks.push(books.slice(i, i + booksPerRow));
  }

  return (
    <div className="bookshelf-wrapper">
      {/* <h2 className="bookshelf-title">나의 책장</h2> */}

      {chunkedBooks.length > 0 ? (
        chunkedBooks.map((row, rowIndex) => (
          <div className="bookshelf-row" key={rowIndex}>
            {row.map((book) => (
              <div className="book-slot" key={book.id}>
                <div className="book-clickable" onClick={() => openModal(book)}>
                  {book.bookshelfItems?.thumbnail ? (
                    <img
                      src={book.bookshelfItems.thumbnail}
                      alt={book.bookshelfItems.title}
                      className="book-thumbnail"
                    />
                  ) : (
                    <div className="book-thumbnail no-thumbnail">표지 없음</div>
                  )}
                  <div
                    className="book-title"
                    title={book.bookshelfItems?.title}
                  >
                    {book.bookshelfItems?.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="empty-message">등록된 책이 없습니다.</div>
      )}

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={closeModal}
          onSave={refetchShelves}
        />
      )}
    </div>
  );
}
