import React, { useEffect, useState } from "react";
import CustomNav from "../CustomNav";
import { userData } from "../../helpers";
import Card from "./Card";
// API and base URL for the movie database
let API_key="&api_key=1e047db7d12fd2c851f81171489bc581";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;

// Array containing different movie types/categories
let arr=["Popular","Theatre","Kids","Drama","Comedy"];

const Home = () => {
    // State variables to manage movie data, URL, and search
    const [movieData, setData]=useState([]);
    const [url_set, setUrl]=useState(url);
    const [search, setSearch]=useState();

    // Fetch movie data from the API based on the URL set
    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
           // console.log(data.results);
           setData(data.results)
        });
    },[url_set])

    // Function to get data for a specific movie type/category
    const getData=(movieType)=>{
        if(movieType=="Popular")
        {
            url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
        }
        if (movieType=="Theatre") 
        {
            url=base_url+"/discover/movie?primary_release_date.gte=2022-02-17&primary_release_date.lte=2023-12-22"+API_key;
        }
        if(movieType=="Kids")
        {
            url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key;
        }
        if(movieType=="Drama")
        {
            url=base_url+"/discover/movie?with_genres=18&primary_release_year=2023"+API_key;
        }
        if(movieType=="Comedy")
        {
            url=base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key;
        }
        // Set the new URL to fetch the movie data
        setUrl(url);
    }
    // Function to search for movies based on user input
    const searchMovie=(evt)=>{
        if(evt.key=="Enter")
        {
            // Update the URL for the search query
            url=base_url+"/search/movie?api_key=1e047db7d12fd2c851f81171489bc581&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }
    // Get the username using a helper function from the userData module
    const {username} = userData();
    return (
        
        <>
            <div>
                {/* Custom navigation component */}
                <CustomNav />
                <div className="home">
                    {/* Display a welcome message with the username */}
                    <h2>Welcome, {username}</h2>
                </div>
            </div>
            
             {/* Header section with navigation and search */}
            <div className="header">
                <nav>
                    <ul>
                        {/* Map/Scan through the array of movie types and create navigation links */}
                        {
                            arr.map((value)=>{
                                return(
                                     
                                    <li>
                                        {/* When a link is clicked, call the "getData" function with the selected movie type */}
                                        {/* Set the name attribute as the movie type/category */}
                                        <a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </nav>                   
                <form>
                    {/* Input field for movie search */}
                    {/* Update the "search" state when the input value changes */}
                    {/* Trigger the "searchMovie" function when the "Enter" key is pressed */}
                    <div className="search-btn">
                            {/* Input field for movie search */}
                            <input type="text" 
                            placeholder="Enter Movie Name" 
                            className="inputText" 
                            onChange={(e)=>{setSearch(e.target.value)}} 
                            value={search} onKeyPress={searchMovie}>
                            </input>
                        {/* Search button */}
                        <button i class="fa-solid fa-magnifying-glass"></button>
                    </div>
                </form>
            </div>
            
            {/* Container to display movie cards */}
            <div className="containers">
                {/* Check if movieData is empty and display a message if so, otherwise map through movieData */}
                {
                    (movieData.length==0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                        return(
                            // Render a Card component for each movie with the info prop set to the movie data
                            <Card info={res} key={pos}/>
                        );
                    })
                };
            </div>
        </>
    );
};

export default Home;