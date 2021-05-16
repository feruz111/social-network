import { ProfileType } from "../../../redux/profile-reducer";
import Preloader from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/user.png";
import { ChangeEvent, useState } from "react";
import ProfileDataFormReduxForm from "./ProfileDataForm";
import { profileAPI } from "../../../api/api";

export type ProfileInfoType = {
  profile: any; // ProfileType
  reduxStatus: string;
  isOwner: boolean;
  updateStatusThunkCreator: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProflie: any
};

const ProfileInfo = ({
  profile,
  reduxStatus,
  isOwner,
  updateStatusThunkCreator,
  savePhoto,
  saveProflie,
}: ProfileInfoType) => {
  let [editMode, setEditMode] = useState<boolean>(false);

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };
  const onSubmit = (formData: any) => {
    console.log(formData);
    
    saveProflie(formData).then(() => {
      setEditMode(false);
    });
  };
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        {editMode ? (
          <ProfileDataFormReduxForm
            initialValue={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => setEditMode(true)}
            isOwner={isOwner}
            profile={profile}
          />
        )}
        <ProfileStatusWithHooks
          reduxStatus={reduxStatus}
          updateStatusThunkCreator={updateStatusThunkCreator}
        />
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }: any) => {
  return (
    <div>
      {isOwner && <button onClick={goToEditMode}>Edit</button>}
      <div>
        <b>Full name</b>: {profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me</b>: {profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }: any) => {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
