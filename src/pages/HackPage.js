import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom"
import reactStringReplace from 'react-string-replace';

export default function HackPage() {
    const params = useParams();
    const [patches, setPatches] = useState(null);
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(params)

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
            <h1>{patches[0].hack_name}</h1>
            <PatchesList patches={patches} />
            <Description hack={patches} />
        </>
    )
}

function PatchesList({patches}) {
    document.title = `sm64romhacks - ${patches[0].hack_name}`
    const patchItems = patches.map((patch, index) => (
        <tr key={index}>
            <Patch patch={patch} />
        </tr>
    ));

    return (
        <>
            <table id="patchesTable" className="table-responsive table-sm table-bordered">
                <tbody>
                    <tr className="fw-bold">
                        <th>Hack Name</th>
                        <th>Hack Version</th>
                        <th>Download Link</th>
                        <th>Creator</th>
                        <th>Starcount</th>
                        <th>Date</th>
                    </tr>
                    {patchItems}
                </tbody>
            </table>
        </>
    )
}

function Patch({patch}) {
    return (
        <>
            <td>{patch.hack_name}</td>
            <td>{patch.hack_version}</td>
            <td><span className="text-muted">Downloads: {patch.hack_downloads}</span></td>
            <td>{patch.authors}</td>
            <td>{patch.hack_starcount}</td>
            <td>{patch.hack_release_date}</td>
        </>
    )
}

function Description({hack}) {
    const description = hack[0].hack_description;

    return (
        <>
            {
                reactStringReplace(description, '<br/>', (match, i) => (
                    <br/>
                ))
            }
        </>
    )
}

function ImageList({images}) {
    return (
        <>
            
        </>
    )
}

function Image({image}) {
    return (
        <>

        </>
    )
}

function EditHack({hack}) {

    const is_megapack = hack[0].hack_megapack == 1;

    return (
        <>
            <form className='form-floating'>
                <div className='row mb-3'>
                    <label className='col-form-label col-sm-2' htmlFor="hack_name">Hack Name:</label>
                    <div className='col-auto'>
                        <input id='old_hack_name' className='form-control' type='hidden' name='hack_old_name' value={hack[0].hack_name}></input>
                        <input className='form-control' type='text' name='hack_new_name' value={hack[0].hack_name}></input>
                    </div>
                </div>
                <fieldset className='row mb-3'>
                    <label className='col-form-label col-sm-2 pt-0'>
                        Recommend Versions:
                    </label>
                    <div className='col-auto'>
                        {hack.map((patch) => (
                            <>
                                <div className='form-check'>
                                    <input id='flexCheckDefault' className='form-check-input' type='checkbox' name={patch.hack_id}></input>
                                    <label className='form-check-label' htmlFor='flexCheckDefault'>{patch.hack_version}</label>
                                </div>
                            </>
                         ))}
                    </div>
                </fieldset>
                <div className='row mb-3'>
                    <label className='col-form-label col-sm-2 pt-0'>
                        Megapack:
                    </label>
                    <div className='col-auto'>
                        <div className='form-check'>
                            {
                                is_megapack ? (<input id='flexCheckDefault' className='form-check-input' type='checkbox' name="hack_megapack" checked></input>) : <input id='flexCheckDefault' className='form-check-input' type='checkbox' name="hack_megapack"></input>
                            }
                        </div>
                    </div>
                </div>
                <div className='row mb-3'>
                    <label className='col-form-label col-sm-2 pt-0'>
                        Hack Tags:
                    </label>
                    <div className='col-auto'>
                        <input id='flexCheckDefault' className='form-control' type='text' name="hack_tags" value={hack[0].hack_tags}></input>
                    </div>
                </div>  
                <div className='row mb-3'>
                    <label className='col-form-label col-sm-2 pt-0'>
                        Description:
                    </label>
                    <div className='col-auto'>
                        <textarea className='form-control' name='hack_description' rows={10}></textarea>
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