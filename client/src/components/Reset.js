import React, {useState} from "react";
import Helmet from "react-helmet";
import Navbar from "./Layout/Navbar";
import {Redirect} from "react-router-dom";
import Box from "@mui/material/Box";
import {Button, CircularProgress, FormGroup, LinearProgress} from "@mui/material";
import TextField from "@mui/material/TextField";

import userData from "../utils/userData";
import UserActions from "../actions/UserActions";

const user = userData();

export default function Reset() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    if (errors.server) {
        console.log(errors.server);
    }

    const onChange = e => {
        if (e.target.id === "firstName") {
            setFirstName(e.target.value)
        }
        if (e.target.id === "lastName") {
            setLastName(e.target.value)
        }
        if (e.target.id === "dateOfBirth") {
            setDateOfBirth(e.target.value)
        }
        if (e.target.id === "mobile") {
            setMobile(e.target.value)
        }
        if (e.target.id === "password") {
            setPassword(e.target.value)
        }
        if (e.target.id === "password2") {
            setPassword2(e.target.value)
        }
    };

    const onSubmit = e => {
        setLoading(true);
        e.preventDefault();
        UserActions.UpdateUserInfo(firstName, lastName, dateOfBirth, mobile, password, password2).then(() => {
            localStorage.removeItem("jwt");
            document.location.href = '/';
            setLoading(false);
        }).catch(e => {
            console.log(e);
            setErrors(e.response.data);
            setLoading(false);
        })
    };

    return (
        <div>
            {user.role === "user" || user.role === "admin" ?
                user.role === "user" ?
                    user.status === true ?
                        <Redirect to="/notes/1"/> :
                        "" :
                    <Redirect to="/users"/>
                : <Redirect to="/"/>}
            {loading === true ? <LinearProgress /> : ""}
            <Navbar/>
            <Helmet>
                <title>User Details</title>
            </Helmet>
            <div className={"form-container con-mid"} style={{marginTop: "56px"}}>
                <div className={"form-card con-mid"}>
                    {/*<form noValidate onSubmit={this.onSubmit}>*/}
                    <Box
                        component="form"
                        sx={{'& > :not(style)': {m: 1, width: '25ch'},}}
                        noValidate
                        autoComplete="on"
                        onSubmit={onSubmit}
                    >
                        <FormGroup>
                            <h5>User Details</h5>
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                onChange={onChange}
                                id="firstName"
                                label="First name"
                                variant="filled"
                                style={{margin: "10px 0"}}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />
                            <TextField
                                onChange={onChange}
                                id="lastName"
                                label="Last name"
                                variant="filled"
                                style={{margin: "10px 0"}}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                            <TextField
                                onChange={onChange}
                                id="dateOfBirth"
                                label="Date of birth"
                                style={{padding: "10px 0"}}
                                variant="filled"
                                type="date"
                                error={!!errors.dateOfBirth}
                                helperText={errors.dateOfBirth}
                            />
                            <TextField
                                onChange={onChange}
                                id="mobile"
                                label="Mobile number"
                                variant="filled"
                                style={{margin: "10px 0"}}
                                error={!!errors.mobile}
                                helperText={errors.mobile}
                            />
                            <TextField
                                onChange={onChange}
                                id="password"
                                label="New password"
                                variant="filled"
                                style={{margin: "10px 0"}}
                                type={"password"}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <TextField
                                onChange={onChange}
                                id="password2"
                                label="Confirm new password"
                                variant="filled"
                                style={{margin: "10px 0"}}
                                type={"password"}
                                error={!!errors.password2}
                                helperText={errors.password2}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button
                                type="submit"
                                variant="contained">
                                {loading === true ?
                                    <CircularProgress size="1rem" color={"inherit"} style={{
                                        marginBottom: "-2px",
                                    }}/>
                                    : "Update"}
                            </Button>
                        </FormGroup>
                    </Box>
                </div>
            </div>
        </div>
    );
}