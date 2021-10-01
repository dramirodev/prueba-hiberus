import { useCallback, useEffect, useState } from 'react'
import { isCancel } from 'axios'
import { getUsers } from 'services/users'

export default function useFetchUser() {
  const [data, setData] = useState([])

  const getUsersData = useCallback(async () => {
    try {
      const users = await getUsers()
      setData(users)
    } catch (error) {
      if (isCancel(error)) {
        console.log('Request canceled', error.message)
      }
    }
  }, [])

  useEffect(() => {
    getUsersData()
  }, [getUsersData])

  return [data, getUsersData]
}
