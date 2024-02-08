import {useParams} from 'react-router-dom';
import { SRMPage } from './SRMPage';
import League2023  from './League2023';
import Error from './Error';

const WSRM2024_EVENT_ID = "5c504w1ah0f2kpb494"
const SSRM2023_EVENT_ID = "06509q02k1dbo1b431";
const WSRM2023_EVENT_ID = "4750zz56rk92sjb4bf";
const SSRM2022_EVENT_ID = "7e50ulc9ggea6zb412";
const WSRM2022_EVENT_ID = "34506369bja9jeb4e2";
const SSRM2021_EVENT_ID = "0350d7328x26v0b4c9";
const WSRM2021_EVENT_ID = "7650451baq30rwb4d8";
const SSRM2020_EVENT_ID = "4450tn9604a91jb459";
const WSRM2020_EVENT_ID = "18500837qwddp6b4c0";
const SSRM2019_EVENT_ID = "5a50tr3cuccb1pb4c9";
const WSRM2019_EVENT_ID = "3450oib9en77meb440";
const SSRM2018_EVENT_ID = "5d50w3799pbfxpb45c";
const WSRM2018_EVENT_ID = "19502r67ar8c17b42e";

export default function Event() {
    const params = useParams();
    if(params.event_name.includes("wsrm") || params.event_name.includes("ssrm")) {
        document.title = "sm64romhacks - " + params.event_name.toUpperCase(); 
        switch (params.event_name) {
            case "wsrm2024":
                return <SRMPage id={WSRM2024_EVENT_ID} />
            case "ssrm2023":
                return <SRMPage id={SSRM2023_EVENT_ID} />
            case "wsrm2023":
                return <SRMPage id={WSRM2023_EVENT_ID} />
            case "ssrm2022":
                return <SRMPage id={SSRM2022_EVENT_ID} />
            case "wsrm2022":
                return <SRMPage id={WSRM2022_EVENT_ID} />
            case "ssrm2021":
                return <SRMPage id={SSRM2021_EVENT_ID} />
            case "wsrm2021":
                return <SRMPage id={WSRM2021_EVENT_ID} />
            case "ssrm2020":
                return <SRMPage id={SSRM2020_EVENT_ID} />
            case "wsrm2020":
                return <SRMPage id={WSRM2020_EVENT_ID} />
            case "ssrm2019":
                return <SRMPage id={SSRM2019_EVENT_ID} />
            case "wsrm2019":
                return <SRMPage id={WSRM2019_EVENT_ID} />
            case "ssrm2018":
                return <SRMPage id={SSRM2018_EVENT_ID} />
            case "wsrm2018":
                return <SRMPage id={WSRM2018_EVENT_ID} />      
            default:
                return <Error />
        }
    }
    else {
        switch(params.event_name) {
            case "league2023":
                return <League2023 />
            default:
                return <></>
        }
    }
}