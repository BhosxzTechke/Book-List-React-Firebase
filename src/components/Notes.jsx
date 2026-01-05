
import { useDispatch} from 'react-redux';
import { eraseNote, addNote} from '../store/notesSlice.js';
import { useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config.js';

function Notes({bookId}) {
    
    const dispatch = useDispatch();
    
    const handleEraseNote = async(id) => {
            if(confirm('you want to delete notes')) {

      try {
            await deleteDoc(doc(db, "notes", id));
            SetNotes(notes.filter(note => note.id != id))
            SetStatus("success");
        
            } catch (error) {
              alert(error.message)
            }

          }
    }




    

    const handleAddNote = async(e) => {
      e.preventDefault();


      try {

        const newNote = {
        book_id: bookId,
        title: document.querySelector('input[name=title]').value,
        text: document.querySelector('textarea[name=note]').value
      }

      if (newNote.title && newNote.text) {

          const docRef = await addDoc(collection(db, "books"), newNote);
          newNote.id = docRef.id

          SetNotes([...notes, newNote])
          document.querySelector('input[name=title]').value = "";
          document.querySelector('textarea[name=note]').value = "";

      } else {
          alert('Please fill the mandatory fields.');
      }
        
      } catch (error) {

        alert(error.message)
        
      }


  }



    // const notes = useSelector(selectNotes).filter(note => note.book_id == bookId);
    

  const fetchNotes = async (book_id) => {


      try {

        const q = query(collection(db, "notes"), where("book_id", "==", book_id));
        const querySnapshot = await getDocs(q);
        let notesList = []
        querySnapshot.forEach((doc) => {
          notesList.push({...doc.data(), id: doc.id});
          // // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());

        });

        SetNotes(notesList);
        SetStatus("success");

      } catch (error) {
            console.log(error.message)
            SetStatus("error")
              
            }
  }




    const [fetchStatus, SetStatus] = useState("idle");
    const [notes, SetNotes] = useState("");


    useEffect(()=> {

          if(fetchStatus == "idle") {
            fetchNotes(bookId)
            
          }
    }, [])


    return (
      <>

        <div className="notes-wrapper">

            <h2>Readers Notes</h2>



            {notes ?

              <div className="notes">
              {notes.map(note => 
                  <div key={note.id} className="note">
                      <div onClick={()=>handleEraseNote(note.id)} className="erase-note">Erase note</div>
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                  </div>
                  )}
              </div>

              : fetchStatus == 'success' ?

              <div>
              <p>This book doesnt have notes yet. Use the form below to add a note</p>
              </div>

              :  <p>loading on erasing</p>
            }


            <details>
                <summary>Add a note</summary>
                <form className="add-note">
                    <div className="form-control">
                        <label>Title *</label>
                        <input type="text" name="title" placeholder="Add a note title" />
                    </div>
                    <div className="form-control">
                        <label>Note *</label>
                        <textarea type="text" name="note" placeholder="Add note" />
                    </div>
                    
                    <button onClick={(e)=>{handleAddNote(e)}}className="btn btn-block">Add Note</button>
                </form>
            </details>

        </div>

      </>
    )
  }
  
  export default Notes
  