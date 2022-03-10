import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
console.log(GITHUB_URL, GITHUB_TOKEN)

export const GithubProvider = ({ children }) => {
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const initialState = {
    users: [],
    user: {},
    repos:[],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    try {
      setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    
    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const {items} = await res.json();
   
  
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
    } catch (e) {
      console.log(e)
    }
  };

  // 
  const getUser = async (login) => {
  
     
     

      const res = await fetch(`${GITHUB_URL}/users/${login}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
 
  
      if (res.status === 404) {
  window.location  = "/notfound"
      } else {
        
        const data = await res.json();

      dispatch({
        type: 'GET_USER',
        payload:data,
      });
    }
  
  
  };
  // get user repositories
  const getRepos = async (login) => {
    try {
      setLoading();
      const params = new URLSearchParams({
      sort: "created",
    });
      const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });

      const data = await res.json();
       console.log(data,login)
      dispatch({
        type: 'GET_REPOS',
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };

    const clearSearch = () => {
        dispatch({
            type: 'CLEAR_SEARCH',
        });
    }

  // set Loading
  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    });


  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos:state.repos,
        searchUsers,
        clearSearch,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
