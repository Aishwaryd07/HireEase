import React,{useState} from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {FaBarsStaggered, FaXmark} from 'react-icons/fa6'
import Login from '../Pages/Login';

const Navbar = ({isLoading , handleLogout, userData, handleLogin, isAuthenticated}) => {
    const[isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const handleMenuToggler = () =>{
        setIsMenuOpen(!isMenuOpen);
    }
    const openLoginPopup = () => {
      setShowLoginPopup(true);
    };
  
    const closeLoginPopup = () => {
      setShowLoginPopup(false);
    };
    
    const navigate = useNavigate();

    const navItems = [
      {path:"/", title:"Start a Search"},
      {path:"/my-job", title:"My Jobs"},
      {path:"/post-job", title:"Post a Job"},
  ]

  const LoginPopup = ({ handleLogout }) => (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md">
        <Login handleLogin={handleLogin} closeLoginPopup={closeLoginPopup} />
      </div>
    </div>
  );
  


  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <nav className='flex justify-between items-center py-6'>
            <a href='/' className='flex items-center gap-2 text-2xl text-black'>
              <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="30"
          viewBox="0 0 29 30"  
          fill="none"
        >
          <circle
          cx="12.0143"
          cy="12.5143"
          r="12.01243"
          fill="#3575E2"
          fillOpacity="0.4"
          />
          <circle cx="16.9857" cy="17.4857" r="12.0143" fill='#3575E2'></circle>
        </svg><span>JobPortal</span>
        </a>
          <ul className='hidden md:flex gap-12'>
            {navItems.map(({path, title}) => (
              <li key={path} className='text-base text-primary'>
                <NavLink
                  to={path}
                  className={({isActive}) => isActive? "active" : ""}
                >{title}</NavLink>
              </li>
            ))}
          </ul>
          {/* {signup and login button} */}
          {isLoading?<></>:
          <>
          {isAuthenticated?
          <>
          <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
            <Link  className='py-2 px-5 border rounded bg-blue text-white' onClick={handleLogout} >Logout</Link>
          </div>
          </>:
          <>
          <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
            <Link onClick={openLoginPopup} className='py-2 px-5 border rounded'>Login</Link>
            <Link to='/sign-up' className='py-2 px-5 border rounded bg-blue text-white'>Sign up</Link>
          </div>
          {showLoginPopup && <LoginPopup handleLogout={closeLoginPopup} />}
          </>}
          </>}

          {/* mobile menu */}
          <div className='md:hidden block'>
            <button onClick={handleMenuToggler}>
              {
                isMenuOpen?<FaXmark className='w-5 h-5 text-primary'/>:<FaBarsStaggered className='w-5 h-5 text-primary'/>
              }
            </button>
          </div>
        </nav>
        {/* {navitems for mobile} */}
        <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
          <ul>
          {navItems.map(({path, title}) => (
              <li key={path} className='text-base text-white first:text-white py-1'>
                <NavLink
                  to={path}
                  className={({isActive}) => isActive? "active" : ""}
                >{title}</NavLink>
              </li>
            ))}
            <li className='text-white'><Link to="/login" >Login</Link></li>
          </ul>
        </div>
    </header>
  )
}

export default Navbar