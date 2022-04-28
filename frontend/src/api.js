const BASE_URL = "";




const callApi = async (endpoint, options) => {
	const res = await fetch(`http://localhost:8000${endpoint}`, options)
	const data = await res.json()
	return data
}

const api = {
  users: {
    login(params) {
      return callApi(`/user`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
    create(params) {
      return callApi(`/user/add`, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
  },
};

export default api;