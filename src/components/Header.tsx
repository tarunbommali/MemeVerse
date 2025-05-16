import { MdLanguage, MdMenu, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/localesSlice";
import type { RootState } from "../store/appStore";
import { useState } from "react";

const navMenuList = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Teams", path: "/teams" },
  { name: "Login", path: "/login" },
];

const Header = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector((state: RootState) => state.locale.language);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <>
      {/* Header */}
      <header className="flex justify-between px-4 md:px-16 items-center bg-amber-500 text-white p-4">
        <h2 className="text-2xl font-thin">MemeSync</h2>

        {/* Desktop Menu */}
        <div className="items-center hidden md:flex">
          <nav>
            <ul className="flex space-x-4">
              {navMenuList.map((item) => (
                <li key={item.name}>
                  <a href={item.path} className="hover:text-amber-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language Selector */}
          <div className="md:px-4 flex justify-center items-center border-[1px] rounded-2xl py-[1px] md:mx-2">
            <MdLanguage />
            <select
              onChange={handleChange}
              className="text-white outline-none bg-amber-500 px-2"
              value={currentLang}
            >
              <option value="en">Eng</option>
              <option value="hi">Hin</option>
              <option value="te">Tel</option>
            </select>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </header>

      {/* Mobile Sidebar (below header) */}
      {menuOpen && (
        <aside className="bg-amber-100 w-full px-6 py-4 flex flex-col space-y-4 md:hidden transition-all duration-300 shadow-lg">
          {navMenuList.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 text-lg font-medium hover:text-amber-600"
            >
              {item.name}
            </a>
          ))}

          {/* Mobile Language Selector */}
          <div className="flex items-center border-[1px] rounded-2xl px-2 py-1 w-fit">
            <MdLanguage className="mr-2 text-xl" />
            <select
              onChange={handleChange}
              className="text-gray-800 outline-none bg-amber-100"
              value={currentLang}
            >
              <option value="en">Eng</option>
              <option value="hi">Hin</option>
              <option value="te">Tel</option>
            </select>
          </div>
        </aside>
      )}
    </>
  );
};

export default Header;
