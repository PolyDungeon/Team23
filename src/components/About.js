import React,{ useState, useEffect} from 'react'

const About = () => {
    //URL will be updated when we have a working database
    const url = "temp";
    const [data, setData] = useState([]);

    const fetchInfo = () =>{
        return fetch(url)
            .then((res) => res.json())
            .then((d) => setData(d))
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    
    return (
        <div className="content">
            
            <h1>TruckBucks</h1>
                <p>Team: {}</p>
                <p>Version: {}</p>
                <p>Release Date: {}</p>
                <h5>What is TruckBucks?</h5>
                <p>...</p>
            
        </div>
    );
}

export default About;
