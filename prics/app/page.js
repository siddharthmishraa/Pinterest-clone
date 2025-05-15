"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Home() {

  const{data: session} = useSession();

  const [pins, setPins] = useState([]);



  // const pins = 
  // [
  //   {
  //     _id: 1,
  //     title: "GT-650",
  //     imageUrl: "/gt-bike1.jpg" 
  //   },
  //   {
  //     _id: 2,
  //     title: "Diet",
  //     imageUrl: "/diet.jpg" 
  //   },
  //   {
  //     _id: 3,
  //     title: "Camping in forest, Travel",
  //     imageUrl: "/travel-camping.jpg" 
  //   },
  // ];

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const getPins = async () => {
    try {
      const url = search ? `http://localhost:3000/api/pin?search=${search}` : "http://localhost:3000/api/pin";
      const response = await axios.get(url);
      setPins(response.data.pins);
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]); // to avoid indefinite loader
    }
  };
  

  useEffect(()=> {
    getPins();
  },[search, session] );

  return (
    <div className="container mx-auto p-4">
    {(!pins || pins.length <= 0 && !search) ? (
      <div className="flex justify-center items-center min-h-[750px]">
          <ClipLoader color="#ef4444" size={120}></ClipLoader>
        </div>
        ) : pins.length > 0 ? (
          <div className="columns-2 md:colums-3 lg:columns-4 xl:columns-5 gap-4">
            {
              pins.map(item=>{
                return (
                  <Link href = {`/pin/${item._id}`} key = {item._id} className = "relative mb-4 group">
                  <Image src={item?.image?.url} alt = {item?.title} height={300} width={300} className="w-full h-auto rounded-lg m-1 p-0.25"></Image>
                  <span className = "absolute inset-0 flex bg-black bg-opacity-50 opacity-0 group-hover:opacity-50  hover:rounded-lg transition-opacity duration-300"></span>
                  </Link>
                )
              })
            }
          </div>
        ) : <h3 className="min-h-[750px] flex justify-center items-center text-red-500 text-4xl fon-semibold">
          No results found for your search
        </h3>
    }
  </div>
  );
}