# Final_Project_Medalle_Juliet
## System Integration Task : The Implementation of Movie API
This project aims to fully implement a functioning Movie API that generates Movie lists based on categories and movie titles the user searches for.
## Prerequisites
To begin working on this project, you'll require the installation of the following components on your computer:
```
* Node.js
* React.js
* Strapi
```
## Installation
### 1. Install Node.js <br>
*To install Node.js on your computer, follow these steps:* <br>
- Visit the official Node.js website
- Download the appropriate installer based on your operating system (LTS version is recommended), and run the installer.
- After installation, verify Node.js and npm (Node Package Manager) by checking their version numbers using the commands "node -v" and "npm -v" in the terminal or command prompt.
### 2. Install React.js
*Here's a step-by-step guide to installing React.js:*
- set up a Node.js environment on your computer
- Once Node.js is installed, open your terminal (or command prompt) and redirect it to the desired installation folder for React.js.
- Run the following command to create a new React application using the create-react-app tool (you can replace "my-react-app" with the desired name of your project):
```
npx create-react-app my-react-app
```
- After the project is created, change the working directory to your newly created React app and run the following command to start the development server:
```
cd my-react-app
npm start
```
- Install the required packages:
```
[axios] - npm install axios
[bootstrap] - npm install bootstrap
[react] - npm install react
[react-dom] - npm install react-dom
[react-router-dom] - npm install react-router-dom
[react-scripts] - npm install react-scripts
[react-toastify] - npm install react-toastify
[reactstrap] - npm install reactstrap
```
### 3. Install Strapi
*Here's a step-by-step guide to installing Strapi:*
-  Install Node.js and npm
-  Once Node.js and npm are installed, open your terminal (or command prompt), redirect it to the desired installation folder and run the following command to install Strapi globally on your system:
```
npm install -g strapi
```
- Create a new Strapi project
```
strapi new my-strapi-project
```
- Navigate to the project directory and start the Strapi server:
```
cd my-strapi-project
strapi start
```
- This will launch the Strapi server, and you'll be able to access the Strapi admin panel and API at http://localhost:1337/admin.
- Set up Strapi. Follow the on-screen instructions to complete the setup process. You'll be prompted to create an administrator account and configure your database.
- Congratulations! You have successfully installed Strapi and set up a new Strapi project.

# Movie API
The Movie API is a service that serves as a movie discovery and search application. It fetches movie data from the "The Movie Database (TMDB)" API based on different categories and names of the movie you entered in the search bar. 
### Movie API by category
*To fetch a movie based on different categories, you can make a GET request to the following endpoint:*
- (GET https://api.themoviedb.org/3/discover/movie) <br>

It will return a JSON response containing a list of movies that match the criteria you specified in the query. <br>

*example request:*
- (GET https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=YOUR_API_KEY)
  
### Movie API by searching movie name
*To search for a movie name, you can make a GET request to the following endpoint:*
- (GET https://api.themoviedb.org/3/search/movie)

It will respond with a JSON object containing a list of movies that match the search query. 

*example request:*
- (GET https://api.themoviedb.org/3/search/movie?query=movie_name&api_key=YOUR_API_KEY)

# Updated Implementation of Movie API in my React App Homepage
```
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
```
```
import React from "react";

const Card=(movie)=>{
    console.log(movie.info);
    let img_path="https://image.tmdb.org/t/p/w500";
    return(
        <>
            <div className="movie">
                <img src={img_path+movie.info.poster_path} className="poster"></img>
                <div className="movie-details">
                    <div className="box">
                        <h4 className="title">{movie.info.title}</h4>
                        <p className="rating">{movie.info.vote_average}</p>
                    </div>
                    <div className="overview">
                        <h1>overview</h1>
                        {movie.info.overview}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card;
```
## Usage
Follow these steps to start the React.js App and Strapi App separately:
1. Go to the folders where you installed the React.js App and Strapi App in separate terminal or command prompt windows.
2. In each terminal, type `npm start` to boot up the React.js and Strapi Apps.
3. Wait until both applications have finished booting up. They should automatically open in your web browser. If they don't, manually enter the provided link from the terminal into your browser's URL bar to open the applications.
4. After successful boot-up, you'll be redirected to the LOGIN page.
5. If you don't have an account, click the REGISTER button below the login form.
6. Once you've completed the registration process, you will be redirected back to the LOGIN page.
7. Use your registered email and password to log in. If successful, you'll be redirected to the HOME page.
8. You can now explore different movie categories, search for specific movies, and view detailed information about each movie displayed as cards.
9. When you are done using the applications, remember to LOGOUT.

By following these steps, you can effectively start and navigate the React.js and Strapi Apps, perform registration and login actions, and access the HOME page before logging out.

