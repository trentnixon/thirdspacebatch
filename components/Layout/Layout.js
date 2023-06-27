import { UserProvider } from "../../lib/authContext";

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading }}>{children}</UserProvider>
);
export default Layout;
