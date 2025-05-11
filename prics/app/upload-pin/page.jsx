"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { ArrowUpFromLine } from "lucide-react";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const UploadPin = () => {
    const[image, setImage] = useState("");
    const[imagePreview, setImagePreview] = useState("");
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[tags, setTags] = useState("");
    const[loading, setLoading] = useState("");

    const handleImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePreview(reader.result);
            setImage(file);
        };
    };

    const {data: session} = useSession();

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!image || !title || !description || !tags){
            toast.error("Please provide complete details of your pin.")
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);
        if(session){
            const user = session?.user?.name;
            formData.append("user", user);
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/pin", formData, {
                headers:{"Content-Type": "multipart/form-data" },
            }
            );

            setLoading(false);
            setImage("");
            setImagePreview("");
            setTitle("");
            setDescription("");
            setTags("");
            if(response.status === 201){
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Error uploading pin. Please try again later.");
            console.log(error);
        }
    };

    return(
        <>

        <div className="mx-auto container flex flex-col min-h-screen px-5">

            <h2 className="py-5 text-2xl font-bold sm:text-3xl sm:font-semibold
             md:text-4xl md:font-normal mb-4">
                Create Pin</h2>

            <div className="w-full mx-auto max-w-[1024px] flex flex-col gap-5 md:flex-row py-7">

                <div className="w-full gap-5 sm:flex-1 flex items-center md:justify-center">

                    <div className="bg-[#3a3a3a24] hover:cursor-pointer w-full md:w-[340px] 
                    flex items-center justify-center relative 
                    rounded-[20px] min-h-[450px]" 
                    onClick={()=>  document.getElementById("fileInput").click()}>
                        <input type="file" id="fileInput" className="hidden" onChange={handleImage}/>

                        {
                            imagePreview ? (
                                <Image src={imagePreview} alt={"ImagePreview"} 
                                className="rounded-[20px] w-full"  width={300} height={300}  />
                            ) : (<>

                            <div className="flex flex-col items-center gap-5">
                                
                                <ArrowUpFromLine className="bg-black w-[38px] h-[38px]
                                    p-[6px] text-white rounded-full">
                                </ArrowUpFromLine>
                                
                                <p>Choose a file or drag and drop it here.</p>
                            </div>

                            <div className="absolute bottom-5 text-center px-5">
                                We recommend using high quality image less than 10mb.
                            </div>
                            
                            
                            </>)
                        }

                    </div>

                    <div className="w-full sm:flex-1 flex flex-col kustify-center">

                        <div className="flex flex-col gap-5">

                            <div className="flex flex-col gap-2">

                                <label className="font-bold">Title</label>

                                <input type="text" className="focus:outline-none p-2
                                    bg-[#3a3a3a24] rounded-[7px]" placeholder="Add a title" value={title}
                                    onChange={(e)=> setTitle(e.target.value)}>
                                </input>

                            </div>

                            <div className="flex flex-col gap-2">

                                <label className="font-bold">Description</label>

                                <textarea rows={3} className="focus:outline-none p-2
                                    bg-[#3a3a3a24] rounded-[7px]" placeholder="Add a descritpion" value={description}
                                    onChange={(e)=> setDescription(e.target.value)}>
                                </textarea>

                            </div>

                            <div className="flex flex-col gap-2">

                                <label className="font-bold">Tags</label>

                                <input type="text" className="focus:outline-none p-2
                                    bg-[#3a3a3a24] rounded-[7px]" placeholder="Provide tag/genre/mood/category" value={tags}
                                    onChange={(e)=> setTags(e.target.value)}>
                                </input>

                            </div>

                            <button onClick={handleSubmit} className="bg-black text-white
                                rounded-lg p-2 text-[20px] my-5 font-bold
                                transition-all duration-300 cursor-pointer
                                hover:bg-gray-800">

                                    {
                                        loading ? (
                                            <ClipLoader color="#fff" size={20} />
                                        ) : ("Upload Pin")
                                    }

                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>

        </>
    )
}

export default UploadPin;