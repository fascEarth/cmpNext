import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from '../context/authContext'

function withAuth(Component) {    

  return function WrappedComponent(props) {
    const router = useRouter()
    const { user } = useAuth()
    useEffect(() => {        
      if (!user) {
        router.replace('/')
      }
    }, [user]);
    return <Component {...props} />
  }

}

export default withAuth
