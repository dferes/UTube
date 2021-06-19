import React, { useContext, useState, useEffect, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, NavbarBrand, Button, UncontrolledDropdown, 
  DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown } from 'reactstrap';
import useInputFilter from '../hooks/useInputFilter';
import './NavBar.css';
import UserContext from '../FormContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faThumbsUp,
  faHistory,
  faIdCard,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import UTubeApi from '../api';

const UTubeLogo = process.env.PUBLIC_URL + 'images/UTube_Button2.png';
const defaultAvatarImage = process.env.PUBLIC_URL + 'images/default_avatar_icon.png';
const searchButtonIcon = process.env.PUBLIC_URL + 'images/search_glass_symbol.png';
const sidebarMenuIcon = process.env.PUBLIC_URL + 'images/hamburger_icon5.png';


const NavBar = () => {
  const { videoSearchList, setVideoSearchList, user, userTokenAndUsername, 
    setUserTokenAndUsername } = useContext(UserContext);
  const userAvatar = user.avatarImage ? user.avatarImage: defaultAvatarImage;
  // const [dropdownOpenLeft, setOpenLeft] = useState(false);  
  const [dropdownOpen, setOpen] = useState(false);  
  const [ formSubmit, setFormSubmit ] = useState(false);
  const [ readyToRender, setReadyToRender ] = useState(false);

  const history = useHistory();

  const toggle = () => setOpen(!dropdownOpen);
  // const toggleLeft = () => setOpenLeft(!dropdownOpenLeft);

  const [  
    filter, 
    handleChange, 
    handleSubmit
  ] = useInputFilter({ apiMethod: 'videoSearch', termKey: 'title', globalUpdateFunction: setVideoSearchList} );

  
  useEffect( () => {
    const goToResultsPage = async () => {
      await setFormSubmit(false);
      history.push('/search');
    }

    if(formSubmit) goToResultsPage();
    
  }, [videoSearchList, formSubmit, setFormSubmit, history]);


  const getUser = useCallback( async () => {
    await UTubeApi.getUser(userTokenAndUsername.username);
  }, [userTokenAndUsername]);


  // doesn't work as intended...
  useEffect( () => {
    if(userTokenAndUsername.token){
      getUser();
      console.log('----------------------');
    }
    setReadyToRender(true);
  }, [setUserTokenAndUsername, userTokenAndUsername, getUser, user]);


  return (
    <> 
      { readyToRender && 
        <Navbar fixed='top' className='UTube-navbar navbar-dark'>
          {/* <ButtonDropdown isOpen={dropdownOpenLeft} toggle={toggleLeft} nav inNavbar> */}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle 
              className='navbar-dropdown-menu-toggle-button' nav
              style={{
                backgroundColor: 'rgb(32, 32, 32)', 
                width: '4em',
                marginTop: '-0.8em',
                height: '3em',
                marginLeft: '0.9em'
              }}  
            />
            <img className='collapse-menu-hamburger-icon-collapse' src={sidebarMenuIcon} alt=''/>
            <DropdownMenu className='navbar-dropdown-menu' 
              style={{
                backgroundColor: 'rgb(32, 32, 32)',
                marginLeft: '0',
                borderWidth: '0',
                marginTop: '0.3em'
  
              }}
            >
              <DropdownItem>
                <NavLink to='/'>
                  <div className='nav-link-div'>
                    <FontAwesomeIcon icon={faHome} className="font-awesome-menu-icon" /> 
                      <p className='navlink-text'>Home</p> 
                  </div>
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink to='/subscriptions'>
                  <div className='nav-link-div'>
                    <FontAwesomeIcon icon={faUser} className="font-awesome-menu-icon" /> 
                      <p className='navlink-text'>Subscriptions</p>
                  </div>
                </NavLink>  
              </DropdownItem>
              <DropdownItem divider style={{backgroundColor: 'rgb(64, 64, 64)'}}/>
              <DropdownItem>
                <NavLink to='/liked-videos'>
                  <div className='nav-link-div'>
                    <FontAwesomeIcon icon={faThumbsUp} className="font-awesome-menu-icon" /> 
                      <p className='navlink-text'>Liked Videos</p>
                  </div>
                </NavLink>  
              </DropdownItem>
              <DropdownItem>
                <NavLink to='/history'>
                  <div className='nav-link-div'>
                    <FontAwesomeIcon icon={faHistory} className="font-awesome-menu-icon" /> 
                    <p className='navlink-text'>History</p>      
                  </div>
                </NavLink>
              </DropdownItem>
              <DropdownItem divider style={{backgroundColor: 'rgb(64, 64, 64)'}} />
  
              { !user.token &&
                <div className='collapse-menu-sign-in-button-div'>
                  <p>Sign in to like videos, comment, and subscribe.</p>
                  <Button href='/login' outline color='primary' className='sidebar-sign-in-button'>SIGN IN
                    <img className='default-avatar-icon' src={defaultAvatarImage} alt=''></img>
                  </Button> 
                </div>
              }
            </DropdownMenu>
          </UncontrolledDropdown>
          <div style={{
              marginLeft: '-11em',
              marginBottom: '0.9em'
          }}>
            <NavbarBrand href='/' >
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
          { !user.token &&
            <Button href='/login' outline color='primary' className='navbar-sign-in-button'>SIGN IN
            <img className='default-avatar-icon' src={defaultAvatarImage} alt='' />
            </Button> 
          }
          { user.token && 
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className='navbar-user-dropdown-button' nav inNavbar>
              <DropdownToggle 
                className='navbar-user-dropdown-menu-toggle-button' nav
                style={{
                  width: '3em',
                  height: '3em',
                  borderRadius: '1.5em',
                  marginTop: '-0.6em',
                  marginBottom: '0.1em',
                  marginLeft: '8em'
                }} 
              >
                <img className='navbar-user-avatar' src={userAvatar} alt=''/>  
              </DropdownToggle>  
              <DropdownMenu className='navbar-user-dropdown-menu' 
                style={{
                  backgroundColor: 'rgb(32, 32, 32)',
                  marginRight: '3em',
                  marginTop: '2.2em',
                  width: '13.2em',
                  borderWidth: '0'
                }}
              >
                <DropdownItem divider style={{backgroundColor: 'rgb(64, 64, 64'}}/>  
                <DropdownItem>
                  <NavLink to={`/profile/${user.username}`}  >
                    <div className='user-navlink-div'>
                      <FontAwesomeIcon icon={faIdCard} className="font-awesome-user-menu-icon" /> 
                        <p className='user-navlink-text'>Your Channel</p> 
                    </div>
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider style={{backgroundColor: 'rgb(64, 64, 64'}}/>    
                <DropdownItem onClick={ async () => await setUserTokenAndUsername({})}>
                  <NavLink to='/' >
                    <div className='user-navlink-div'>
                      <FontAwesomeIcon icon={faSignOutAlt} className="font-awesome-user-menu-icon" /> 
                        <p className='user-navlink-text'>Logout</p> 
                    </div>
                  </NavLink>
                </DropdownItem>    
              </DropdownMenu>
            </ButtonDropdown>
          }
        </Navbar>
      }
    </>
  );
};

export default NavBar;