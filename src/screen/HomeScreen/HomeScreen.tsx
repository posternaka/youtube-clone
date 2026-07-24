"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const getData = await fetch("/api/videos");
        const response = await getData.json();

        setData(response.data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data && data?.length > 0 ? (
        data.map((videoId) => (
          <Link href={`/video/${videoId}`} key={videoId}>
            <Image
              width="250"
              height="150"
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={`video ${videoId}`}
            />
          </Link>
        ))
      ) : (
        <div>Not videos</div>
      )}
    </div>
  );
};
