import { auth } from "@/auth"

const page = async() => {

  const session = await auth()
  console.log('dashboard session -',session);
  

  return (
    <div>
      {JSON.stringify(session)}
    </div>
  )
}
export default page