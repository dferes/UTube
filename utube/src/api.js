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
  static async login(formData) {
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
    return res;
  }

   /** If all data passed in formData is valid, a new user is created
    *  and added to the database (the user table). A token is created 
    *  and signed with jwt. The payload is the username and password.
    *  Note that the token is also updated in this class. */ 
  static async signup(formData){
    const { username, password, firstName, lastName, email } = formData;
    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName, 
      email: email
    };

    let res = await this.request(
      'users/',
      data,
      'post'
    );

    this.setToken(res.token);  
    return res;
  }

  /** Accepts the user information:
   *    { username, password, firstname, lastName, avatarImage, coverImage, about }
   *  and can update { firstName, lastName, avatarImage, coverImage, about } 
   *  
   *  Returns {username, createdAt, firstName, lastName, email, avatarImage, coverImage, about}
   * 
   *  Only username and password are required. */ 
  static async userUpdate(formData) { 
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
   
  static async videoSearch(title='') {
    let res = await this.request(
      'videos', 
      title,
      'get'
    );

    return res.videos;
  }


  static async getVideo(id) {
    let res = await this.request(`videos/${id}` );
    return res.video;
  }

  static async setVideoLike(like) {
    const { username, videoId } = like;
    const data = {
      username: username,
      videoId: videoId
    };
 
    let res = await this.request(
      'likes/', 
      data,
      'post'
    );
    console.log('-------========>>>', res.videoLike);
    return res.videoLike;
  }

  static async unlike(unlikeData) {
    const { username, videoId } = unlikeData;
    const data = {
      username: username,
      videoId: videoId
    };
 
    let res = await this.request(
      'likes/', 
      data,
      'delete'
    );
    console.log('-------========>>>', res.videoLike);
    return res.videoLike;
  }


  static async setSubscription(sub) {
    const { subscriberUsername, subscribedToUsername } = sub;
    const data = {
      subscriberUsername: subscriberUsername,
      subscribedToUsername: subscribedToUsername
    };
 
    let res = await this.request(
      'subscriptions/', 
      data,
      'post'
    );
    console.log('-------========>>>', res.sub);
    return res.sub;
  }

  static async unsubscribe(sub) {
    const { subscriberUsername, subscribedToUsername } = sub;
    const data = {
      subscriberUsername: subscriberUsername,
      subscribedToUsername: subscribedToUsername
    };
 
    let res = await this.request(
      'subscriptions/', 
      data,
      'delete'
    );
    console.log('-------========>>>', res.sub);
    return res.sub;
  }

  static async setVideoView(view) {
    const { username, videoId } = view;
    const data = {
      username: username,
      videoId: videoId
    };
 
    let res = await this.request(
      'views/', 
      data,
      'post'
    );
    
    return res.view;
  }

  static async setVideoComment(comment) {
    const { username, videoId, content } = comment;
    const data = {
      username: username,
      videoId: videoId,
      content: content
    };
    console.log('1111111111111111111000--->>', data);
 
    let res = await this.request(
      'comments/', 
      data,
      'post'
    );
    
    return res.view;
  }

}


export default UTubeApi;