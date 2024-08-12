import Nav from "@/components/Nav";
import RoleGate from "@/components/RoleGate";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoleGate allowedRole={"admin"}>
      <Nav />
      {children}
    </RoleGate>
  );
};
export default Layout;
