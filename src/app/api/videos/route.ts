const videosData = new Set<string>();

export async function GET() {
    videosData.add('FvOpPeKSf_4');
    videosData.add('Uz8pCfNIs7k');
    videosData.add('M9z3ucb6f7c');
    videosData.add('2I2D7q0AsL8');
    videosData.add('nRNHcCHbPx0');
    
    return Response.json({ data: Array.from(videosData) });
}

export async function POST(request: Request) {
    const data = await request.json();

    if(videosData.has(data.videoId)) {
        return Response.json({ ok: false, error: 'The video has already been added earlier.' }, { status: 400 });
    }
    
    videosData.add(data.videoId);

    return Response.json({ ok: true });
}