import LinkForm from "@/components/LinkForm";
import Navbar from "@/components/Navbar";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="relative h-full w-full bg-violet-950 flex flex-col">
    {/* <Navbar/> */}
    <div className="flex items-center justify-center">
      <LinkForm/>
    </div>

    <button onClick={()=> signOut()}>
      Sign out
    </button>
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}