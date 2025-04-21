import Image from "next/image";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const gallery = 
  [
    {
      _id: 1,
      title: "GT-650",
      imageUrl: "/gt-bike1.jpg" 
    },
    {
      _id: 2,
      title: "Diet",
      imageUrl: "/diet.jpg" 
    },
    {
      _id: 3,
      title: "Camping in forest, Travel",
      imageUrl: "/travel-camping.jpg" 
    },
  ];
  return (
    <div className="container mx-auto p-4">
    {
      !gallery || gallery.length <= 0 ? (
      <div className="flex justify-center items-center min-h-[750px]">
          <ClipLoader color="#ef4444" size={120}></ClipLoader>
        </div>
        ) : gallery.length > 0 ? (
          <div>
            {
              gallery.map(item=>{
                return (
                  <Link href = {`/pin/${item._id}`} key = {item._id} className = "relative mb-4">
                    <Image src={item.imageUrl} alt = {item?.title} height={300} width={300} className="w-full h-auto rounded-lg"></Image>
                  </Link>
                )
              })
            }
          </div>
        ) : " "
    }
  </div>
  );
}