import React, { useEffect, useState } from 'react';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

const ImageSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let noOfImageToBeLoaded = 9

  const handleSearch = () => {
    fetchImages(searchQuery, noOfImageToBeLoaded);
  };

  const handleRefresh = () => {
    setSearchQuery('');
    setImages([]);
  };

  const fetchImages = async (query, count) => {
    setIsLoading(true);
    let newImages = [];
    try {
      const fetchPromises = Array.from({ length: count }, (_, i) =>
        fetch(`https://source.unsplash.com/featured/1600x900/?${query}&${i}`)
          .then(response => {
            if (response.ok) {
              return response.url;
            } else {
              console.error('Failed to fetch image:', response);
              return null; 
            }
          })
          .catch(error => {
            console.error('Error fetching image:', error);
            return null; 
          })
      );
      const results = await Promise.all(fetchPromises);

      newImages = results.filter(url => url !== null);
    } catch (error) {
      console.error('Error during fetch operation:', error);
    }
    setImages((prevImages) => [...prevImages, ...newImages]);
    setIsLoading(false);
  };
  

  const handleImageClick = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  const handleCloseEnlargedImage = () => {
    setEnlargedImage(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 100 && !isLoading
      ) {
        fetchImages(searchQuery, noOfImageToBeLoaded);
        console.log("loading")
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading,images]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-300 p-8 smooth-entry">
      <div className="flex flex-col items-center gap-3">
        <h1 className="rounded-lg text-white shadow-[0px_5px_5px_rgba(13,69,77,0.5)] italic text-center font-display text-4xl bg-gradient-to-r from-blue-500 via-yellow-400 to-green-500 p-4">
          FunPhoto
        </h1>
        <div className="box bg-white rounded-lg border border-gray-400 p-8 py-10 md:w-[50vw] w-[90vw] shadow-[0px_5px_5px_rgba(13,69,77,0.5)]">
          <h2 className="font-display text-center text-sm pb-2">Search your favorite image</h2>
          <div className="flex md:flex-row flex-col items-center justify-center">
            <input
              type="text"
              id="searchbar"
              placeholder="enter text"
              className="h-10 w-60 text-center mt-2 focus:outline-none border shadow-[0px_5px_5px_rgba(13,69,77,0.5)] border-gray-400 rounded-lg mr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="p-2 mx-2 border border-slate-400"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              type="button"
              className="p-2 mx-2 border border-slate-400"
              onClick={handleRefresh}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 flex-wrap mt-4">
        <button
          type="button"
          className="w-28 border border-slate-400"
          onClick={() => handleSearch('Nature')}
        >
          Nature
        </button>
        <button
          type="button"
          className="w-28 border border-slate-400"
          onClick={() => handleSearch('Animals')}
        >
          Animals
        </button>
        <button
          type="button"
          className="w-28 border border-slate-400"
          onClick={() => handleSearch('religion')}
        >
          Spiritual
        </button>
        <button
          type="button"
          className="w-28 border border-slate-400"
          onClick={() => handleSearch('Cities')}
        >
          Cities
        </button>
        <button
          type="button"
          className="w-28 border border-slate-400"
          onClick={() => handleSearch('architecture')}
        >
          Architecture
        </button>
        <button
          type="button"
          className="w-28 border border-slate-400"
          onClick={() => handleSearch('Scenery')}
        >
          Scenery
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="image border-2 w-80 border-blue-100 rounded-lg cursor-pointer hover:border-blue-700"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {isLoading && <div className='flex justify-center p-20'><CloudSyncIcon fontSize='large'/></div>}

      {enlargedImage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 smooth-entry bg-blue-100 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <button
              type="button"
              className="absolute top-2 right-2 z-20 text-red-500 bg-white text-lg font-bold"
              onClick={handleCloseEnlargedImage}
            >
              Close
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged Image"
              className="w-[80vw]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
