import Image from "next/image";
import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div>
      <div className="h-60 w-full overflow-clip rounded-b-sm rounded-tl-[150px] rounded-tr object-cover xl:hidden  ">
        <img
          src={
            "https://res.cloudinary.com/dzzvve3hs/image/upload/v1648613523/Decor%20Assets/raimond-klavins-amKGac2tYaY-unsplash_koavth.jpg"
          }
          className="object-cover object-center"
        />
      </div>
      <div className="hidden h-60 w-full overflow-clip rounded-b-sm rounded-tl-[150px] rounded-tr object-cover xl:block 3xl:hidden  ">
        <Image
          src={
            "https://res.cloudinary.com/dzzvve3hs/image/upload/v1648613523/Decor%20Assets/raimond-klavins-amKGac2tYaY-unsplash_koavth.jpg"
          }
          height={240}
          width={1200}
          className="object-cover object-top "
          alt=""
        />
      </div>
      <div className="hidden h-72 w-full overflow-clip rounded-b-sm rounded-tl-[150px]  rounded-tr 3xl:block ">
        <Image
          src={
            "https://res.cloudinary.com/dzzvve3hs/image/upload/v1648613523/Decor%20Assets/raimond-klavins-amKGac2tYaY-unsplash_koavth.jpg"
          }
          height={288}
          width={1460}
          className="object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
