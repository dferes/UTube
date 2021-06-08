import axios from "axios";
import cloneDeep from 'lodash/cloneDeep';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the UTubeAPI.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class UTubeApi {

  static token;

  static setToken = (token_) => this.token = token_;

  static getToken = () => this.token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.getToken()}` };
    const params = data;
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Checks user's username and the password passed with the 
   * form data and, if valid, returns a token signed with jwt.
   * The payload is the username.
   * Note that the token is also updated in this class.*/ 
  static async logIn(formData) {
    const { username, password } = formData;
    const data = {
      username: username,
      password: password
    };
 
    let res = await this.request(
      'auth/token', 
      data,
      'post'
    );
    
    this.setToken(res.token);
    return res.token;
  }

   /** If all data passed in formData is valid, a new user is created
    *  and added to the database (the user table). A token is created 
    *  and signed with jwt. The payload is the username and password.
    *  Note that the token is also updated in this class. */ 
  static async signup(formData){
    const { username, password, firstName, lastName, email } = formData;
    const data = { // consider just passing the formData instead of recreating the entire object...
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName, 
      email: email
    };

    let res = await this.request(
      'user/register',
      data,
      'post'
    );

    this.setToken(res.token);  
    return res.token;
  }

  /** Accepts the user information:
   *    { username, password, firstname, lastName, avatarImage, coverImage, about }
   *  and can update { firstName, lastName, avatarImage, coverImage, about } 
   *  
   *  Returns {username, createdAt, firstName, lastName, email, avatarImage, coverImage, about}
   * 
   *  Only username and password are required. */ 
  static async update(formData) { 
    const { username, password } = formData;
    await this.request( // Verify the password is correct before updating user
      'auth/token', 
      { username: username, password: password },
      'post'
    );

    const data = cloneDeep(formData);
    delete data.username;
    delete data.password;
      
    let res = await this.request(
      `users/${formData.username}`, 
      data,
      'patch'
    );
      
    return res.user;
  }


  /** Get details on a user by username */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;

    // will need to remove the ensureCorrectUser middleware from the api
  }



  // add a user delete method here

}


export default UTubeApi;