import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as UploadIcon } from "assets/icons/uploadPicture.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/deletePicture.svg";

const PhotoUploader = () => {
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const fileInputRef = useRef(null);

  const handlePhotoSelect = (e) => {
    const files = Array.from(e.target.files);
    const newSelectedPhotos = selectedPhotos.concat(files).slice(0, 10);
    setSelectedPhotos(newSelectedPhotos);
  };

  const handleDeletePhoto = (index) => {
    const newSelectedPhotos = selectedPhotos.filter((_, i) => i !== index);
    setSelectedPhotos(newSelectedPhotos);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <PhotoUploaderWrapper>
      <SelectedPhotoCount>({selectedPhotos.length}/10)</SelectedPhotoCount>
      <SelectedPhotosList>
        {selectedPhotos.map((photo, index) => (
          <SelectedPhoto key={index}>
            <DeleteButton onClick={() => handleDeletePhoto(index)}>
              <DeleteIcon />
            </DeleteButton>
            <img src={URL.createObjectURL(photo)} alt={`사진 ${index + 1}`} />
          </SelectedPhoto>
        ))}
      </SelectedPhotosList>
      <UploadButton onClick={handleButtonClick}>
        <UploadIcon />
        <input
          type="file"
          multiple
          onChange={handlePhotoSelect}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </UploadButton>
    </PhotoUploaderWrapper>
  );
};

const PhotoUploaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: -75rem;
  margin-top: -3rem;
`;

const SelectedPhotoCount = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.gray600};
  margin-top: 0.5rem;
`;

const UploadButton = styled.label`
  ${({ theme }) => theme.fonts.body2};
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 20rem;
  margin-top: 1rem;
`;

const SelectedPhotosList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  flex-direction: row;
`;

const SelectedPhoto = styled.div`
  position: relative;
  width: 20rem;
  height: 20rem;
  border: none;
  border-radius: 1rem;
  margin-top: 1rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray200};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray600};
`;

export default PhotoUploader;
