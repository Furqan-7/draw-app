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
        alignItems: "center"
    }}>
        <div style={{
            marginTop: 100
        }}>

            <div style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 600
            }}>
                <p>Signup </p>
            </div>



            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <input style={{
                    marginTop: 20,
                    height: 35,
                    borderRadius: 10,
                    paddingLeft: 10,
                    borderColor: "black",
                    borderWidth: 1,
                    width: 230
                }} type="text" placeholder="Enter Name " onChange={(e) => {
                    setName(e.target.value);
                }} />
                <input style={{
                    marginTop: 20,
                    height: 35,
                    borderRadius: 10,
                    paddingLeft: 10,
                    borderColor: "black",
                    borderWidth: 1,
                    width: 230
                }} type="email" placeholder="Enter email " onChange={(e) => {
                    setEmail(e.target.value);
                }} />
                <input style={{
                    marginTop: 20,
                    height: 35,
                    borderRadius: 10,
                    paddingLeft: 10,
                    borderColor: "black",
                    borderWidth: 1,
                    width: 230
                }} type="password" placeholder="Enter password " onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
                marginTop: 20
            }}>
                <p>Already have an account ? <span style={{
                    cursor: "pointer"
                }} onClick={() => {
                    Navigate.push("/signin")
                }}>Signin</span></p>
            </div>


            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20
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
                    fontSize: 18,
                    borderRadius: 10,
                    padding: 4,
                    borderColor: "black",
                    borderWidth: 1
                }}>Signup</button>
            </div>




        </div>
    </div>
}