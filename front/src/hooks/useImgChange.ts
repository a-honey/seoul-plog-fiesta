import { useState, useRef, ChangeEvent } from 'react';

function useImgChange() {
  const [imgContainer, setImgContainer] = useState<File | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];

    if (!img) {
      alert('Please insert the image file.');
      return;
    } else if (
      img.type !== 'image/png' &&
      img.type !== 'image/jpeg' &&
      img.type !== 'image/jpg'
    ) {
      alert('JPG 혹은 PNG 확장자의 파일만 가능합니다.');
      return;
    }

    if (img) {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          if (imgRef.current && typeof reader.result === 'string') {
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
