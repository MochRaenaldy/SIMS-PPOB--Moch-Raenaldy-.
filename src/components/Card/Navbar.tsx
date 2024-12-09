import logo from "../../assets/Logo.png";

const Navbar = () => {
  return (
    <nav className="h-16 flex items-center border-b">
      <ul className="flex gap-4 ml-4">
        <img src={logo} alt="" />
        <li>
          <p className="font-bold">
            {" "}
            <a href="/">SIMS PPOB</a>
          </p>
        </li>
      </ul>
      <ul className="ml-auto flex gap-4 hover:cursor-pointer ">
        <li className="hover:text-red-500">
          <a href="/topup">Top up</a>
        </li>
        <li className="hover:text-red-500">
          <a href="/transaction">Transaction</a>
        </li>
        <li className="hover:text-red-500 mr-4">
          <a href="/profile">Akun</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
