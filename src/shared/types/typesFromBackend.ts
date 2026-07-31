export type VideoDto = {
  videoId: string;
  title: string;
  authorName: string;
  authorlUrl: string;
};

export type AllVideoDto = {
  ok: boolean,
  data: VideoDto[];
}