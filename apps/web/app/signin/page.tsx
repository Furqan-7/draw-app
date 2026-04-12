
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Navigate = useRouter();

    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5"
    }}>
        <div style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "400px"
        }}>

            <div style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 30,
                color: "black"
            }}>
                <p>Sign In</p>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>
                <input style={{
                    height: 50,
                    borderRadius: 8,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderColor: "black",
                    borderWidth: 2,
                    width: "100%",
                    fontSize: 16,
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                }} type="email" placeholder="Enter email" onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <input style={{
                    height: 50,
                    borderRadius: 8,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderColor: "black",
                    borderWidth: 2,
                    width: "100%",
                    fontSize: 16,
                    boxSizing: "border-box",
                    fontFamily: "inherit"
                }} type="password" placeholder="Enter password" onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                color: "black",
                marginTop: 25,
                fontSize: 14
            }}>
                <p>Don't have an account? <span style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    textDecoration: "underline"
                }} onClick={() => {
                    Navigate.push("/signup")
                }}>Sign up</span></p>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 25
            }}>
                <button onClick={async () => {
                    if (email != "" && password != "") {
                        const Response = await axios.post("http://localhost:3001/signin", {
                            email: email,
                            password: password
                        });
                        if (Response.data.valid === true) {
                            localStorage.setItem("token", Response.data.token);
                            Navigate.push("/room");
                        }
                        else {
                            alert("Incorrect Credential");
                        }

                    } else {
                        alert("Please fill all the fields");
                    }
                }} style={{
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: "12px 32px",
                    borderColor: "black",
                    borderWidth: 2,
                    backgroundColor: "black",
                    color: "white",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                }}>Sign In</button>
            </div>

        </div>
    </div>
}