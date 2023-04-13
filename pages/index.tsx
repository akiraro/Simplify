import LinkForm from "@/components/LinkForm";
import Navbar from "@/components/Navbar";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

interface HomeProps {
  domain: string
}

const Home: React.FC<HomeProps> = ({ domain }) => {
  return (
    <div className="relative h-screen w-full bg-gradient-to-t from-[#3b82f6] to-[#2dd4bf] flex flex-col">
      <Navbar/>
      <div className="flex h-full items-center justify-center">
        <LinkForm domain={domain}/>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context: NextPageContext) {
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
    props: {
      domain: process.env.DOMAIN || ''
    }
  }
}