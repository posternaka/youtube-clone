import Image from "next/image";
import Link from "next/link";

import s from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <Image
        unoptimized
        loading="eager"
        width="200"
        height="300"
        src="/notFound.svg"
        alt="Not Found"
        className={s.image}
      />
      <p>This page is unavailable.</p>
      <p>Maybe we should look for something else?</p>
      <Link href="/">
        <Image
          unoptimized
          width="73"
          height="40"
          src="/logo.svg"
          alt="Logo image"
          loading="eager"
        />
      </Link>
    </div>
  );
};
