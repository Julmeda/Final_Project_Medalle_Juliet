import React, { useEffect, useState } from "react";
import CustomNav from "../CustomNav";
import { userData } from "../../helpers";
import Card from "./Card";
let API_key="&api_key=db95773a7fb212ba790d71f6adac0e7e";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Popular","Theatre","Kids","Drama","Comedy"];

const Home = () => {
    const [movieData, setData]=useState([]);
    const [url_set, setUrl]=useState(url);
    const [search, setSearch]=useState();

    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
           // console.log(data.results);
           setData(data.results)
        });
    },[url_set])
    const getData=(movieType)=>{
        if(movieType=="Popular")
        {
            url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
        }
        if (movieType=="Theatre") 
        {
            url=base_url+"/discover/movie?primary_release_date.gte=2018-09-15&primary_release_date.lte=2018-10-22"+API_key;
        }
        if(movieType=="Kids")
        {
            url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key;
        }
        if(movieType=="Drama")
        {
            url=base_url+"/discover/movie?with_genres=18&primary_release_year=2018"+API_key;
        }
        if(movieType=="Comedy")
        {
            url=base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key;
        }
        setUrl(url);
    }
    const searchMovie=(evt)=>{
        if(evt.key=="Enter")
        {
            url=base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }
    const {username} = userData();
    return (
        
        <>
            <div>
                <CustomNav />
                <div className="home">
                    <h2>Welcome, {username}</h2>
                </div>
            </div>
            
            <div className="header">
                <nav>
                    <ul>
                        {
                            arr.map((value)=>{
                                return(
                                    <li><a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }

                    </ul>
                </nav>                   
                <form>
                    <div className="search-btn">
                            <input type="text" 
                            placeholder="Enter Movie Name" 
                            className="inputText" 
                            onChange={(e)=>{setSearch(e.target.value)}} 
                            value={search} onKeyPress={searchMovie}>
                            </input>
                        <button i className="fas fa-search"></button>
                    </div>
                </form>
            </div>
        
            <div className="containers">
                {
                    (movieData.length==0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                        return(
                            <Card info={res} key={pos}/>
                        );
                    })
                };
            </div>
        </>
    );
};

export default Home;