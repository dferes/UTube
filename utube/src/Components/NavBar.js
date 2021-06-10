import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse, Button } from 'reactstrap';
import './NavBar.css';
import UserContext from '../FormContext';
import useInputFilter from '../hooks/useInputFilter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBook,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

const UTubeLogo = process.env.PUBLIC_URL + 'images/UTube_Button2.png';
const defaultAvatarImage = process.env.PUBLIC_URL + 'images/default_avatar_icon.png';
const searchButtonIcon = process.env.PUBLIC_URL + 'images/search_glass_symbol.png';
const sidebarMenuIcon = process.env.PUBLIC_URL + 'images/hamburger_icon5.png';


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
        <div className='collapse-menu-div'>
        <Collapse className='collapseMenu' isOpen={!collapsed} navbar>
          
          <div className='collapse-menu-brand-div'>
            <button onClick={toggleNavbar} className='collapse-menu-hamburger-button'>
              <img className='collapse-menu-hamburger-icon' src={sidebarMenuIcon} alt=''/>
            </button>
            <NavbarBrand href='/' className='UTube-icon-side-bar'>
              <img className='UTubeLogo-sidebar' src={UTubeLogo} alt='UTube'/>UTube
            </NavbarBrand>
          </div>
          
          <hr/>
          <Nav navbar> 
            <NavItem>
              <FontAwesomeIcon icon={faHome} className="font-awesome-menu-icon" /> 
              <NavLink to='/'>Home</NavLink> 
            </NavItem>
            <NavItem>
            <FontAwesomeIcon icon={faUser} className="font-awesome-menu-icon" /> 
              <NavLink to='/subscriptions'>Subscriptions</NavLink>  
            </NavItem>
            <hr/>
            <NavItem>
            <FontAwesomeIcon icon={faBook} className="font-awesome-menu-icon" /> 
              <NavLink to='library'>Library</NavLink>  
            </NavItem>
            <NavItem>
            <FontAwesomeIcon icon={faHistory} className="font-awesome-menu-icon" /> 
              <NavLink to='/history'>History</NavLink>  
            </NavItem>
            <hr/>
            { !isLoggedIn &&
            <div className='collapse-menue-sign-in-button-div'>
              <p>Sign in to like videos, comment, and subscribe.</p>
              <Button outline color='primary' className='sidebar-sign-in-button'>SIGN IN
                <img className='default-avatar-icon' src={defaultAvatarImage} alt=''></img>
              </Button> 
            </div>
            }
          </Nav>
        </Collapse>
        </div> 
      </Navbar>
    </div>
  );
};

export default NavBar;