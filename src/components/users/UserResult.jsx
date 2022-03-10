import React, { useEffect, useState,useContext } from 'react';
import Spinner from "../../components/layout/assests/Spinner"
import UserItem from "./UserItem"
import GithubContext from "../../context/github/GithubContext"
export default function UserResult() {
    const { users, loading } = useContext(GithubContext);
    // useEffect(() => {
    //     fetchUsers();
    // }, []);
    if (!loading) {
       return  <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-col-2 m-auto">
        {
            users.map((user) => {
                return <UserItem
                    
                    key={user.id}
                    user={user}
                    
                />
            })
        }
    </div>
    } else {
        return <Spinner />
    }
}
