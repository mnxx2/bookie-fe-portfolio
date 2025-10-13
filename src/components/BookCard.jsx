import "./BookCard.css"; // 아래에서 따로 작성

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <img
        src={book.thumbnail || "썸네일이 없습니다"}
        alt={book.title}
        className="book-thumbnail"
      />
      <div className="book-title">{book.title}</div>
    </div>
  );
}
