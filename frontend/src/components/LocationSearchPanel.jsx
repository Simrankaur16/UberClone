import React from 'react'

const LocationSearchPanel = () => {
  return (
    // <div>LocationSearchPanel</div>
    <div>
      <div className='flex gap-4 border-2 p-3 border-gray-50 active:border-black my-2 items-center justify-start'>
       <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
        <i className="ri-map-pin-2-fill"></i> </h2>
       
       
        <h4 className='font-medium'>3 Melmar street, Brampton, ON</h4>
      
      </div>
    </div>
  )
}

export default LocationSearchPanel