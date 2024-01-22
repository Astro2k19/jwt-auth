import LoginForm from "./components/LoginForm.tsx";
import {useAppDispatch, useAppSelector} from "./store/store.ts";
import {logoutApi} from "./api/logoutApi.ts";
import {useEffect} from "react";
import {checkAuthApi} from "./api/checkAuthApi.ts";
import {fetchUsers} from "./api/fetchUsers.ts";


function App() {
  const {isLoading, isAuth, user, users} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
         dispatch(checkAuthApi())
        }
    }, [])


    if (isLoading) {
        return 'Loading...'
    }

  if (!isAuth || !user) {
    return (
        <div>
          Log in or authorize
          <LoginForm />
        </div>
    )
  }

  return (
    <div>
      You are logged in!
      Account is {user.isActivated ? 'activated' : 'not activated'}
      Your email {user.email}
      <button onClick={() => dispatch(logoutApi())}>Log out</button>
      <button onClick={() => dispatch(fetchUsers())}>Get all users</button>
        {users ? users.map(item => (
            <div>
                {item.email}
            </div>
        )) : undefined}
    </div>
  )
}

export default App
