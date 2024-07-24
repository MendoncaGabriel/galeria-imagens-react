import { useState, useEffect } from 'react'
import Polaroid from './components/Polaroid'

function App() {
  const [imagens, setImagens] = useState([])
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)

  const uriApi = `https://picsum.photos/v2/list?page=${page}&limit=20`

  useEffect(()=> {
    ( async () => {
      setLoading(true)
      try {
        const res = await fetch(uriApi, {
          method: "GET",
          headers: {"Content-Type":"application/json"}
        })
        const data = await res.json()
        setImagens((prev) => [...prev, ...data])
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    })()

  },[page])

  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100){
      setPage((prev) => prev + 1)
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <section className='w-full h-full min-h-screen  bg-gray-400'>
        <div className='w-full max-w-screen-2xl grid gap-10 lg:grid-cols-2 xl:grid-cols-3 p-10  rounded-sm drop-shadow-sm m-auto items-center justify-center '>
          
          {imagens.map((item, index)=>(
            <Polaroid src={item.download_url} index={index} key={index} author={item.author}/>
          ))}

          {loading && <p>Carregando...</p>}
          
        </div>
      </section>
    </>
  )
}

export default App
