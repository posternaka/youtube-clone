import { OEmbedVideoInfo } from "@/src/shared/types/typesFromBackend";

type VideoId = string;

type VideoDataContent = {
    id: VideoId,
    categoryId: string,
    userId: string
}

const videosData = new Map<VideoId, VideoDataContent>([
    ['FvOpPeKSf_4', {userId: "0", id: 'FvOpPeKSf_4', categoryId: 'games'}],
    ['Uz8pCfNIs7k', {userId: "0", id: 'Uz8pCfNIs7k', categoryId: 'news'}],
    ['M9z3ucb6f7c', {userId: "0", id: 'M9z3ucb6f7c', categoryId: 'sport'}],
    ['2I2D7q0AsL8', {userId: "0", id: '2I2D7q0AsL8', categoryId: 'humor'}],
    ['nRNHcCHbPx0', {userId: "0", id: 'nRNHcCHbPx0', categoryId: 'humor'}],
    ['eAajijL6e0w', {userId: "0", id: 'eAajijL6e0w', categoryId: 'music'}],
    ['N17ZDhB88Nk', {userId: "0", id: 'N17ZDhB88Nk', categoryId: 'games'}],
    ['99ds4d88thk', {userId: "0", id: '99ds4d88thk', categoryId: 'games'}],
    ['wgej_DhuoxA', {userId: "0", id: 'wgej_DhuoxA', categoryId: 'humor'}],
    ['eQmSOvrk1_U', {userId: "0", id: 'eQmSOvrk1_U', categoryId: 'sport'}],
]);

export async function GET(request: Request) {
    const urlObject = new URL(request.url);
    const videoIdParam = urlObject.searchParams.get('videoId');
    const categoryIdParam = urlObject.searchParams.get('categoryId');
    const userIdParam = urlObject.searchParams.get('userId');
    
    if (videoIdParam) {
        try {
            const rawResults = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoIdParam}&format=json`);

            const videoInfo = await rawResults.json() as OEmbedVideoInfo;

            const authorUrl = videoInfo.author_url.split('/').at(-1); 

            const results = {
                videoId: videoIdParam,
                title: videoInfo.title,
                authorName: videoInfo.author_name,
                authorUrl
            }
            
            return Response.json({ ok: true, data: results });
        } catch (error) {
            console.error(error);
            return Response.json({ ok: false, data: null }, { status: 500 });
        }
    }

    try {
        const categories = Array.from(new Set([...videosData].map((data) => data[1].categoryId)));

        const promises = [...videosData]
        .filter(data => categoryIdParam ? data[1].categoryId === categoryIdParam : true)
        .filter(data => userIdParam ? data[1].userId === userIdParam : true)
        .map(async (data) => {
            const videoId = data[1].id;

            const rawResults = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);

            const videoInfo = await rawResults.json() as OEmbedVideoInfo;

            const authorUrl = videoInfo.author_url.split('/').at(-1);

            return {
                videoId,
                categoryId: data[1].categoryId,
                title: videoInfo.title,
                authorName: videoInfo.author_name,
                authorUrl
            }
        });

        const results = await Promise.all(promises);
        
        return Response.json({ ok: true, data: results, categories });
    } catch (error) {
        return Response.json({ ok: false, data: [] }, { status: 500 });
    }
    
}

export async function POST(request: Request) {
    const data = await request.json();

    if(videosData.has(data.videoId)) {
        return Response.json({ ok: false, error: 'The video has already been added earlier.' }, { status: 400 });
    }
    
    videosData.set(data.videoId, { userId: data.userId ,id: data.videoId, categoryId: data.categoryId});

    return Response.json({ ok: true });
}