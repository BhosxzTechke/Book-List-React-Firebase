import Book from '../components/Book.jsx';
import Header from '../components/Header.jsx';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { fetchBooks, selectBooks } from '../store/booksSlice.js';
import { Link } from 'react-router-dom';

function BooksPage() {

  const pageTitle = "Test Deployment";


  const dispatch = useDispatch();
  const books = useSelector(selectBooks).books;
  const booksStatus = useSelector(selectBooks).status;


    useEffect(() => {

              if(booksStatus == 'idle') {
                dispatch(fetchBooks());
              }
    },
    
    []);
  


  console.log(booksStatus)

    
    return (
      <>
            <div className="container">
          <Header pageTitle={pageTitle} />
          <div className="books-container">

          { books.length ?
 
                <div className="books-list">
                    
                    {books.map(book => 
                    
                    <Book key={book.id} book={book}  />
                    
                    )}

                </div>
    
        

          : booksStatus == 'loading' ?
          
            <div>...Loading</div>
          
        : <div>You dont have a book if you want then <Link to='/add-book'>Add Books</Link></div>
        
      }
        
          </div>
        </div> 


      </>
    )
  }
  
  export default BooksPage
  