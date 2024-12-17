import Button from "../components/Button";
import { useState } from "react";
import { useUserContext } from "../context/userContext";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyfields] = useState([]);
  const { dispatch } = useUserContext();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setEmptyfields([]);
    const missingFields = [];

    if (!email || !password || !repassword) {
      if (!email) {
        missingFields.push("email");
      }
      if (!password) {
        missingFields.push("password");
      }
      if (!repassword) {
        missingFields.push("repassword");
      }
      setEmptyfields(missingFields);
      return setError("Please fill all fields!");
    }

    if (password !== repassword) {
      return setError("Password must be the same!");
    }
    setLoading(true);
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "LOGIN", payload: data });
    } else {
      setError(data.error);
    }
    setLoading(false);
  };
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <form
        className="bg-white flex flex-col w-[400px] p-2 gap-2 rounded-xl"
        onSubmit={handleSignup}
      >
        <h1 className="text-lg text-green-600 font-bold p-3 text-center">
          Signup page
        </h1>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            className={`p-2 border ${
              emptyFields.includes("email") ? "border-red-400" : ""
            }`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            className={`p-2 border ${
              emptyFields.includes("password") ? "border-red-400" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Re-Password</label>
          <input
            type="password"
            className={`p-2 border ${
              emptyFields.includes("repassword") ? "border-red-400" : ""
            }`}
            onChange={(e) => setRePassword(e.target.value)}
            value={repassword}
          />
        </div>
        <Button
          labelActive={"SignUp"}
          labelDeactive={"Signing in...."}
          isDisabled={loading}
        />
        {error && (
          <p className="bg-red-200 border border-red-600 text-red-600 p-3">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignUpPage;
