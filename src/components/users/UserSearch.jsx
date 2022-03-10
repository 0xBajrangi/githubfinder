import { useState, useContext } from 'react';
import GithubContext from "../../context/github/GithubContext"
import AlertContext from "../../context/alert/AlertContext"

export default function UserSearch() {
    const [text, setText] = useState('');
    const { users,searchUsers,clearSearch } =useContext(GithubContext);
    const {setAlert} = useContext(AlertContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
     setAlert("Please Enter Something " , "error")
    } else {
      //search UserSearch
      console.log(text)
        searchUsers(text)
      setText('');
    }
  };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:gird-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              className="w-full pr-40 bg-gray-200 input input-lg text-black"
              placeholder="Search"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
            >
              Go
            </button>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={clearSearch} className="btn-ghost btn-lg">clear</button>
        </div>
      )}
    </div>
  );
}
