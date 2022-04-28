import { useState } from 'react'

export function useSessionStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item != null ? JSON.parse(item) : initialValue
    } catch (e) {
      return initialValue
    }
  })

  const setSessionStorage = value => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      setValue(value)
    } catch (e) {
      console.log(e)
    }
  }
  return [storedValue, setSessionStorage]
}

export function useSessionStorageList() {
  const item = window.sessionStorage
  return item
}