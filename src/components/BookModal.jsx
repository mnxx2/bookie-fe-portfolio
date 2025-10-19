import { useState, useEffect } from "react";
import "./BookModal.css";
import { updateBookReport } from "./BooksApi";

export default function BookModal({ book, onClose, onSave }) {
  const [status, setStatus] = useState("reading");
  const [rating, setRating] = useState(0);
  const [shortReport, setShortReport] = useState("");
  const [bookReport, setBookReport] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(book);
  // 모달이 열릴 때마다 props로 받은 값으로 상태를 초기화
  useEffect(() => {
    setStatus(book.status || "reading");
    setRating(book.rating || 0);
    setShortReport(book.shortReport || "");
    setBookReport(book.bookReport || "");
  }, [book]);

  const handleSubmit = async () => {
    const updatedData = {
      status,
      rating,
      shortReport,
      bookReport,
    };

    try {
      setLoading(true);
      await updateBookReport(book.id, updatedData);
      alert("독서록이 저장되었습니다!");
      await onSave?.();
      onClose();
    } catch (error) {
      console.error("독서록 저장 실패:", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        {/* 책 정보 */}
        <div className="modal-header">
          <img
            src={book.bookshelfItems.thumbnail}
            alt={book.bookshelfItems.title}
            className="modal-thumbnail"
          />
          <div>
            <h2 className="modal-title">{book.bookshelfItems.title}</h2>
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="modal-body">
          <div className="form-group">
            <label>읽은 상태</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="reading">읽는 중</option>
              <option value="finished">완독</option>
              <option value="plan">읽을 예정</option>
            </select>
          </div>

          <div className="form-group">
            <label>별점 (0~5)</label>
            <input
              type="number"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value, 10))}
            />
          </div>

          <div className="form-group">
            <label>메모</label>
            <input
              type="text"
              value={shortReport}
              onChange={(e) => setShortReport(e.target.value)}
              placeholder="읽은 페이지 수나 짧은 메모를 적어보세요."
            />
          </div>

          <div className="form-group">
            <label>독서 기록</label>
            <textarea
              value={bookReport}
              onChange={(e) => setBookReport(e.target.value)}
              rows="6"
              placeholder="자세한 감상이나 인상 깊은 문장을 적어보세요."
            />
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="modal-footer">
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
