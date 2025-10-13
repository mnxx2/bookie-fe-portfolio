import "./BookShelvesCard.css";

export default function BookShelvesCard({ books = [] }) {
  return (
    <div className="bookshelf-wrapper">
      <h2 className="bookshelf-title">나의 책장</h2>

      <div className="bookshelf-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-slot" key={book.id}>
              {book.bookshelfItems?.thumbnail ? (
                <img
                  src={book.bookshelfItems.thumbnail}
                  alt={book.bookshelfItems.title}
                  className="book-thumbnail"
                />
              ) : (
                <div
                  className="book-thumbnail"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#999",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  표지 없음
                </div>
              )}
              <div className="book-title" title={book.bookshelfItems?.title}>
                {book.bookshelfItems?.title}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-message">등록된 책이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
