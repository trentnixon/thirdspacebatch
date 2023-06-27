import { useState } from "react";
// Login Components and Utils
import { fetcher } from "lib/api";
import { useFetchUser, useUser } from "lib/authContext";
import { setToken, unsetToken } from "lib/auth";

// layout for page

export const LoginForm = () => {
  const { user, loading } = useUser();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier,
          password: data.password,
        }),
      }
    );
    setToken(responseData);
  };

  const logout = () => {
    unsetToken();
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="text-blueGray-400 text-center mb-3 font-bold">
        <small>Sign in with credentials</small>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Email
          </label>
          <input
            type="text"
            name="identifier"
            onChange={handleChange}
            placeholder="Username"
            required
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              id="customCheckLogin"
              type="checkbox"
              className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
            />
            <span className="ml-2 text-sm font-semibold text-blueGray-600">
              Remember me
            </span>
          </label>
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};
