import { createContext } from "react";

const ProfileContext = createContext();
const ProfileProvider = ProfileContext.Provider;

export default ProfileContext;
export { ProfileProvider };
