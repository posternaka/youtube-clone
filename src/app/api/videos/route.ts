import { AllVideoDto } from "../../../shared/types/typesFromBackend";

type OEmbedVideoInfo = {
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

const videosData = new Set<string>([
    'FvOpPeKSf_4',
    'Uz8pCfNIs7k',
    'M9z3ucb6f7c',
    '2I2D7q0AsL8',
    'nRNHcCHbPx0',
    'eAajijL6e0w',
    'N17ZDhB88Nk',
    '99ds4d88thk',
    'wgej_DhuoxA',
    'eQmSOvrk1_U'
]);

export async function GET() {
    try {
        const promises = [...videosData].map(async (videoId) => {
        const rawResults = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);

        const videoInfo = await rawResults.json() as OEmbedVideoInfo;

        return {
                videoId,
                title: videoInfo.title,
                authorName: videoInfo.author_name,
                authorlUrl: videoInfo.author_url
            }
        });

        const results = await Promise.all(promises);
        
        return Response.json({ ok: true, data: results });
    } catch (error) {
        return Response.json({ ok: false, data: [] }, { status: 500 });
    }
    
}

export async function POST(request: Request) {
    const data = await request.json();

    if(videosData.has(data.videoId)) {
        return Response.json({ ok: false, error: 'The video has already been added earlier.' }, { status: 400 });
    }
    
    videosData.add(data.videoId);

    return Response.json({ ok: true });
}