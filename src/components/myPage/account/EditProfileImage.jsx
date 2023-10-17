import styled from "styled-components";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import ProfileImg from "components/common/ProfileImg";
import { useRef, useState } from "react";
import { useProfileImageMutation } from "hooks/queries/useMyPageAccount";
import { getToken } from "utils/cookie";
import DotLoader from "components/common/DotLoader";

const EditProfileImage = ({ imageSrc }) => {
  const fileInputRef = useRef(null);
  const profileImageMutation = useProfileImageMutation();
  const token = getToken();
  const [profileImageUrl, setProfileImageUrl] = useState(imageSrc);
  const handleFileChange = (e) => {
    e.preventDefault();

    if (e.target.files) {
      const blob = new Blob([e.target.files[0]], {
        type: e.target.files[0].type,
      });

      const thumbNailImage = URL.createObjectURL(blob);
      setProfileImageUrl(thumbNailImage);
      profileImageMutation.mutate({ file: e.target.files[0], token });
    }
  };
  return (
    <div>
      <AccountProfileImageSection>
        {profileImageMutation.isLoading ? (
          <LoaderContainer>
            <DotLoader size="1rem" />
          </LoaderContainer>
        ) : (
          <ProfileImg imageSrc={profileImageUrl} size={18} />
        )}
        <SettingsIcon
          style={{ position: "absolute", right: 0 }}
          onClick={() => fileInputRef.current.click()}
        />
        <input type="file" onChange={handleFileChange} ref={fileInputRef} />
      </AccountProfileImageSection>
    </div>
  );
};

export default EditProfileImage;

const AccountProfileImageSection = styled.div`
  position: relative;
  display: flex;
  align-items: end;
  input {
    display: none;
  }
`;

const LoaderContainer = styled.div`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
`;
