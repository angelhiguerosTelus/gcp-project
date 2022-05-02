const BASE_URL = "";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function callApi(endpoint, options = {}) {
  options.headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookie('token'),
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
    deleteAccount(params) {
      return callApi(`/closeAccunt`, {
        method: "DELETE",
        body: JSON.stringify(params),
      });
    },
    update(params) {
      return callApi(`/userUpdateInfo`, {
        method: "PUT",
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
    deleteFromalbum(params) {
      return callApi(`/deleteImageFromAlbum`, {
        method: "DELETE",
        body: JSON.stringify(params),
      });
    },
    deleteFromalbum(params) {
      return callApi(`/deleteImageFromAlbumWithoutId`, {
        method: "DELETE",
        body: JSON.stringify(params),
      });
    },
    addFavorite(params) {
      return callApi(`/newFav`, {
        method: "PUT",
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
    removeAlbum(params) {
      return callApi(`/deleteAlbum`, {
        method: "DELETE",
        body: JSON.stringify(params),
      });
    },
    getPhotos(params) {
      return callApi(`/oneDataImage`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
    getFavoritesPhotos(params) {
      return callApi(`/getFavoritesImages`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
    getAlbums(params) {
      return callApi(`/getAlbums/`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
    getAlbumInfo(params) {
      return callApi(`/getAlbums/${params}`, {
        method: "GET",
      });
    },
    getAlbumPhotos(params) {
      return callApi(`/getAlbums/${params}/photos`, {
        method: "GET",
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
