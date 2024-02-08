import {HacksList} from './Hacks.js';
import {useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

export default function Megapack() {
    const [hacks, setHacks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const context = useOutletContext();

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
            <IntroductionText setSearchQuery={setSearchQuery} />
            <NormalMegapackList hacks={hacks} searchQuery={searchQuery} context={context} />
            <br/><br/>
            <KaizoMegapackList hacks={hacks} searchQuery={searchQuery} context={context} />
        </>
    )
}

function IntroductionText({setSearchQuery}) {
    return (
        <span className='text-center'>
            <h1>Grand ROM Hack Megapack</h1>
            This megapack offers a selection of major Super Mario 64 ROM Hacks which are universally considered to be the greatest. This is in hope to provide an ideal starter pack which serves as an easily accessible introduction to the world of ROM hacks.<br/><br/>
            <p className='fst-italic'>Contents of this page was last updated: 2024-01-01 (yyyy-mm-dd)</p>
            <Row>
                <Col className='d-grid'>
                    <Button variant='primary' size='lg' href='Grand%20Rom%Hack%20Megapack%202023%20(Final%20Edition).zip'>
                        Download Megapack
                    </Button>
                </Col>
                <Col className='d-grid'>
                    <Button variant='primary' size='lg' href='Grand%20SM64%Kaizo%20Megapack%202023%20(Final%20Edition).zip'>
                        Download KAIZO Megapack
                    </Button>
                </Col>
                <Col>
                    <Row>
                        Difficulty: 
                    </Row>
                    <Row>
                        <Form.Select onChange={e => setSearchQuery(e.target.value)}>
                            <option value="" selected>Select A Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="normal">Normal</option>
                            <option value="advanced">Advanced</option>
                            <option value="kaizo">Kaizo</option>
                        </Form.Select>
                    </Row>
                </Col>
            </Row>
        </span>
    )
}

function NormalMegapackList({hacks, searchQuery, context}) {
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
            <HacksList hacks={hacks} context={context} />
        </>
    )
}

function KaizoMegapackList({hacks, searchQuery, context}) {
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
            <HacksList hacks={hacks} context={context} />
        </>
        )
    }
}