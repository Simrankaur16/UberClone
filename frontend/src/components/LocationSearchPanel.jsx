import React from 'react'

const LocationSearchPanel = (props) => {
  console.log("dhee" +props)

  const locations = [
    "3 Melmar street, Brampton, ON",
    "5 Melmar street, Brampton, ON",
    "23 Melmar street, Brampton, ON",
    "9 Melmar street, Brampton, ON",
  ]
  return (
    // <div>LocationSearchPanel</div>
    <div>
      {
         locations.map(function(elem, id){
          return <div key={id} onClick={()=> {
        props.setVehiclePanel(true)
        props.setPanelOpen(false)
            }} className='flex gap-4 border-2 p-3 border-white active:border-black rounded-xl  m-2   my-2 items-center justify-start'>
       <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
        <i className="ri-map-pin-2-fill"></i> </h2>
       
       
        <h4 className='font-medium'>{elem}</h4>
      
      </div>
      })
      }
    </div>
  )
}

export default LocationSearchPanel