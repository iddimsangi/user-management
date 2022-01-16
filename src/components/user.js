import React from 'react'
import {Link} from "react-router-dom"

const User = ({user}) => {
    return (
        <Link to={`/users/${user?.id}`}>
            name: {user?.firstName}&nbsp;{user?.lastName} <br />
            emai: {user?.email} <br />
            status: {user?.active ? "Active" : "Inactive"}
            <hr />
        </Link>
    )
}

export default User
