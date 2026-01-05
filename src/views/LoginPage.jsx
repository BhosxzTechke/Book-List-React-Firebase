import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import { 
  createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } 
  from "firebase/auth";
import { auth } from '../firebase/config.js';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice.js';


function LoginPage() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [error, setError] = useState('');

  const [userCredentials, setUserCredentials] = useState({});


  console.log(auth);




        onAuthStateChanged(auth,(user) => {
                if (user) {
                  dispatch(setUser({id: user.uid, email: user.email}));
                }
                else {
                  dispatch(setUser(null));
                }

                  if (isLoading) {setIsLoading(false)}
        });



      function HandleCredentials(e) {
        setUserCredentials({...userCredentials, [e.target.name] : e.target.value});

          console.log(userCredentials);
      }




    
      async function HandleResetPass() {
        const email = prompt('Please enter your email');

        if (!email) return;

        try {
          await sendPasswordResetEmail(auth, email);
          alert('Email sent! Check your inbox.');
        } catch (error) {
          alert(error.message);
        }
      }





        function HandleSignup(e){
          e.preventDefault();
          
            createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)

              .catch((error) => {
                setError(error.message)

                // ..
              });

            }


            function HandleSignin(e){
                e.preventDefault();
          
                signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    
                .catch((error) => {
                  setError(error.message)

                });


            }






  
    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the bossKe Books Library</h1>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>



              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>


            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input onChange={(e) => {HandleCredentials(e)}} type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input onChange={(e) => {HandleCredentials(e)}} type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e) => {HandleSignin(e)}} className="active btn btn-block">Login</button>
                    : 
                    <button onClick={(e) => {HandleSignup(e)}} className="active btn btn-block">Sign Up</button>
                  }


                  {
                    error && 
                    <div className='error'>
                      {error}
                  </div>
                  }

                  <p onClick={HandleResetPass} className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  