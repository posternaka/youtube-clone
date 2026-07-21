import s from "../LeftMenu/LeftMenu.module.css";
import Link from "next/link";

export const LeftMenu = () => {
  return (
    <aside className={s.leftMenu}>
      <nav className={s.nav}>
        <Link href="/editor/addVideo">Add video</Link>
        <Link href="/profile/123">Profile</Link>
      </nav>
    </aside>
  );
};
