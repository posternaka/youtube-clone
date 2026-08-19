import s from "../Header/Header.module.css";
import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  userId?: string;
};

export const Header = ({ userId }: HeaderProps) => {
  return (
    <header className={s.header}>
      <Link href="/">
        <Image
          unoptimized
          width="53"
          height="20"
          src="/logo.svg"
          alt="Logo image"
          loading="eager"
        />
      </Link>

      <div className={s.partRight}>
        {userId ? (
          <>
            <Link href="/editor/addVideo" className={s.createVideoLink}>
              Create
            </Link>

            <Link href={`/profile/${userId}`} className={s.yourProfileLink}>
              <div className={s.hiddenText}>Move to profile</div>
            </Link>
          </>
        ) : (
          <Link href="/auth/login" className={s.createVideoLink}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
