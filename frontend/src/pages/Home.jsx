import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover  bg-center  bg-[url(https://freight.cargo.site/t/original/i/60b6aefbad21906665ed34178b61e48eb0a51f9e1ca9f68ad53855516a606b9b/221209_Uber-Illo6_FinalV1.png)]  h-screen flex justify-between pt-8  w-full flex-col bg-red-200 '>
            
            <img  className="w-16   ml-8"   src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt='logo'/>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='bg-black flex items-center justify-center w-full  text-white py-3 mt-5 rounded-2xl '>Continue</Link>
            </div>

        </div>
    </div>
  )
}

export default Home