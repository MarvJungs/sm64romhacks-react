import {HacksList} from './Hacks.js';
import {useState, useEffect} from 'react';

export default function Megapack() {
    const [hacks, setHacks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        document.title = "sm64romhacks - Megapack";
        fetch('/api/megapack')
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw response;
        })
        .then(data => {
            setHacks(data)
        })
        .catch(error => {
            console.error("Error fetching data", error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);

    if(loading) return 'Loading...';
    if(error) return 'Error! ' + error;

    return (
        <>
            <IntroductionText setSearchQuery={setSearchQuery} searchQuery={searchQuery}/>
            <NormalMegapackList hacks={hacks} searchQuery={searchQuery} />
            <br/><br/>
            <KaizoMegapackList hacks={hacks} searchQuery={searchQuery} />
        </>
    )
}

function IntroductionText({setSearchQuery, searchQuery}) {
    return (
        <div className='text-center'>
            <h1>Grand ROM Hack Megapack</h1>
            This megapack offers a selection of major Super Mario 64 ROM Hacks which are universally considered to be the greatest. This is in hope to provide an ideal starter pack which serves as an easily accessible introduction to the world of ROM hacks.<br/><br/>
            <p className='fst-italic'>Contents of this page was last updated: 2024-01-01 (yyyy-mm-dd)</p>
            <div className='row'>
                <div className='col btn btn-group-lg'>
                    <a className='btn btn-primary' href='Grand%20Rom%Hack%20Megapack%202023%20(Final%20Edition).zip'>
                        Download Megapack
                    </a>
                </div>
                <div className='col btn btn-group-lg'>
                    <a className='btn btn-primary' href='Grand%20SM64%Kaizo%20Megapack%202023%20(Final%20Edition).zip'>
                        Download KAIZO Megapack
                    </a>
                </div>
                <div className='col'>
                    Difficulty: 
                    <select id='tagInput' className='form-select' onChange={e => setSearchQuery(e.target.value)}>
                        <option value="" selected>Select A Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="advanced">Advanced</option>
                        <option value="kaizo">Kaizo</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

function NormalMegapackList({hacks, searchQuery}) {
    if(searchQuery === 'kaizo') {
        return (
            <>
            </>
        )
    }

    hacks = hacks.filter((hack) =>  {
        switch (searchQuery) {
            case "easy":
                return hack.hack_tags.includes("Easy");
            case "normal":
                return hack.hack_tags.includes("Normal");
            case "advanced":
                return hack.hack_tags.includes("Advanced");
            default:
                return !hack.hack_tags.includes("Kaizo")
        }
    });

    return (
        <>
            <h5>Normal Megapack Hacks</h5>
            <HacksList hacks={hacks} />
        </>
    )
}

function KaizoMegapackList({hacks, searchQuery}) {
    hacks = hacks.filter((hack) => {
        return hack.hack_tags.includes('Kaizo');
    })
    if(searchQuery === "easy" || searchQuery === "normal" || searchQuery === "advanced") {
        return (
            <>
            </>
        )
    }
    else {
        return (
        <>
            <h5>Kaizo Megapack Hacks</h5>
            <HacksList hacks={hacks} />
        </>
        )
    }
}