import React, {useEffect, useState} from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";
import {Link, Redirect} from "react-router-dom";
import MUIDataTable from "mui-datatables";

import userData from "../../utils/userData";
import AdminActions from "../../actions/AdminActions";
import {LinearProgress} from "@mui/material";

const user = userData();

export default function UserList() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    if (errors.server) {
        console.log(errors.server);
    }

    // users table
    const columns = ["Email", "First Name", "Last Name", "DOB", "Mobile", "Verified"];
    const options = {
        filterType: 'checkbox',
    };
    let userData = [];

    function fetchData() {
        setLoading(true);
        AdminActions.FetchUsers().then(res => {
            setUsers(res.data);
            setLoading(false);
        }).catch(e => {
            console.log(e);
            setErrors(e.response.data);
            setLoading(false);
        })
    }

    users.map(singleUser =>
        userData.push([singleUser.email, singleUser.firstName, singleUser.lastName, singleUser.dateOfBirth, singleUser.mobile, (singleUser.status).toString()])
    )

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            {user.role === "user" || user.role === "admin" ?
                user.role === "user" ?
                    user.status === true ?
                        <Redirect to="/notes/1"/> :
                        <Redirect to="/reset"/> :
                    ""
                : <Redirect to="/"/>}
            {loading === true ? <LinearProgress /> : ""}
            <Navbar/>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <div className={"form-container con-mid"} style={{marginTop: "56px"}}>
                <h3>Users</h3>
                <Link to={'/create-user'}>
                    + Add user
                </Link>

                <MUIDataTable
                    title={"Employee List"}
                    data={userData}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    );
}