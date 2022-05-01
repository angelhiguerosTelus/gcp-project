const BASE_URL=''
let token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOjIsImlhdCI6MTY1MTM3ODc2MywiZXhwIjoxNjUyNDE1NTYzfQ.xpw7lKNUktMNI6IqslErEeLctAC7s2sUisCOsCWXXdg"
async function callApi(endpoint, options = {}) {
  options.headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer "+token,
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
  image: {
    addImage(params) {
      return callApi(`/insertDataImagen`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
  },
  controlAlbum: {
    createNewAlbum(params) {
      return callApi(`/insertDataAlbum`, {
        method: "POST",
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