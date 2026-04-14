"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSigninSuccess = (response: any) => {
    console.log("Sign In Success:", response);
    localStorage.setItem("token", response.token);
    router.push("/room");
  };

  const handleSigninError = (error: any) => {
    console.error("Sign In Error:", error);
    alert("Incorrect credentials");
  };

  const handleSignupSuccess = (response: any) => {
    console.log("Sign Up Success:", response);
    router.push("/room");
  };

  const handleSignupError = (error: any) => {
    console.error("Sign Up Error:", error);
    alert("User already exists or error occurred");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black">
            {isSignin ? "Sign In" : "Sign Up"}
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {isSignin ? null : (
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Enter name"
              className="h-12 border-2 border-black rounded-lg px-4 text-base font-sans text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
            />
          )}

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter email"
            className="h-12 border-2 border-black rounded-lg px-4 text-base font-sans text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter password"
            className="h-12 border-2 border-black rounded-lg px-4 text-base font-sans text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setLoading(true);
              if (isSignin) {
                <Signin
                  email={email}
                  password={password}
                  onSuccess={handleSigninSuccess}
                  onError={handleSigninError}
                  onFinally={() => setLoading(false)}
                />;
              } else {
                <Signup
                  name={name}
                  email={email}
                  password={password}
                  onSuccess={handleSignupSuccess}
                  onError={handleSignupError}
                  onFinally={() => setLoading(false)}
                />;
              }
            }}
            disabled={loading}
            className="bg-black text-white font-semibold text-base py-3 px-8 rounded-lg border-2 border-black hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : isSignin ? "Sign In" : "Sign Up"}
          </button>
        </div>

        <div className="text-center mt-6 text-sm">
          {isSignin ? (
            <p className="text-black">
              Don't have an account?
              <Link
                href="/signup"
                className="font-semibold text-black underline hover:text-gray-700 ml-1"
              >
                Sign Up
              </Link>
            </p>
          ) : (
            <p className="text-black">
              Already have an account?
              <Link
                href="/signin"
                className="font-semibold text-black underline hover:text-gray-700 ml-1"
              >
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Signup({
  name,
  email,
  password,
  onSuccess,
  onError,
  onFinally,
}: {
  name: string;
  email: string;
  password: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
  onFinally: () => void;
}): any {
  axios
    .post("http://localhost:3001/signup", {
      name: name,
      email: email,
      password: password,
    })
    .then((response) => onSuccess(response.data))
    .catch((error) => onError(error))
    .finally(() => onFinally());
}

function Signin({
  email,
  password,
  onSuccess,
  onError,
  onFinally,
}: {
  email: string;
  password: string;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
  onFinally: () => void;
}): any {
  axios
    .post("http://localhost:3001/signin", {
      email: email,
      password: password,
    })
    .then((response) => onSuccess(response.data))
    .catch((error) => onError(error))
    .finally(() => onFinally());
}
