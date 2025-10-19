export default function SearchBar({ query, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      style={{ marginBottom: "20px", textAlign: "center" }}
    >
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder="책 제목 또는 저자를 입력하세요"
        style={{
          padding: "10px",
          width: "60%",
          fontSize: "16px",
          border: "none",
          borderRadius: "6px",
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: "10px",
          padding: "8px 16px",
          fontSize: "16px",
          backgroundColor: "sienna",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        검색
      </button>
    </form>
  );
}
