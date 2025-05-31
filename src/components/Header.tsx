import { NavLink } from "react-router-dom";
import { SiDiscourse } from "react-icons/si";
import useViewport from "@/hooks/useIsDesktop";

export default function Header() {
  const viewport = useViewport();

  return (
    <nav className="bg-slate-900  text-amber-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center  text-3xl space-x-4 ">
          <SiDiscourse />
          <p>Yfokoi ?</p>
        </NavLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full lg:block lg:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4   lg:flex-row lg:space-x-8  lg:mt-0">
            {viewport === "mobile" && (
              <li>
                <NavLink
                  to="#"
                  className="block py-2 px-3 hover:text-amber-300 duration-300"
                  aria-current="page"
                >
                  Mes Listes
                </NavLink>
              </li>
            )}
            {viewport !== "desktop" && (
              <div className="flex space-x-8 flex-col lg:flex-row">
                <li>
                  <NavLink
                    to="#"
                    className="block py-2 px-3 hover:text-amber-300 duration-300"
                    aria-current="page"
                  >
                    Les Amis
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    className="block py-2 px-3 hover:text-amber-300 duration-300"
                    aria-current="page"
                  >
                    Gestion des Partages
                  </NavLink>
                </li>{" "}
              </div>
            )}
            <li>
              <NavLink
                to="login"
                className="block py-2 px-3 hover:text-amber-300 duration-300"
                aria-current="page"
              >
                Connexion
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                className="block py-2 px-3 hover:text-amber-300 duration-300"
                aria-current="page"
              >
                Inscription
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
