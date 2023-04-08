import React from "react";

const Image = ({ imageSrc, imageId, func }) => {

    return (
      <img
        class="rounded-t-lg"
        src={imageSrc}
        alt=""
        onClick={() => func(imageId)}
        className="cursor-pointer object-cover h-24 w-96 focus:outline-none focus:ring focus:ring-violet-900"
      />
    );
}

export default Image;