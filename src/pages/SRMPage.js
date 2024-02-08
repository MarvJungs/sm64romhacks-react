import {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';

export function SRMPage({id}) {
    const [event, setEvent] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ticker, setTicker] = useState(null);

    useEffect(() => {
        fetch('/api/events?id=' + id)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            setEvent(data.event)
            setSchedule(data.schedule)
            setTicker(data.ticker)
        })
        .catch(error => {
            console.error("Error fetching data", error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [id]);

    if(loading) return "Loading..."
    if(error) return "Error" + error

    return (
        <>
            <h1 className='text-center text-decoration-underline'>{event.name}</h1>
            <p>
                <span className='text-uppercase'>{event.slug}</span> is a Community-driven Marathon streamed on Twitch at the <a href='https://www.twitch.tv/sm64romhacks' target='_blank' rel='noreferrer'>sm64romhacks Twitch Channel</a>. The Marathon usually lasts for about 3-4 days and consists of various events such as speedruns, game shows, award ceremonies (Winter only) and more! For the schedule, please see below (converted to your local timezone).
            </p>
            {ticker.current || ticker.next ? <Ticker ticker={ticker} /> : <></> }
            <Schedule schedule={schedule} />
        </>
    )
}

function Schedule({schedule}) {
    return (
        <>
            <Table responsive hover bordered size='sm' >
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        {schedule.columns.map((col) => {
                            return (
                                <>
                                    <th>{col}</th>
                                </>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {schedule.items.map((item) => {
                        return (
                            <>
                                <tr>
                                    <td>{convertTimestampToDate(item.scheduled_t)}</td>
                                    <td>{convertTimestampToTime(item.scheduled_t)}</td>
                                    {item.data.map((runData) => {
                                        return (
                                            <td>
                                                {runData}
                                            </td>
                                        )
                                    })}
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>

        </>
    )
}

function Ticker({ticker}) {
    const current = ticker.current;
    const next = ticker.next;

    return (
        <>
            <Table responsive size='sm' bordered variant='warning'>
                <thead>
                    <tr>
                        <th>
                            Current Run:
                        </th>
                        <th>
                            Next Run:
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {current.data[0]} ({current.data[1]}) By {current.data[2]}
                        </td>
                        <td>
                            {next.data[0]} ({next.data[1]}) By {next.data[2]}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

function convertTimestampToTime(timestamp) {
    const d = new Date(timestamp * 1000);
	const hh = ('0' + d.getHours()).slice(-2)			// Add leading 0.
	const m = ('0' + d.getMinutes()).slice(-2)			// Add leading 0.
	const ss = ('0' + d.getSeconds()).slice(-2)		// Add leading 0.
    const time = hh + ':' + m + ':' + ss;

	return time;
}

function convertTimestampToDate(timestamp) {
    const d = new Date(timestamp * 1000);				// Convert the passed timestamp to milliseconds
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const yyyy = d.getFullYear()
    const mm = ('0' + (d.getMonth() + 1)).slice(-2)		// Months are zero based. Add leading 0.
    const dd = ('0' + d.getDate()).slice(-2)			// Add leading 0.

    const time = days[d.getDay()] + ', ' + yyyy + '-' + mm + '-' + dd;

    return time;


}