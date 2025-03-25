import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    console.log("Sending login request:", { username, password });

    try {
      const response = await axios.post(
        "http://localhost:8080/authenticate",
        { username, password },
        { withCredentials: true } // Let browser handle cookie
      );

      console.log("Response from backend:", response.data);
      alert("Login successful!");

      // ✅ Use role sent from backend
      const role = response.data.role;

      if (role === "ADMIN") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-96 p-6 shadow-lg bg-white rounded-lg">
        <div className="flex flex-col items-center mb-4">
          <LockClosedIcon className="w-12 h-12 text-[#03613a] mb-2" />
          <h2 className="text-2xl font-bold text-gray-700">Sign In</h2>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username" className="mb-2 block">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2 block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2 accent-[#03613a]" />
              <Label htmlFor="remember" className="cursor-pointer">
                Remember Me
              </Label>
            </div>
            <a href="#" className="text-[#03613a] hover:underline">
              Forgot Password?
            </a>
          </div>

          <Button type="submit" className="w-full bg-[#03613a] text-white hover:bg-[#024a2b] mt-2">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
