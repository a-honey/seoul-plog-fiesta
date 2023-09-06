import { useState, useRef } from 'react';

function useImgChange() {
  const [imgContainer, setImgContainer] = useState(null);
  const imgRef = useRef(null);

  const handleImgChange = (e) => {
    const img = e.target.files[0];

    if (!img) {
      alert('Please insert the image file.');
      return;
    } else if (
      img.type !== 'image/png' &&
      img.type !== 'image/jpeg' &&
      img.type !== 'image/jpg'
    ) {
      alert('Only image files with the JPG or PNG extension can be registered.');
      return;
    }
    if (img) {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          if (imgRef.current) {
            imgRef.current.src = reader.result;
          }
        };

        reader.readAsDataURL(img);
        setImgContainer(img);
      } catch (e) {
        alert(e);
      }
    }
  };

  return { handleImgChange, imgContainer, imgRef };
}

export default useImgChange;