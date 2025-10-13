import instance from "../api/axiosinstance";

const getBookShelves = async () => {
  try {
    const response = await instance.get(`/bookshelves`);

    const shevlesData = await response.data.data;
    return shevlesData;
  } catch (error) {
    throw error;
  }
};

const searchBooks = async (query, page = 1, size = 12) => {
  try {
    const response = await instance.get(
      `/books?query=${encodeURIComponent(query)}&page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addBook = async (isbn) => {
  try {
    const response = await instance.post(`/books/${isbn}`);
    return response.data.data; // 저장된 책 데이터 반환 (id 등 포함)
  } catch (error) {
    throw error;
  }
};

const addBookToShelf = async (bookId) => {
  try {
    const response = await instance.post(`/bookshelves/${bookId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getBookShelves, searchBooks, addBook, addBookToShelf };
