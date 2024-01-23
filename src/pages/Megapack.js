import {HacksList} from './Hacks.js';
import {useState, useEffect} from 'react';

export default function Megapack() {
    const [hacks, setHacks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <IntroductionText />
            <NormalMegapackList hacks={hacks} />
            <br/><br/>
            <KaizoMegapackList hacks={hacks} />
        </>
    )
}

function IntroductionText() {
    return (
        <>
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
                    <select id='tagInput' className='form-select'>
                        <option value="" selected>Select A Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="advanced">Advanced</option>
                        <option value="kaizo">Kaizo</option>
                    </select>
                </div>
            </div>
        </>
    )
}

function NormalMegapackList({hacks}) {
    hacks = hacks.filter(function (hack) {
        return !hack.hack_tags.includes('Kaizo');
    })
    return (
        <>
            <h5>Normal Megapack Hacks</h5>
            <HacksList hacks={hacks} />
        </>
    )
}

function KaizoMegapackList({hacks}) {
    hacks = hacks.filter(function (hack) {
        return hack.hack_tags.includes('Kaizo');
    })
    return (
        <>
            <h5>Kaizo Megapack Hacks</h5>
            <HacksList hacks={hacks} />
        </>
    )
}