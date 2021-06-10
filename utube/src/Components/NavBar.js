import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse, Button } from 'reactstrap';
// import Sidebar from 'react-bootstrap-sidebar';
import './NavBar.css';
import UserContext from '../FormContext';
import useInputFilter from '../hooks/useInputFilter';

const  UTubeLogo = process.env.PUBLIC_URL + 'images/UTube_Button2.png';
const defaultAvatarImage = process.env.PUBLIC_URL + 'images/default_avatar_icon.png';
const searchButtonIcon = process.env.PUBLIC_URL + 'images/search_glass_symbol.png';


const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { user } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const [ 
    resultList, 
    filter, 
    handleChange, 
    handleSubmit, 
    isEmpty 
  ] = useInputFilter({ defaultList: [] , apiMethod: 'videoSearch', termKey: 'title'} );

  return (
    <div>
      <Navbar className='UTube-navbar navbar-dark'>
        <div className='navbarBrand'>
          <NavbarToggler onClick={toggleNavbar} className='menuButton'/>
          <NavbarBrand href='/' className='ml-auto'>
            <img className='UTubeLogo' src={UTubeLogo} alt='UTube'/>UTube
          </NavbarBrand>
        </div>

        <div className='video-search-div'>
          <form className='video-title-search-form' onSubmit={handleSubmit}>
            <label htmlFor='video-title-search' />
            <input 
              className='video-title-search-input'
              id='video-title-search'
              name='title'
              placeholder='Search'
              value={filter.title}
              onChange={handleChange}
            />
            <button className='video-title-search-button' color='primary'>
              <img 
                className='video-title-search-button-icon' 
                src={searchButtonIcon} 
                alt=''/>
            </button>    
          </form>
        </div>
        { !isLoggedIn &&
          <Button outline color='primary' className='navbar-sign-in-button'>SIGN IN
          <img className='default-avatar-icon' src={defaultAvatarImage} alt=''></img>
          </Button> 
        }    
        <Collapse className='collapseMenu' isOpen={!collapsed} navbar>
          <Nav navbar> 
            <NavItem>
              <NavLink to='/'>Home</NavLink>  
            </NavItem>
            <NavItem>
              <NavLink to='/'>Subscriptions</NavLink>  
            </NavItem>
            <NavItem>
              <NavLink to='/'>Library</NavLink>  
            </NavItem>
            <NavItem>
              <NavLink to='/'>History</NavLink>  
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;