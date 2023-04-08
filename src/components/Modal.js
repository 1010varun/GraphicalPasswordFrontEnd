import React from "react";
import Image from "./Image";

const Modal = ({ link, handelImageClick, handelModalSubmit }) => {

  console.log("link", link);

  return (
    <>
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          {link.map((photoLink) => (
            <Image
              imageSrc={photoLink.urls.small}
              imageId={photoLink.id}
              func={handelImageClick}
            />
          ))}
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={handelModalSubmit}
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 mt-10"
          >
            Select Image
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
