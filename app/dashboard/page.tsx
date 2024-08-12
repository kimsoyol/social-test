import { getData } from "@/lib/action";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const page = async () => {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data.posts} />
    </div>
  );
};
export default page;
