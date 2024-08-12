
import { currentRole } from "@/lib/utils";
import { redirect } from "next/navigation";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: "admin" | "user";
}

const RoleGate = async ({ children, allowedRole }: RoleGateProps) => {
  const role = await currentRole();

  if (role !== allowedRole) {
    redirect("/explore");
  }

  return <>{children}</>;
};
export default RoleGate;
