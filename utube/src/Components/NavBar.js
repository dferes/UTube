import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavbarBrand, NavbarToggler, Collapse, Button } from 'reactstrap';
import useInputFilter from '../hooks/useInputFilter';
import './NavBar.css';
import UserContext from '../FormContext';
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


const NavBar = () => {
  // const { user, videoSearchList, setVideoSearchList, isLoggedIn } = useContext(UserContext);
  const { videoSearchList, setVideoSearchList, isLoggedIn } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);
  const [ formSubmit, setFormSubmit ] = useState(false);
  const history = useHistory();

  const [  
    filter, 
    handleChange, 
    handleSubmit
  ] = useInputFilter({ apiMethod: 'videoSearch', termKey: 'title', globalUpdateFunction: setVideoSearchList} );

  const toggleNavbar = () => setCollapsed(!collapsed);
  
  useEffect( () => {
    const goToResultsPage = async () => {
      await setFormSubmit(false);
      history.push('/search');
    }

    if(formSubmit) goToResultsPage();
    
  }, [videoSearchList, formSubmit, setFormSubmit, history]);

  return (
    <div>
      <Navbar fixed='top' className='UTube-navbar navbar-dark'>
        <div className='navbarBrand'>
          <NavbarToggler onClick={toggleNavbar} className='menuButton'/>
          <NavbarBrand href='/' className='ml-auto'>
            <img className='UTubeLogo' src={UTubeLogo} alt='UTube'/>UTube
          </NavbarBrand>
        </div>

        <div className='video-search-div'>
          <form className='video-title-search-form' onSubmit={ async (evt) => {
            await handleSubmit(evt);
            await setFormSubmit(true);
          } }>
            <label htmlFor='video-title-search' />
            <input 
              className='video-title-search-input'
              id='video-title-search'
              name='title'
              placeholder='Search'
              value={filter.title}
              onChange={handleChange}
            />
            <button className='video-title-search-button'>
              <img 
                className='video-title-search-button-icon' 
                src={searchButtonIcon} 
                alt=''/>
            </button>    
          </form>
        </div>
        { !isLoggedIn &&
          <Button outline color='primary' className='navbar-sign-in-button'>SIGN IN
          <img className='default-avatar-icon' src={defaultAvatarImage} alt='' />
          </Button> 
        }
        <div className='collapse-menu-div'>
        <Collapse className='collapseMenu' isOpen={!collapsed} navbar>
          {/* <div className='collapse-menu-div'> */}
            <div className='collapse-menu-brand-div'>
              <button onClick={toggleNavbar} className='collapse-menu-hamburger-button'>
                <img className='collapse-menu-hamburger-icon' src={sidebarMenuIcon} alt=''/>
              </button>
              <NavbarBrand href='/' className='UTube-icon-side-bar'>
                <img className='UTubeLogo-sidebar' src={UTubeLogo} alt='UTube'/>UTube
              </NavbarBrand>
            </div>
            
            <Nav navbar> 
              <NavItem>
                <div className='nav-link-div'>
                  <FontAwesomeIcon icon={faHome} className="font-awesome-menu-icon" /> 
                  <NavLink to='/'>
                    <p className='navlink-text'>Home</p>
                  </NavLink> 
                </div>
              </NavItem>
              <NavItem>
                <div className='nav-link-div'>
                  <FontAwesomeIcon icon={faUser} className="font-awesome-menu-icon" /> 
                    <NavLink to='/subscriptions'>
                      <p className='navlink-text'>Subscriptions</p>
                    </NavLink>  
                </div>
              </NavItem>
              <hr/>
              <NavItem>
                <div className='nav-link-div'>
                  <FontAwesomeIcon icon={faBook} className="font-awesome-menu-icon" /> 
                    <NavLink to='library'>
                      <p className='navlink-text'>Library</p>
                    </NavLink>  
                </div>
              </NavItem>
              <NavItem>
                <div className='nav-link-div'>
                  <FontAwesomeIcon icon={faHistory} className="font-awesome-menu-icon" /> 
                    <NavLink to='/history'>
                    <p className='navlink-text'>History</p>
                    </NavLink>  
                </div>
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
          {/* </div> */}
        </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;