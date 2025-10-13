import { useEffect, useState } from "react";
import { getBookShelves } from "./BooksApi";
import BookShelvesCard from "./BookShelvesCard";

export default function MainPage() {
  const [books, setBooks] = useState();

  useEffect(() => {
    const fetchBookShelves = async () => {
      try {
        const shelvesData = await getBookShelves(); // token 없이 호출
        setBooks(shelvesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookShelves();
  }, []); // 빈 배열: 컴포넌트 마운트 시 1회 실행

  return (
    <div style={{ width: "100%" }}>
      <BookShelvesCard books={books} />
    </div>
  );
}
