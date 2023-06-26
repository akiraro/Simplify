import LinkForm from "@/components/LinkForm";
import Navbar from "@/components/Navbar";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import MainLayout from "@/components/MainLayout";

interface HomeProps {
  domain: string
}

const Home: React.FC<HomeProps> = ({ domain }) => {
  return (
    <MainLayout>
      <div className="flex h-screen items-center justify-center">
        <LinkForm domain={domain}/>
      </div>
    </MainLayout>
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