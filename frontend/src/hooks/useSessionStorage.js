import { useState } from 'react'

export function useSessionStorage(key, initialValue) {
  const [storedValue, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item != null ? JSON.parse(item) : initialValue
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