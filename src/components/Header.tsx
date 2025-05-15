import { MdLanguage } from "react-icons/md";

const Header = () => {
  return (
    <header className="flex justify-between px-16 items-center bg-amber-500 text-white p-4">
      <h2 className="text-2xl font-thin">MemeSync</h2>
      <div className="flex items-center">
      <nav>
        <a className="mx-2" href="/">
          Home
        </a>
        <a className="mx-2" href="/about">
          About
        </a>
        <a className="mx-2" href="/contact">
          Contact
        </a>
        <a className="mx-2" href="/teams">
          Teams
        </a>
        <a className="mx-2" href="/login">
          Login
        </a>
      </nav>
      <div className="px-4 flex justify-center items-center  border-[1px] rounded-2xl py-[1px] mx-2">
        <MdLanguage />
        <select className=" text-white outline-none bg-amber-500 px-2">
          <option value="en">Eng</option>
          <option value="hi">Hin</option>
          <option value='te'>Tel</option>
        </select>
      </div>
      </div>
    </header>
  );
};

export default Header;
