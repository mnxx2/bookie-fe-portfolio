import React, { useState } from "react";
import { searchBooks, addBook, addBookToShelf } from "./BooksApi";
import SearchBar from "./SearchBar";
import BookCard from "./BookCard";

export default function SearchArea() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => setQuery(e.target.value);

  const fetchBooks = async (q, pageNum) => {
    try {
      setLoading(true);
      const result = await searchBooks(q, pageNum, 12);
      setBooks(result.documents);
      setIsEnd(result.meta?.is_end || false);
      setPage(pageNum);
    } catch (err) {
      console.error("검색 실패:", err);
      alert("책 검색에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchBooks(query, 1);
  };

  const handleBookClick = async (book) => {
    try {
      setLoading(true);

      // 1. books 테이블에 책 저장 요청 (isbn 파라미터 전달)
      const savedBook = await addBook(book.isbn.split(" ")[0]); // isbn 문자열은 공백으로 여러개가 올 수 있으니 첫번째만 사용

      // 2. bookshelves 테이블에 책장 추가 요청 (bookId 필요)
      await addBookToShelf(savedBook.id, token);

      alert(`'${savedBook.title}' 책이 책장에 추가되었습니다.`);
    } catch (error) {
      console.error("책장 추가 실패:", error);
      alert(error.response?.data?.message || "책장에 책 추가에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (page > 1) fetchBooks(query, page - 1);
  };

  const handleNext = () => {
    if (!isEnd) fetchBooks(query, page + 1);
  };

  return (
    <div style={{ width: "100%" }}>
      <SearchBar
        query={query}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "40px" }}>검색 중...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: "20px",
              justifyItems: "center",
              padding: "2px 10px",
              height: "710px",
            }}
          >
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.isbn}
                  onClick={() => handleBookClick(book)}
                  style={{ cursor: "pointer" }}
                >
                  <BookCard book={book} />
                </div>
              ))
            ) : (
              <p
                style={{
                  gridColumn: "1 / -1",
                  color: "#777",
                  textAlign: "center",
                }}
              >
                검색 결과가 없습니다.
              </p>
            )}
          </div>

          {books.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={handlePrev}
                disabled={page === 1}
                style={{
                  padding: "8px 16px",
                  marginRight: "10px",
                  cursor: "pointer",
                  backgroundColor: "rgba(174, 89, 253, 1)",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                이전
              </button>
              <span style={{ margin: "0 10px" }}>{page} 페이지</span>
              <button
                onClick={handleNext}
                disabled={isEnd}
                style={{
                  padding: "8px 16px",
                  marginLeft: "10px",
                  cursor: "pointer",
                  backgroundColor: "rgba(174, 89, 253, 1)",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
