import { BehaviorSubject } from "rxjs";
import { HandleResponse } from "../_helpers";
import axios from 'axios'

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("userData"))
);

const userToken = new BehaviorSubject(
  localStorage.getItem("token")
);

export const AuthenticationService = {
  login,
  logout,
  getMenuItems,
  loginWithTkn,
  currentUser: currentUserSubject.asObservable(),
  userToken:   userToken.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  get tokenValue() {
    return userToken.value;
  },
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`/users/authenticate`, requestOptions)
    .then(HandleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("userData", JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
  });
}

async function loginWithTkn(token) {
  let url = '/boLogin/'+token;
  let config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  let res = await axios.get(url, config);
  return res;
}

async function getMenuItems(roleUrl) {
  let result = await axios.get(roleUrl);
  return result;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("userData");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  currentUserSubject.next(null);
  userToken.next(null);
}
