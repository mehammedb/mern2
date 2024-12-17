import Button from "../components/Button";
import { useState } from "react";
import { useUserContext } from "../context/userContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyfields] = useState([]);
  const { dispatch } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setEmptyfields([]);
    const missingFields = [];

    if (!email || !password) {
      if (!email) {
        missingFields.push("email");
      }
      if (!password) {
        missingFields.push("password");
      }
      setEmptyfields(missingFields);
      return setError("Please fill all fields!");
    }
    setLoading(true);
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
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
        onSubmit={handleLogin}
      >
        <h1 className="text-lg text-green-600 font-bold p-3 text-center">
          Login page
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
        <Button
          labelActive={"Login"}
          labelDeactive={"Logging in...."}
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

export default LoginPage;
