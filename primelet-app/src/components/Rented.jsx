import house1 from '../assets/house-profile.jpg';
import house2 from '../assets/house1.avif';
import house3 from '../assets/house.png';

const properties = [
  {
    id: 1,
    image: house1,
    title: 'Ocean Breeze Villa',
    address: '32 Ocean Drive',
    beds: 3,
    baths: 2,
    parking: 2,
    price: 'KSh 275,000',
    description:
      'A luxurious villa featuring spacious living areas, modern interiors, a private garden, and stunning ocean views. Perfect for families seeking comfort and elegance.',
  },
  {
    id: 2,
    image: house2,
    title: 'Jakson House',
    address: '221 Baker Street',
    beds: 3,
    baths: 2,
    parking: null,
    price: 'KSh 230,000',
    description:
      'A beautiful family home located in a peaceful neighborhood, offering bright rooms, a modern kitchen, and easy access to schools, shopping centers, and public transport.',
  },
  {
    id: 3,
    image: house3,
    title: 'Lakeside Cottage',
    address: '145 Pinecrest Lane',
    beds: 3,
    baths: 2,
    parking: null,
    price: 'KSh 340,000',
    description:
      'Enjoy serene lakeside living in this charming cottage with breathtaking views, cozy interiors, and a spacious outdoor area ideal for relaxation and entertainment.',
  },
  {
    id: 4,
    image: house3,
    title: 'Lakeside Cottage',
    address: '145 Pinecrest Lane',
    beds: 3,
    baths: 2,
    parking: null,
    price: 'KSh 340,000',
    description:
      'A premium waterfront property featuring elegant finishes, large windows for natural lighting, and direct access to scenic walking trails around the lake.',
  },
  {
    id: 5,
    image: house2,
    title: 'Jakson House',
    address: '221 Baker Street',
    beds: 3,
    baths: 2,
    parking: null,
    price: 'KSh 230,000',
    description:
      'Designed for modern living, this home offers spacious bedrooms, stylish bathrooms, and a welcoming atmosphere that makes it perfect for growing families.',
  },
  {
    id: 6,
    image: house1,
    title: 'Ocean Breeze Villa',
    address: '32 Ocean Drive',
    beds: 3,
    baths: 2,
    parking: 2,
    price: 'KSh 275,000',
    description:
      'Experience luxury coastal living with panoramic sea views, contemporary architecture, secure parking, and premium amenities for a comfortable lifestyle.',
  },
];

const BedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 16h20M6 8v4" />
  </svg>
)

const BathIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    <line x1="10" y1="5" x2="8" y2="7" />
    <path d="M2 12h20" />
  </svg>
)

const ParkingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M9 16V8h4a2 2 0 0 1 0 4H9" />
  </svg>
)


const Rented = () => {
  return (
   <section className="px-6 py-12 bg-white max-w-6xl mx-auto">

      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Your dream Home for rent</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-base font-bold text-gray-900">{property.title}</h3>
              <p className="text-sm text-gray-400">{property.address}</p>

              {/* Features */}
              <div className="flex items-center gap-4 text-gray-500 text-sm mt-1">
                <span className="flex items-center gap-1">
                  <BedIcon /> {property.beds}
                </span>
                <span className="flex items-center gap-1">
                  <BathIcon /> {property.baths}
                </span>
                {property.parking && (
                  <span className="flex items-center gap-1">
                    <ParkingIcon /> {property.parking}
                  </span>
                )}
              </div>

              {/* Price */}
              <p className="text-blue-600 font-bold text-base mt-1">
                {property.price}<span className="text-gray-400 font-normal text-sm">/month</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Rented;