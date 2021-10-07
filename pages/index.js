import styles from '../styles/Home.module.css'
import React from "react"
import { Provider } from "react-redux"
import firebase from "firebase/compat/app"
import { createStore, combineReducers, compose} from "redux"
import { ReactReduxFirebaseProvider, firebaseReducer} from "react-redux-firebase"
import firebaseConfig from "../config.js"
import Students from "../components/Students.js"
import 'firebase/compat/auth'

// configure redux
const rrConfig ={
  userProfile: 'users'
}

// initialize firebase
firebase.initializeApp(firebaseConfig)

//add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
})

//create store with reducers and init state
const initialState ={}
const store = createStore(rootReducer, initialState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const rrfProps = {
  firebase,
  config: rrConfig,
  dispatch: store.dispatch
}



export default function Home() {
  return (
    <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <div className={styles.container}>
          <Students />
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
    </React.StrictMode>
  )
}
