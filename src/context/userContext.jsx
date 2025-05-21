import { createContext } from "react";

const UserContext = createContext();
const UserProvider = UserContext.Provider;

export { UserProvider };
export default UserContext;
