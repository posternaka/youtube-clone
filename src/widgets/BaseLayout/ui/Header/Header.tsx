import s from "../Header/Header.module.css";
import Image from "next/image";
import Link from "next/link";

import Logo from "./logo.png";

export const Header = () => {
  return (
    <header className={s.header}>
      <Link href="/">
        <Image width="40" src={Logo} alt="Logo" />
      </Link>
    </header>
  );
};
