import Image from "next/image";

export const NotFoundPage = () => {
  return (
    <div>
      <Image
        loading="eager"
        width="500"
        height="300"
        src="/notFound.png"
        alt="Not Found"
      />
    </div>
  );
};
