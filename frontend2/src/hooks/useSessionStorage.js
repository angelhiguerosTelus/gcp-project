import { useState } from 'react'

export function useSessionStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = JSON.parse(getCookie('user'))
      return item != null ? item: initialValue
    } catch (e) {
      return initialValue
    }
  })

  const setSessionStorage = value => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    } catch (e) {
      console.log(e)
    }
  }
  return [storedValue, setSessionStorage]
}

export function useSessionStorageList() {
  const item = localStorage
  return item
}

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