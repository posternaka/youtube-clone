"use client";

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
          <iframe
            key={videoId}
            width="150"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        ))
      ) : (
        <div>Not videos</div>
      )}
    </div>
  );
};
