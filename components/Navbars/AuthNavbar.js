import React, { useState } from "react";
import Link from "next/link";
// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
import { fetcher } from "lib/api";
import { useUser } from "lib/authContext";
import { setToken, unsetToken } from "lib/auth";

export default function Navbar(props) {
  const { user, loading } = useUser();
  console.log(props);

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
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
                Notus NextJS
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-auth-navbar"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  Docs {user}
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li>
                <Link href="/">
                  <a
                    className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                    href="#pablo"
                  >
                    Home
                  </a>
                </Link>
              </li>
              <li className="flex items-center">
                <PagesDropdown />
              </li>
              {!loading &&
                (user ? (
                  <li>
                    <Link href="/admin/dashboard">
                      <a className="md:p-2 py-2 block hover:text-purple-400">
                        Dashboard
                      </a>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href="/auth/login">
                      <a
                        className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                        href="#pablo"
                      >
                        Login
                      </a>
                    </Link>
                  </li>
                ))}
              {!loading &&
                (user ? (
                  <li>
                    <a
                      className="md:p-2 py-2 block hover:text-purple-400"
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </a>
                  </li>
                ) : (
                  ""
                ))}
              {/* {!loading && !user ? (
                <>
                  <li>
                    <form onSubmit={handleSubmit} className="form-inline">
                      <input
                        type="text"
                        name="identifier"
                        onChange={handleChange}
                        placeholder="Username"
                        className="md:p-2 form-input py-2 rounded mx-2"
                        required
                      />
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                        className="md:p-2 form-input py-2 rounded mx-2"
                        required
                      />

                      <button
                        className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                  </li>
                </>
              ) : (
                ""
              )} */}

              {/* <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20NextJS%20UI%20Kit%20and%20Admin.%20Let%20Notus%20NextJS%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level."
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li> */}

              {/* <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/creativetimofficial/notus-nextjs?ref=nnjs-auth-navbar"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </a>
              </li> */}

              {/* <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Download
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
