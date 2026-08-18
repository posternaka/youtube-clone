export type VideoDto = {
  videoId: string;
  title: string;
  category: string;
  authorName: string;
  authorUrl: string;
};

export type GetOneVideoDto = {
  ok: boolean,
  data: VideoDto | null;
}

export type GetAllVideosDto = {
  ok: boolean,
  data: VideoDto[];
  categories: string[]; 
}

export type OEmbedVideoInfo = {
    title: string,
    author_name: string,
    author_url: string,
    type: string,
    height: number,
    width: number,
    version: string,
    provider_name: string,
    provider_url: string,
    thumbnail_height: number,
    thumbnail_width: number,
    thumbnail_url: string,
    html: string
}

export type AuthUserDto = {
  id: string,
  nickname: string
}