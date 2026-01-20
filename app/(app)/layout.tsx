import Navbar from "@/app/components/Navbar";

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      {children}
    </div>
  )
}

export default layout