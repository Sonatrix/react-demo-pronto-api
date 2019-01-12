// function to call auth api

const BASE_URL = 'https://api.prontoitlabs.com/api/v1/user';

export const register = async ({ userName, password, gender }) => {

  const options = {
    method: 'POST',
    body: JSON.stringify({
      userName,
      password,
      gender
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(BASE_URL, options);

    if (response.status !== 200 ) {
      return ({
        errorMessage: response.errorMessage || "error in generating request or already exists"
      })
    }

    const resObj = response.json();

    return resObj;
  } catch (ex) {
    return ({
      errorMessage: ex
    })
  }
}

export const login = async ({ userName, password }) => {

  const options = {
    method: 'POST',
    body: JSON.stringify({
      userName,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/login`, options);

    if (response.status !== 200 ) {
      return ({
        errorMessage: response.errorMessage || "Error in request"
      })
    }
    
    const resObj = response.json();

    return resObj;
  } catch (ex) {

    return ({
      errorMessage: ex
    })
  }
}

export const verifyToken = async ({ token }) => {

  const options = {
    method: 'POST',
    headers: {
      'X-AUTH-TOKEN': token
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/verify-token`, options);
    const resObj = response.json();

    return resObj;
  } catch (ex) {

    return ({
      errorMessage: ex
    })
  }
}

export const logout = () => {
  localStorage.removeItem("user");
  return true;
}

export const  authHeader = () => {
    // return authorization header with jwt token

    const user = JSON.parse(localStorage.getItem('user')) || {};

    if (user && user.token) {
        return { 'X-AUTH-TOKEN': user.token };
    } else {
        return {};
    }
}

export const  isLoggedIn = () => {
    // return authorization header with jwt token
    const data = JSON.parse(localStorage.getItem('user')) || {};
    const {user, token} = data;
    if (data && token) {
        return user;
    } else {
        return false;
    }
}

