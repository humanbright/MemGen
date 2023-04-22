import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import Image from "next/image"
import Navbar2 from "./components/Navbar2"
import { Inter, Montserrat } from "next/font/google"
import { useEffect, useState } from "react"
import axios from "axios"

const montserrat = Montserrat({ subsets: ['latin'] })

export default function HomePage() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  useEffect(() => {
    if (!user) {
      window.location.href = "/api/auth/login"
    }
  }, [user]);

  const [jobDescription, setJobDescription] = useState("")
  const [coverletter, setCoverletter] = useState("")
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post("/api/coverletter", { jobDescription }).then((res) => {
      setLoading(false)
      setCoverletter(res.data)
    })
  }

  if (user) {

    return (
      <div className={`bg-black text-white min-h-screen px-10 py-2 ${montserrat.className}`}>
        <Navbar2 />
        <div className="flex flex-col gap-8 items-center justify-center">
          <h1 className="text-3xl font-bold mt-10">{`Welcome ${user.name}, let's start building your cover letter`}</h1>
          <div className="flex w-screen min-h-full">
            <form onSubmit={handleSubmit} className="w-screen flex flex-col justify-center items-center gap-8">
              <div className="w-screen flex justify-center items-center gap-4">
                <input
                  type="text"
                  placeholder="Enter the job description..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="text-white bg-slate-700 p-2 rounded-md w-[35%] h-80 overflow-visible outline-none"
                />

                <input
                  type="text"
                  placeholder="Enter the job description..."
                  value={coverletter}
                  onChange={(e) => setCoverletter(e.target.value)}
                  className="text-white bg-slate-700 p-2 rounded-md w-[35%] h-80 outline-none"
                />
              </div>


              <button
                type="submit"
                className="bg-white text-black rounded-xl px-6 py-4 font-bold hover:scale-105 active:scale-95">
                Generate
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

