import { authHeader } from './auth';

const BASE_URL = 'https://api.prontoitlabs.com/api/v1/user';

export const listUsers = async ({ page = 0, size = 35 }) => {
  
  const tokenHeader = authHeader();

  const options = {
    method: 'GET',
    headers: {
      ...tokenHeader
    }
  }

  try {
    const response = await fetch(`${BASE_URL}?page=${page}&size=${size}`, options);

    if (response.status !== 200) {
      return ({
        errorMessage: "Error while getting request"
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
