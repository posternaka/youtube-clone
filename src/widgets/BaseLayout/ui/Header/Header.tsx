import s from "../Header/Header.module.css";
import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  profileId: string;
};

export const Header = ({ profileId }: HeaderProps) => {
  return (
    <header className={s.header}>
      <Link href="/">
        <Image
          width="53"
          height="20"
          src="/logo.svg"
          alt="Logo image"
          loading="eager"
        />
      </Link>

      <div className={s.partRight}>
        <Link href="/editor/addVideo" className={s.createVideoLink}>
          Create
        </Link>

        <Link href={`/profile/${profileId}`} className={s.yourProfileLink}>
          <div className={s.hiddenText}>Move to profile</div>
        </Link>
      </div>
    </header>
  );
};
