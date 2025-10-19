import "./BookDetail.css";
import { addBook, addBookToShelf } from "./BooksApi";

export default function BookDetail({ selectedBook }) {
  const {
    title,
    authors,
    translators,
    publisher,
    isbn,
    contents,
    url,
    thumbnail,
  } = selectedBook;
  const token = localStorage.getItem("accessToken");

  const handleClick = async () => {
    try {
      // // 1. books 테이블에 책 저장 요청 (isbn 파라미터 전달)
      const savedBook = await addBook(selectedBook.isbn.split(" ")[0]); // isbn 문자열은 공백으로 여러개가 올 수 있으니 첫번째만 사용

      // // 2. bookshelves 테이블에 책장 추가 요청 (bookId 필요)
      await addBookToShelf(savedBook.id, token);

      alert(`'${savedBook.title}' 책이 책장에 추가되었습니다.`);
    } catch (error) {
      console.error("책장 추가 실패:", error);
      alert(error.response?.data?.message || "책장에 책 추가에 실패했습니다.");
    }
  };

  return (
    <div className="bookDetail-container">
      {/* 상단: 제목 + 썸네일 */}
      <div className="book-header">
        <img className="thumbnail" src={thumbnail} alt={`${title} 썸네일`} />
        <div className="text-info">
          <h1 className="title">{title}</h1>
          <p className="authors">
            저자: {authors?.join(", ")}{" "}
            {translators?.length > 0 && ` / 번역: ${translators.join(", ")}`}
          </p>
          <p className="publisher">출판사: {publisher}</p>
          <p className="isbn">ISBN: {isbn?.split(" ")[0]}</p>
        </div>
      </div>

      <hr />

      {/* 내용 요약 */}
      <div className="book-content">
        <h2>책 소개</h2>
        <p>{contents}</p>
      </div>

      {/* 하단 버튼 */}
      <div className="book-actions">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="go-to-link"
        >
          상세 페이지 보기
        </a>
        <button className="addBookButton" onClick={handleClick}>
          내 서재에 추가
        </button>
      </div>
    </div>
  );
}
