import s from "../LeftMenu/LeftMenu.module.css";
import Link from "next/link";
import Image from "next/image";

import homeIcon from "../../../../shared/assets/icons/home.svg";
import addVideoIcon from "../../../../shared/assets/icons/add-circle.svg";
import profileIcon from "../../../../shared/assets/icons/profile-round.svg";
import videoLibrary from "../../../../shared/assets/icons/video-library.svg";

export const LeftMenu = () => {
  return (
    <aside className={s.leftMenu}>
      <nav className={s.nav}>
        <Link href="/" className={s.link}>
          <Image
            unoptimized
            width="24"
            height="24"
            src={homeIcon}
            alt=""
            aria-hidden="true"
            className={s.icon}
          />
          Home
        </Link>
        <Link href="/profile/123" className={s.link}>
          <Image
            unoptimized
            width="24"
            height="24"
            src={profileIcon}
            alt=""
            aria-hidden="true"
            className={s.icon}
          />
          Profile
        </Link>

        <div className={s.diveder}></div>

        <Link href="/editor/addVideo" className={s.link}>
          <Image
            unoptimized
            width="24"
            height="24"
            src={addVideoIcon}
            alt=""
            aria-hidden="true"
            className={s.icon}
          />
          Add video
        </Link>
        <Link href="/myVideos" className={s.link}>
          <Image
            unoptimized
            width="24"
            height="24"
            src={videoLibrary}
            alt=""
            aria-hidden="true"
            className={s.icon}
          />
          Video Library
        </Link>
      </nav>
    </aside>
  );
};
