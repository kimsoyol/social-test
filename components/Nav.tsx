import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Nav = async () => {
  const session = await auth();
  return (
    <div className="flex items-center justify-between px-8 mx-auto shadow-lg">
      <div>
        <p>{session?.user?.email}</p>
        <p>user role - {session?.user?.role}</p>
      </div>
      <div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button>Sign Out</Button>
        </form>
      </div>
    </div>
  );
};
export default Nav;
