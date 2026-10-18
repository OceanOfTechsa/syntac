import React from 'react'

const MapSection = () => {
  return (
    <section className={'py-8 sm:space-y-16 sm:py-16 lg:py-24'}>
      <div className={'py-8 border-y border-dashed'}>
        <iframe  className="w-full h-[300px] sm:h-[400px] grayscale hover:grayscale-0 block"
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3461.2527720649623!2d31.02809537554553!3d-29.828124775033366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef707784b47c62b%3A0x798a02e1e93a66d5!2s44%20Isaiah%20Ntshangase%20Rd%2C%20Stamford%20Hill%2C%20Durban%2C%204023!5e0!3m2!1sen!2sza!4v1763426857367!5m2!1sen!2sz"
                 width="600" height="450"
                 allowFullScreen={true}
                 aria-hidden="false"
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </section>
  )
}
export default MapSection
