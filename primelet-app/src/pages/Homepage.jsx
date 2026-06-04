
import bgvideo from '../assets/bg-car-vid.mp4'

const Homepage = () => {
  return (
<main>
    <section className="relative h-screen overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={bgvideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">

        <h1 className="text-5xl md:text-7xl font-bold text-center text-amber-500">
          Find Your Perfect Drive
        </h1>

        <p className="mt-6 text-center text-lg md:text-xl max-w-3xl">
          Browse premium cars, compare prices, and discover vehicles that match your lifestyle and budget.
        </p>

      </div>

    </section>

    {/* */}
    <section className='p-4'>

      <div>

      </div>
    </section>
</main>
  )
}

export default Homepage