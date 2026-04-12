"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";



export default function SignupPage() {
    const [name, setName] = useState("");
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
                <p>Sign Up</p>
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
                }} type="text" placeholder="Enter name" onChange={(e) => {
                    setName(e.target.value);
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
                <p>Already have an account? <span style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    textDecoration: "underline"
                }} onClick={() => {
                    Navigate.push("/signin")
                }}>Sign in</span></p>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 25
            }}>
                <button onClick={async () => {
                    if (name != "" && email != "" && password != "") {
                        const Response = await axios.post("http://localhost:3001/signup", {
                            name: name,
                            email: email,
                            password: password
                        })

                        if (Response.data.valid === true) {
                            Navigate.push("/room");
                        }
                        else {
                            alert("User Already Exists");
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
                }}>Sign Up</button>
            </div>

        </div>
    </div>
}