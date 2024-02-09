import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import reactStringReplace from 'react-string-replace';
import { Helmet } from 'react-helmet';
import Error from './Error';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

export default function HackPage() {
    const params = useParams();
    const [patches, setPatches] = useState(null);
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/hacks?hack_name='+params.hack_url)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw response;
        })
        .then(data => {
            setPatches(data.patches)
            setImages(data.images);
        })
        .catch(error => {
            console.error("Error fetching data", error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [params.hack_url]);

    if(loading) return 'Loading...'
    if(error) return "Error" + error
    if(!patches[0]) return <Error />

    console.log(images)
    if(params.mode) {
        switch (params.mode) {
            case "editHack":
                return (
                <>  
                    <EditHack hack={patches} images={images} />
                </>
                )
            case "deleteHack":
                return (
                    <>
                        <DeleteHack />
                    </>
                )
            default:
                break;
        }
    }

    return (
        <>
            <Helmet>
                <title>{"sm64romhacks - " + patches[0].hack_name }</title>
                <meta property='og:title' content={patches[0].hack_name}></meta>
                <meta property='og:type' content='website'></meta>
                <meta property='og:url' content={"https://sm64romhacks.com/hacks/" + patches[0].hack_url}></meta>
                <meta property='og:site_name' content='sm64romhacks.com'></meta>
                <meta property='og:description' content={patches[0].hack_description}></meta>
                <meta name='twitter:card' content='summary_large_image'></meta>
                <meta property='twitter:domain' content='sm64romhacks.com'></meta>
                <meta property='twitter:url' content={"https://sm64romhacks.com/hacks/" + patches[0].hack_url}></meta>
                <meta name='twitter:title' content={'sm64romhacks - ' + patches[0].hack_name}></meta>
                <meta name='twitter:description' content={patches[0].hack_description}></meta>
            </Helmet>
            <h1 className='text-center text-decoration-underline'>{patches[0].hack_name}</h1>
            <PatchesList patches={patches} />
            <hr/>
            <Description hack={patches} />
            <hr/>
            <ImageList images={images} />
        </>
    )
}

function PatchesList({patches}) {
    const patchItems = patches.map((patch, index) => (
        <tr key={index} className={patch.hack_recommend === 1 ? 'table-warning' : null} data-bs-theme={patch.hack_recommend === 1 ? 'light' : 'dark'}>
            <Patch patch={patch} />
        </tr>
    ));

    return (
        <>
            <Table responsive bordered hover>
                <thead>
                    <tr className="fw-bold">
                        <th>Hack Name</th>
                        <th>Hack Version</th>
                        <th>Download Link</th>
                        <th>Creator</th>
                        <th>Starcount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {patchItems}
                </tbody>
            </Table>
        </>
    )
}

function Patch({patch}) {
    return (
        <>
            <td>{patch.hack_name}</td>
            <td>{patch.hack_version}</td>
            <td><a href={`/patch/${patch.hack_patchname}.zip`}>Download</a><br/><span className="text-muted">Downloads: {patch.hack_downloads}</span></td>
            <td>{patch.authors}</td>
            <td>{patch.hack_starcount}</td>
            <td>{patch.hack_release_date}</td>
        </>
    )
}

function Description({hack}) {
    const hack_description = reactStringReplace(hack[hack.length-1].hack_description, "\r\n", (match) => (<br/>));
    return (
        <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>Hack Description</Accordion.Header>
                <Accordion.Body>
                    {hack_description}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

function ImageList({images}) {
    if(images.lenght !== 0) {
        return (
            <Carousel>
                {images.map((image) => (
                <Carousel.Item interval={1000}>
                    <Image src={'/api/images/' + image}></Image>
                </Carousel.Item>
                ))}
            </Carousel>
        )
    }
}

function EditHack({hack, images}) {
    const hack_name = hack[0].hack_name;
    const hack_megapack = hack[0].hack_megapack;
    const hack_tags = hack[0].hack_tags;
    const hack_description = hack[0].hack_description;

    return (
        <>
            <Form action='http://localhost/api/hacks/index.php' method='post' enctype='multipart/form-data' >
                <Form.Control type='hidden' name='type' value={"editHack"}></Form.Control>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm={2} htmlFor='hack_name'>Hack Name:</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='hidden' name='hack_old_name' value={hack_name}></Form.Control>
                        <Form.Control type='text' name='hack_new_name' value={hack_name} required></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label as="legend" column sm={2}>Recommend Versions:</Form.Label>
                    <Col sm={10}>
                        {hack.map((patch) => (
                            <>
                                <Form.Check type='checkbox' label={patch.hack_version} name={patch.hack_id} defaultChecked={patch.hack_recommend === 1}></Form.Check>
                            </>
                        ))}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label as="legend" column sm={2}>Megapack:</Form.Label>
                    <Col sm={10}>
                        <Form.Check type='checkbox' name='hack_megapack' defaultChecked={hack_megapack === 1}></Form.Check>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm={2}>Hack Tags:</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='text' name='hack_tags' value={hack_tags}></Form.Control>
                        <Form.Text className='text-muted'>Seperate multiple tags with a Komma and a Whitespace. Example: Easy, Traditional</Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm={2}>Images:</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='file' name='hack_images[]' multiple></Form.Control>
                        <Row className='text-center'>
                        {images.map((image) => (
                            <Col>
                                    <Image src={'/api/images/' + image} width={160} height={120}></Image>
                                
                                    <Form.Check type='checkbox' name='hack_images_checked[]' value={image.substring(0, image.lenght - 4)} defaultChecked={true}></Form.Check>
                            </Col>
                        ))}
                        </Row>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Form.Label column sm={2}>Description</Form.Label>

                    <Col sm={10}>
                        <Form.Control as='textarea' name='hack_description' defaultValue={hack_description} rows={10}></Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className='mb-3'>
                    <Col sm={{span: 10, offset: 2}}>
                        <Button variant='primary' type='submit'>Save Changes</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
}

function DeleteHack() {
    return (
        <>
            Hello World from Delete
        </>
    )
}