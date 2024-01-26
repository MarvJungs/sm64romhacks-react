import { useEffect, useState } from "react";
import addIcon from '../assets/add.svg'
import editIcon from '../assets/edit.svg'
import deleteIcon from '../assets/delete.svg'



export default function Hacks() {
    const [hacks, setHacks] = useState(null);
    const [tags, setTags] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [filterQuery, setFilterQuery] = useState("")


    useEffect(() => {
        document.title = "sm64romhacks - Patches";
        fetch('/api/hacks')
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw response;
        })
        .then(data => {
            setHacks(data.hacks)
            setTags(data.tags)
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
    if(error) return 'Error!';

    return (
        <>
            <SearchBar tags={tags} setFilterQuery={setFilterQuery} setFilter={setFilter}/>
            <HacksList hacks={hacks.filter((hack) => {
                switch (filter) {
                    case "hack_name":
                        return filterQuery.toLowerCase() === '' ? hack : hack.hack_name.toLowerCase().includes(filterQuery.toLowerCase())
                    case "hack_author":
                        return filterQuery.toLowerCase() === '' ? hack : hack.hack_author.toLowerCase().includes(filterQuery.toLowerCase())
                    case "hack_release_date":
                        return filterQuery.toLowerCase() === '' ? hack : hack.release_date.includes(filterQuery)
                    case "hack_tags":
                        return filterQuery.toLowerCase() === '' ? hack : hack.hack_tags.toLowerCase().includes(filterQuery.toLowerCase())
                    default:
                        return hack;
                }
            }).sort((a, b) => {return b.total_downloads-a.total_downloads})} />
        </>
    );
}

export function HacksList({hacks}) {
    const hackItems = 
        Array.from(hacks).map((hack, index) => (
            <tr key={index}>
                <Hack hack={hack} />
            </tr>
        ));

    return (
        <div className="table-responsive">
            <table className="table-sm table-bordered" id="hacksTable">
                <tbody>
                    <tr className="fw-bold">
                        <th>Hackname</th>
                        <th>Creator</th>
                        <th>Initial Release Date</th>
                        <th>Downloads</th>
                        <th hidden>Tag</th>
                        <AdminHeader />
                    </tr>
                    {hackItems}
                </tbody>
            </table>
        </div>
    )
}

function Hack({hack}) {
    return (
        <>
            <td><a className="link-underline link-underline-opacity-0" href={"/hacks/" + hack.hack_url}>{hack.hack_name}</a></td>
            <td>{hack.hack_author}</td>
            <td>{hack.release_date}</td>
            <td><span className="text-muted text-nowrap">Downloads: {hack.total_downloads}</span></td>
            <td hidden>{hack.hack_tags}</td>
            <AdminButtons hack={hack} />
        </>
    )
}

function AdminHeader() {
    if(window.location.pathname === '/hacks'){
        return (
            <>
                <th className="border border-dark" colSpan="2"><a className="btn btn-success text-nowrap"><img src={addIcon} alt=""></img></a></th>
            </>
        )
    
    }

}

function AdminButtons({hack}) {
    if(window.location.pathname === '/hacks') 
    return (
        <>
            <td className="border border-dark"><a className="btn btn-danger text-nowarp" href={"/hacks/deleteHack/"+hack.hack_url}><img src={deleteIcon} alt=""></img></a></td>
            <td className="border border-dark"><a className="btn btn-info text-nowrap" href={"/hacks/editHack/"+hack.hack_url}><img src={editIcon} alt=""></img></a></td>
        </>
    )
}

function Tag({tag}) {
    return (
        <>
            <option key={tag.tag_name} value={tag.tag_name}>{tag.tag_name}</option>
        </>
    )
}

function TagList({tags}) {
    const tagItems = Array.from(tags).map((tag) => (
        <Tag tag={tag} />
    ))

    return (
        <>
            {tagItems}
        </>
    )
}


function SearchBar({tags, setFilterQuery, setFilter}) {
    return (
        <div className="row">
            <div className="col">
                <input type="text" id="hackNamesInput" placeholder="Search for Hacknames.." onKeyUp={e => {setFilterQuery(e.target.value); setFilter("hack_name")}} />
            </div>
            <div className="col">
                <input type="text" id="authorNamesInput" placeholder="Search for hackcreators.." onKeyUp={e => {setFilterQuery(e.target.value); setFilter("hack_author")}} />
            </div>
            <div className="col">
                <input type="text" id="hackDatesInput" placeholder="Search for Date (yyyy-mm-dd).." onKeyUp={e => {setFilterQuery(e.target.value); setFilter("hack_release_date")}} />
            </div>
            <div className="col">
                <select className="form-select form-select-sm" id="tagInput" onChange={e => {setFilterQuery(e.target.value); setFilter("hack_tags")}}>
                    <option value="">Select A Tag</option>
                    <TagList tags={tags} />
                </select>
            </div>
            <div className="col">
                <a className="btn btn-primary" href="/hacks/random.php">Random</a>
            </div>
        </div>
    )
}