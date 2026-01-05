import { NavLink } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { setUser } from "../store/usersSlice";
import { useDispatch } from "react-redux";

function Header({pageTitle}) {



  const dispatch = useDispatch()



          function SignOutHandler(){
                  signOut(auth).then(() => {

                    dispatch(setUser(null))
                      
                  }).catch((error) => {
                    console.log(error)
                  });
            }


    return (
      <>

            <h1>{pageTitle}</h1>

            <div className="header-btns">

                    <NavLink to="/">
                      <button className="btn">
                          Books
                      </button>
                    </NavLink>

                    <NavLink to="/add-book">
                      <button className="btn">
                          Add Book +
                      </button>
                    </NavLink>

                    <button onClick={SignOutHandler} className="btn transparent">
                      Logout
                    </button>


            </div>
    
      </>
    )
  }
  
  export default Header
  