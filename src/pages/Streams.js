import {useEffect, useState} from 'react';

export default function Streams() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [streams, setStreams] = useState(null);


    useEffect(() => {
        document.title = "sm64romhacks - Streams";
        fetch('/api/streams')
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw response;
        })
        .then(data => {
            setStreams(data)
        })
        .catch(error => {
            console.error("Error fetching data", error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);


    if(loading) return "Loading..."
    if(error) return "Error" + error

    return <StreamsList streams={streams}/>

}

function StreamsList({streams}) {
    streams = Object.values(streams).map((stream) => {
        const thumbnail = stream.thumbnail_url.replace("{width}", 1280).replace("{height}", 720);
        const title = stream.title.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        const viewer_count = stream.viewer_count;
        const user_name = stream.user_name;
        const user_login = stream.user_login;

        return (
            <div className='stream-container'>
                <a href={"https://www.twitch.tv/" + user_login} target='_blank' rel='noreferrer'>
                    <img src={thumbnail} alt="stream thumbnail" />
                </a>
                <h2>{title}</h2>
                <h2>{user_name} ({viewer_count} Viewers)</h2>
            </div>
        )
    })

    return (
        <div className='streams'>
            {streams}
        </div>
    )
}