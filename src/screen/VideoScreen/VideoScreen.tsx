"use client";

type VedioScreenProps = {
  videoId: string;
};

export const VideoScreen = ({ videoId }: VedioScreenProps) => {
  return (
    <iframe
      key={videoId}
      width="550"
      height="300"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
  );
};
