import React from 'react'

const LocationSearchPanel = ({ suggestions, setvehiclePanel, setpanelOpen, setpickup, setdestination, activeField }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setpickup(suggestion.description);
    } else if (activeField === 'destination') {
      setdestination(suggestion.description);
    }
    // setpanelOpen(false);
    // setvehiclePanel(true);
  }

  return (
    <div>
      {
        suggestions.map((elem, idx) => (

          <div key={elem.place_id || idx} onClick={() => handleSuggestionClick(elem)}

            className='flex gap-4 border-2 p-3 border-white active:border-black rounded-xl  m-2   my-2 items-center justify-start'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-2-fill"></i> </h2>
            <h4 className='font-medium'>{elem.description}</h4>

          </div>

        ))

      }


    </div>


  )




}



export default LocationSearchPanel