module.exports = function makeUpdateProfileImage({ db }) {
  return async function updateProfileImage({ id, filename }) {
    const fileExtension = filename.split(".").pop();
    const imageName = `${id}-profileImage.${fileExtension}`;
    const data = {
      "profile.image": imageName,
    };
    const response = await db.updateResume({ id, data });
    return imageName;
  };
};
