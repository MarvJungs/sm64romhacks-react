import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import reactStringReplace from 'react-string-replace';
import { Helmet } from 'react-helmet';
import Error from './Error';
import Table from 'react-bootstrap/Table';

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
                    <EditHack hack={patches} />
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
    const description = hack[hack.length-1].hack_description;

    return (
        <div className='bg-dark'>
            {
                reactStringReplace(description, '<br/>', (match, i) => (
                    <br/>
                ))
            }
        </div>
    )
}

function ImageList({images}) {
    if(images.length !== 0) {
        return (
            <div className='container'>
                <div className='row'>
                    {images.map((image) => (
                        <Image image={image} />
                    ))}
                </div>
            </div>
        )
    }
}

function Image({image}) {
    return (
        <div className='col'>
            <img className='p-3' width={320} height={240} src={'/api/images/' + image} alt={image}></img>
        </div>
    )
}

function EditHack({hack}) {

    return (
        <>
            <form action='http://localhost/api/hacks/index.php' method='post' enctype='multipart/form-data' >
                <input className='form-control' type='hidden' name='type' value={"editHack"}></input>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label' htmlFor="hack_name">Hack Name:</label>
                    <div className='col-sm-10'>
                        <input id='old_hack_name' className='form-control' type='hidden' name='hack_old_name' value={hack[0].hack_name}></input>
                        <input className='form-control' type='text' name='hack_new_name' value={hack[0].hack_name} required></input>
                    </div>
                </div>
                <fieldset className='row mb-3'>
                    <label className='col-sm-2 col-form-label pt-0'>
                        Recommend Versions:
                    </label>
                    <div className='col-auto'>
                        {hack.map((patch) => (
                            <>
                                <div className='form-check'>
                                    <input id='flexCheckDefault' className='form-check-input' type='checkbox' name='recommend_version' value={patch.hack_version} defaultChecked={hack[0].hack_recommend === 1}></input>
                                    <label className='form-check-label' htmlFor='flexCheckDefault'>{patch.hack_version}</label>
                                </div>
                            </>
                         ))}
                    </div>
                </fieldset>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label pt-0'>
                        Megapack:
                    </label>
                    <div className='col-auto'>
                        <div className='form-check'>   
                            <input id='flexCheckDefault' className='form-check-input' type='checkbox' name="hack_megapack" defaultChecked={hack[0].hack_megapack === 1}></input>         
                        </div>
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label pt-0'>
                        Hack Tags:
                    </label>
                    <div className='col-sm-5'>
                        <input id='flexCheckDefault' className='form-control' type='text' name="hack_tags" value={hack[0].hack_tags}></input>
                    </div>
                </div>  
                <div className='row mb-3'>
                    <label className='col-sm-2 col-form-label pt-0'>
                            Images
                    </label>
                    <div className='col-sm-5'>
                        <input className='form-control' type='file' name='hack_images[]' multiple></input>
                    </div> 
                </div>
                <div className='row mb-3'>
                    <label className='col-form-label col-sm-2 pt-0'>
                        Description:
                    </label>
                    <div className='col-sm-10'>
                        <textarea className='form-control' name='hack_description' rows={10}></textarea>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-sm-10'>
                        <button className='btn btn-secondary align-middle' type='submit'>Save Changes</button>
                    </div>
                </div>                         
            </form>
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