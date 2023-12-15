'use client'
import React, { Suspense, useState } from "react"
import Link from 'next/link'; 
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Loading from "./loading";

export default function Home() {

  const [gifs, setGifs] = useState([]);
  const [gifName, setGifName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGifs, setCurrentGifs] = useState([]);
  const totalPages = 10;

  const session = useSession({
    required: true,
    onUnauthenticated(){
      redirect('/signin');
    },
  })

  const searchGifs = async (e) => {
    e.preventDefault();
    handleGiphySearch(gifName);
  }

  const handleGiphySearch = async (query) => {
    const API_KEY = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
    const LIMIT = 30;
    if(query){
      setGifName(query);
      console.log(query);
    }else{
      setGifName('');
      setGifs([]);
      setCurrentGifs([]);
      setCurrentPage(1);
      return;
    }
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${gifName}&limit=${LIMIT}`
      );
      const data = await response.json();
      const result = data.data;
      setGifs(result);
      const currentResult = result.slice((currentPage - 1) * 3, currentPage * 3);
      setCurrentGifs(currentResult);
      console.log(result);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  }

  const handlePageChange = async (e, index) => {
    console.log(e);
    e.preventDefault();
    if(index > 10 || index < 1) return;
    console.log(index);
    setCurrentPage(index);
    setCurrentGifs(gifs.slice((currentPage - 1) * 3, currentPage * 3))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <nav className="absolute top-5 right-12 custom-button cursor-pointer">
            <div onClick={()=>signOut()}>
              Signout
            </div>
        </nav>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <form className='container'>

          {/* Search Bar */}
          <div className='inner-bar relative'>
            <img src={"Search_icon.svg"} className="absolute left-3"></img>
            <input
              placeholder='Article Name or Keywords...'
              value={gifName}
              onChange={(e) => handleGiphySearch(e.target.value)}
              className="px-12"
            ></input>
            <button className='custom-button'
              onClick={searchGifs}
            >Search</button>
          </div>

          {/* Result GIFs */}
          <Suspense fallback={<Loading />}>
            {
              gifs.length < 1 ? ('') : (
                <div className="flex flex-wrap justify-center gap-5">
                  {
                    currentGifs.map((gif) => (
                      <div className="flex flex-col max-w-[310px]">
                        <img
                          key={gif.id}
                          src={gif.images.fixed_height.url}
                          alt={gif.title}
                          className="gif"
                          style={{
                            background: `url(${gif.images.fixed_height.url})`
                          }} />
                        <span className="gif-name">
                          {gif.title}
                        </span>
                        <span className="gif-username">
                          @{gif.username}
                        </span>
                      </div>
                    ))
                  }
                </div>
              )
            }

          {/* Pagination */}
          {
            gifs.length < 1 ? ('') : (
              <div className="pagination">
                <span
                  className="pageNumber"
                  onClick={(e) => handlePageChange(e, currentPage - 1)}
                  >
                  Previous
                </span>
                {
                  Array.from({ length: totalPages }, (_, index) => (
                    <button
                    key={index}
                    onClick={(e) => handlePageChange(e, index + 1)}
                    className={`pageNumber ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                      {index + 1}
                    </button>
                  ))
                }
                <span
                  className="pageNumber"
                  onClick={(e) => handlePageChange(e, currentPage + 1)}
                  >
                  Next
                </span>
              </div>
            )
          }
          </Suspense>
        </form>
      </div>
    </main>
  )
}

Home.requireAuth = true;