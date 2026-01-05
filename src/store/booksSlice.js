import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc, addDoc} from 'firebase/firestore';
import { db, auth } from '../firebase/config';

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle'
  },
  
  reducers: {
    // addBook: (books, action) => {
    //   let newBook = action.payload;
    //   newBook.id = books.length ? Math.max(...books.map(book => book.id)) + 1 : 1;
    //   books.push(newBook);
    // }
    // eraseBook: (books, action) => {
    //     return books.filter(book => book.id != action.payload);
    // },
    // toggleRead: (books, action) => {
    //     books.map(book => {
    //       if (book.id == action.payload) {
    //         book.isRead = !book.isRead;
    //       }
    //     });
    // }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.books = action.payload;
        console.log('success')
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
        console.log(action.error.message)
      })


      .addCase(toggleRead.fulfilled, (state, action) => {
        const { id, isRead } = action.payload;

        const book = state.books.find(b => b.id === id);
        
        if (book) {
          book.isRead = isRead;
        }
      })


      
        .addCase(eraseBook.pending, (state, action) => {
          state.status = 'loading'
          console.log('loading')

        })

        .addCase(eraseBook.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.books = state.books.filter(book => book.id != action.payload)

        })

        .addCase(eraseBook.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message ?? 'Unknown Error'
          console.log(action.error.message)
        })




        .addCase(addBook.pending, (state, action) => {
          state.status = 'loading'
        })

        .addCase(addBook.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.books.push(action.payload)
        })

        .addCase(addBook.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message ?? 'Unknown Error'
          console.log(action.error.message)
        })



    }

})




export const selectBooks = state => state.books;

export default booksSlice.reducer;



      export const fetchBooks = createAsyncThunk('books/fetchbooks', async () => {


              const q = query(collection(db, "books"), where("user_id", "==", auth.currentUser.uid));

              const querySnapshot = await getDocs(q);
              let bookList = [];
              querySnapshot.forEach((doc) => {
                bookList.push({id: doc.id, ...doc.data()})
              });


              return bookList
      })



      export const toggleRead = createAsyncThunk('books/toggleRead', async (payload) => {

          const bookRef = doc(db, "books", payload.id);
          const newValue = !payload.isRead;

          await updateDoc(bookRef, {
            isRead: newValue
          });

          return { id: payload.id, isRead: newValue };
        }

    );





      export const eraseBook = createAsyncThunk('books/eraseBooks', async (payload) => {
              await deleteDoc(doc(db, "books", payload));
              return payload
        })



      export const addBook = createAsyncThunk('books/addBook', async (payload) => {
              let newBooks = payload;
              newBooks.user_id = auth.currentUser.uid;


              // Add a new document with a generated id.
              const docRef = await addDoc(collection(db, "books"),newBooks);
              newBooks.id = docRef.id;
              return newBooks;

      })

      







