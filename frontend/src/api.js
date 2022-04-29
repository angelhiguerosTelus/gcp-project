const BASE_URL = "";
const token= {headers:{"Authorization": `Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOjIsImlhdCI6MTY1MTI2OTE4OCwiZXhwIjoxNjUyMzA1OTg4fQ.8FyTgqUK3L7X287MRQJhpQ4kqyeZ3i4h-m2dXw5vU0o`}, }
async function callApi(endpoint, options = {}) {
  options.headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Credentials": "true",
  };
  options.credentials = "include";
  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

const api = {  
  users: {
    login(params) {
      return callApi(`/signin`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
    create(params) {
      return callApi(`/signup`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
  },
  controlAlbum: {
    createNewAlbum(params) {
      return callApi(`/insertDataAlbum`, {
        method: "POST",
        headers:{"Authorization": `Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOjIsImlhdCI6MTY1MTI2OTE4OCwiZXhwIjoxNjUyMzA1OTg4fQ.8FyTgqUK3L7X287MRQJhpQ4kqyeZ3i4h-m2dXw5vU0o`}, 
        body: JSON.stringify(params),
      });
    },
  },
  union: {
    insert(params) {
      return callApi(`/insertDataUnion`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
  },
};

export default api;