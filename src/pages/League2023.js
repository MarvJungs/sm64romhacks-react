import {useEffect, useState} from 'react';
import Table from 'react-bootstrap/table';
import Streams from './Streams';

const runners = {
    runners: 
    [
        {runner_name: "Evening_Grace", twitch_name: 'Eveneing_Grace'},
        {runner_name: "SigotuSR", twitch_name: "SigotuSR"},
        {runner_name: "Shep", twitch_name: "SheepSquared"},
        {runner_name: "aglab2", twitch_name: "aglab2"},
        {runner_name: "Da1HuNox", twitch_name: undefined},
        {runner_name: "RedSlim777", twitch_name: "RedSlim"},
        {runner_name: "MintyNate", twitch_name: "MintyNate"},
        {runner_name: "CornbreadSnake", twitch_name: "Cormbreadsnake"},
        {runner_name: "Lahmus", twitch_name: "Lahmus"},
        {runner_name: "MalexNSMB", twitch_name: "ItsMalexTime"},
        {runner_name: "matgeo", twitch_name: "matgeo_"},
        {runner_name: "nzjg", twitch_name: "nzjg"},
        {runner_name: "TheSecondTry", twitch_name: "The_Second_Try"},
        {runner_name: "RisingPhoenix64", twitch_name: "RisingPhoenix64"},
        {runner_name: "SomeBro", twitch_name: "SomeBroYouDontKnow"},
        {runner_name: "Luvbaseball58", twitch_name: "luvbaseball58"},
        {runner_name: "amsixx", twitch_name: "amsixx"},
        {runner_name: "Authenticbrine", twitch_name: "AuthenticBrine"},
        {runner_name: "iamDolphino", twitch_name: "iamdolphino"},
        {runner_name: "ForeverPark", twitch_name: "ForeverPark"},
        {runner_name: "BigfootTouchedMe", twitch_name: "bigfoottouchedme"},
        {runner_name: "conichan239", twitch_name: "conichan239"},
        {runner_name: "Milasus", twitch_name: "Milasus"},
        {runner_name: "Ian_1243", twitch_name: "Ian_1243"},
        {runner_name: "Serium", twitch_name: "serium__"},
        {runner_name: "OkamiBW", twitch_name: "okamibw"},
        {runner_name: "Neo_Is_Me", twitch_name: "neo_"},
        {runner_name: "Jalapinecone", twitch_name: "Jalapinecone"},
        {runner_name: "GHDEVIL666", twitch_name: "GHDEVIL666"},
        {runner_name: "KingToad64", twitch_name: "KingToad74EE"},
        {runner_name: "MontyVR", twitch_name: "Montyvr"},
        {runner_name: "SodiumChlorideIC", twitch_name: "sodiumclorideic"},
        {runner_name: "AndrewSM64", twitch_name: "AndrewSM64"},
        {runner_name: "Signgod", twitch_name: "xviper33"},
        {runner_name: "ZenonX", twitch_name: "ZenonX_Dest"},
        {runner_name: "Aussieadam", twitch_name: "Aussieadam"},
        {runner_name: "SubmarineCpt", twitch_name: "submarinecpt"},
        {runner_name: "SquilliumFancyShot", twitch_name: "SquilliumFancyShot"},
        {runner_name: "JTSNYK8", twitch_name: "Jtsdogg0629"},
        {runner_name: "aJames_30", twitch_name: "aJames_30"},
        {runner_name: "Muimania", twitch_name: "Muimania"},
        {runner_name: "VitaBlue", twitch_name: "VitaBlue"},
        {runner_name: "Doginator", twitch_name: "themrdoggo"},
        {runner_name: "Rynnoo", twitch_name: "rynnoo64"},
        {runner_name: "DNVIC", twitch_name: "DNVIC"},
        {runner_name: "tomatobird8", twitch_name: "tomatobird8"},
        {runner_name: "dackage", twitch_name: "Dackage"},
        {runner_name: "GmdDoesDMG", twitch_name: "GMDDoesDMG"},
        {runner_name: "Kiruua_", twitch_name: "Kiruuaa"},
        {runner_name: "Pikamu", twitch_name: "Pikamu"},
        {runner_name: "Epsilon", twitch_name: "Epsilo102"},
        {runner_name: "WesDogg", twitch_name: "wes_dogg"},
        {runner_name: "xein64", twitch_name: "xein64"},
        {runner_name: "AdamJ", twitch_name: undefined},
        {runner_name: "conmangamer22", twitch_name: undefined},
        {runner_name: "max954", twitch_name: "max954"},
        {runner_name: "TheReverserOfTime", twitch_name: "TheReverserOfTime"},
        {runner_name: "DarkMan_", twitch_name: "DarkMan_"},
        {runner_name: "Wookis", twitch_name: "wookiessr"},
        {runner_name: "PKSMG2", twitch_name: "PKSMG2"},
        {runner_name: "Zaikenator", twitch_name: "zaikenator"},
        {runner_name: "itsbeeve", twitch_name: "itsbeeve"},
        {runner_name: "serpal", twitch_name: "serpals"},
        {runner_name: "Nascar316", twitch_name: "Nascar316"},
        {runner_name: "SimpleFlips", twitch_name: "SimpleFlips"},
        {runner_name: "Cosmic64", twitch_name: "NitroXNateYT"},
        {runner_name: "alex7456", twitch_name: "alex7456"},
        {runner_name: "Altaria26", twitch_name: "Altaria26"},
        {runner_name: "Edgar3EEE", twitch_name: "Edgar3EEE"},
        {runner_name: "DJ_Tala", twitch_name: "DJ_Tala0"},
        {runner_name: "julien_r", twitch_name: "partitionpenguin"},
        {runner_name: "LinCrash", twitch_name: "LinCrash"},
        {runner_name: "PiOverlord", twitch_name: undefined},
        {runner_name: "Zans64", twitch_name: "Zans64"},
        {runner_name: "ChiaraSM64", twitch_name: "ChiaraSM64"},
        {runner_name: "madware", twitch_name: "madware_"},
        {runner_name: "prakoelpatatita", twitch_name: "Prakxoelpatatita"},
        {runner_name: "Teddytank13", twitch_name: "TeddaySR"},
        {runner_name: "mAf1sss", twitch_name: "maf1sss1"},
        {runner_name: "Luisito", twitch_name: "luisitocnvs"},
        {runner_name: "Bryce Jormungandr", twitch_name: "Bryce_Jormungandr"},
        {runner_name: "Mr.zebra776", twitch_name: "mr_zebra776"},
        {runner_name: "Falling_Tacos", twitch_name: "Falling_Tacos"},
        {runner_name: "9024149724825", twitch_name: undefined},
        {runner_name: "ElDeve", twitch_name: "eldeve"},
        {runner_name: "Carlos64", twitch_name: "carlitos64_"},
        {runner_name: "leopatic", twitch_name: "leopatic"},
        {runner_name: "vandemire", twitch_name: "vandemire"},
        {runner_name: "PegiTheLoca", twitch_name: "PegiTheLoca"},
        {runner_name: "Infinitevoid316", twitch_name: "InfiniteVoid316"},
        {runner_name: "Inkstar", twitch_name: "InkstarLum"},
        {runner_name: "CapruSin", twitch_name: "SapruSin"},
        {runner_name: "anvarmore", twitch_name: "anvarmore"},
        {runner_name: "BJCMD", twitch_name: "BJCMD"},
        {runner_name: "Kudo", twitch_name: "Kudo64_"},
        {runner_name: "BondsTowardTheFuture", twitch_name: "BondsTowardTheFuture"},
        {runner_name: "amsixx", twitch_name: "amsixx"},
        {runner_name: "amsixx", twitch_name: "amsixx"},
        {runner_name: "amsixx", twitch_name: "amsixx"},
        {runner_name: "amsixx", twitch_name: "amsixx"},
        {runner_name: "amsixx", twitch_name: "amsixx"},
        {runner_name: "amsixx", twitch_name: "amsixx"},
        {runner_name: "amsixx", twitch_name: "amsixx"},
        {runner_name: "amsixx", twitch_name: "amsixx"},
    ] 
}

export default function League2023() {
    return (
        <>
            <Title />
            <Timer time={"2024-11-01T10:00:00Z"}/>
            <TableOfContents />
            <IntroductionText />
            <What />
            <Teams />
            <Points />
            <SpeedrunCom />
            <Categories />
            <Join />
            <Leaderboard />
            <Streams />
        </>
    )
}

function Title() {
    return (
        <>
            <h1 className='text-center'>SM64 ROMHACKS LEAGUE 2023 (September 16th - October 31st)</h1>
            <hr/>
        </>
    )
}

function Timer({time}) {
    const [countDown, setCountdown] = useState(null);
    const countDownDate = new Date(time).getTime();
    
    useEffect(() => {
        const intervall = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            if(distance < 0) {
                clearInterval(intervall);
                setCountdown("Event ended!");
            }
    
            else setCountdown("Event ends in " + days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds");
            
        }, 1000);
        return () => clearInterval(intervall);
    }, [countDownDate]);
    
    
    

    return (
        <>
            <h2 className='text-center'>{countDown}</h2>
        </>
    )
}

function TableOfContents() {
    return (
        <>
            <h2 className='text-decoration-underline text-uppercase text-center'>Table Of Contents</h2>
            <ol>
                <li>
                    <a href="#what">What is a League?</a>
                </li>
                <li>
                    <a href="#teams">How are Teams determined?</a>
                </li>
                <li>
                    <a href='#points'>How do I earn Points?</a>
                </li>
                <ol>
                    <li>
                        <a href='#calculator'>Points Calculator</a>
                    </li>
                </ol>
                <li>
                    <a href='#src'>Do I need to have my PBs on speedrun.com?</a>
                </li>
                <li>
                    <a href="#categories">What categories are eligible?</a>
                </li>
                <li>
                    <a href="#howtojoin">Can I still join the League?</a>
                </li>
                <li>
                    <a href='#leaderboard'>Leaderboard</a>
                </li>
                <li>
                    <a href="#streams">Streams</a>
                </li>
            </ol>
            <hr/>
        </>
    )
}

function IntroductionText() {
    return (
        <span>
            The ongoing league features 3 hacks and multiple categories. The league starts immediately after the draft held on 16 September 2023 and runs through October 31st. The current individual user leaderboard can be found <a href="#leaderboard">here</a>
        </span>
    )
}

function What() {
    return (
        <>
            <h2 className='text-uppercase' id='what'>What is a league?</h2>
            <span>
                League is a community open event for any speedrunners. participants are drafted onto teams and can earn points for their team by getting PBs in the selected categories and submitting them to speedrun.com
            </span>
        </>
    )
}

function Teams() {
    return (
        <>
            <h2 className='text-uppercase' id='teams'>How are Teams determined?</h2>
            <span>
                The teams are determined by a draft. Players that opt to be a captain are the ones that draft their teams. Anyone can signup to be a potential captain but the number of captains depends on how many people sign up. Generally, priority will be given to past league participants and known community members, but we will try to be as fair as possible to everyone. Everyone that signs up is guaranteed a spot. If we don't have an even number of players per team, we will try to recruit more runners for the smaller teams and/or adjust the team score for balance.
            </span>
        </>
    )
}

function Points() {
    return (
        <>
            <h2 className='text-uppercase' id='points'>How do I earn Points?</h2>
            <span>Points are determined by Leaderboard position. The higher your rank is, the more points you get. The Basesystem is:</span>
            <ul>
                <li>
                    The last place gets 1 point
                </li>
                <li>
                    For each higher placement you get one extra point
                </li>
                <li>
                    If you are between place 6 and 10, your points increase by 2 instead of 1
                </li>
                <li>
                    If you are between place 1 and 5, your points increase by 3 instead of 2
                </li>
                <li>
                    Some categories give Bonuspoints onto the Basesystem due their lenght
                </li>
                <li>
                    Due the System being based off Leaderboard position, there is a maximum amount of points to catch per category
                </li>
            </ul>
        </>
    )
}

function SpeedrunCom() {
    return (
        <>
            <h2 className='text-uppercase' id='src'>Do I need to have my pbs on speedrun.com</h2>
            <span>To keep track of points, PBs will have to be submitted to <a href="https://www.speedrun.com">speedrun.com</a>. A Moderator can alwats submit it to you if you prefer to not have a speedrun.com account.</span>
        </>
    )
}

function Categories() {
    return (
        <>
            <h2 className='text-uppercase' id='categories'>Which Categories are eligible?</h2>
            <ul>
                <li>
                    Mario's New Earth - 70 Star
                </li>
                <li>
                    Mario's New Earth - 125 Star
                </li>
                <li>
                    SM64: The Green Stars - 1 Star
                </li>
                <li>
                    SM64: The Green Stars - 81 Stars
                </li>
                <li>
                    SM64: The Green Stars - 131 Stars
                </li>
                <li>
                    Ztar Attack Rebooted - 12 Star
                </li>
                <li>
                    Ztar Attack Rebooted - 96 Star
                </li>
                <li>
                    Ztar Attack Rebooted - 170 Star
                </li>
            </ul>
        </>
    )
}

function Join() {
    return (
        <>
            <h2 className='text-uppercase' id='join'>Can I still join the league?</h2>
            <span>No, unfortunately all spaces are filled now. Feel free to watch the league progressing by progressively checking out this page or supporting the runners! Their streams when they are live can be found <a href="#streams">here</a>! Otherwise try next year again!</span>
        </>
    )
}

function Leaderboard() {
    const [teamsLeaderboard, setTeamLeaderboard] = useState([]);
    const [userLeaderboard, setUserLeaderboard] = useState([]);
    useEffect(() => {
        Promise.all([
            fetch('/api/sheets?id=14ja7ooTwjQzVkw-bjO3F8Xf2c21OLA0QU4vtPtfFpKQ&range=team+leaderboard!A1:B9').then(response => {if(response.ok) return response.json(); else throw response}),
            fetch('/api/sheets?id=14ja7ooTwjQzVkw-bjO3F8Xf2c21OLA0QU4vtPtfFpKQ&range=user+leaderboard!A1:C105').then(response => {if(response.ok) return response.json(); else throw response})

        ])
        .then(data => {
            setTeamLeaderboard(data[0])
            setUserLeaderboard(data[1])
        })
        .catch(error => {
          console.log(error)
        })
      }, []);

    return (
        <>
            <h2 className='text-uppercase' id='leaderboard'>Leaderboard</h2>
            <h3 className='text-uppercase' id='teamleaderboard'>Team Leaderboard</h3>
            <Table bordered responsive hover size='sm'>
                <tbody>
                {teamsLeaderboard.map((row) => (
                    <>
                        <tr>
                            {row.map(element => (
                                <>  
                                    <td>{element}</td>
                                </>
                            ))}
                        </tr>
                    </>
                ))}
                </tbody>
            </Table>
            <h3 className='text-uppercase' id='userleaderboard'>User Leaderboard</h3>
            <Table bordered responsive hover size='sm'>
                <tbody>
                    {userLeaderboard.map((row) => (
                        <>
                            <tr>
                                {row.map((element) => (
                                    <>
                                        <td>{element}</td>
                                    </>
                                ))}
                            </tr>
                        </>
                    ))}
                </tbody>
            </Table>
        </>
    )
}