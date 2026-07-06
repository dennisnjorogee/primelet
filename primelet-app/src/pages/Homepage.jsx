import houseProfile from "../assets/house-profile.jpg";
import Suggested from "./Suggested";

const propertyTypes = [
  { icon: "🏠", label: "Houses", count: 22 },
  { icon: "🏢", label: "Apartments", count: 32 },
  { icon: "🏬", label: "Office", count: 42 },
  { icon: "🏘️", label: "Townhome", count: 18 },
  { icon: "🏡", label: "Bungalow", count: 40 },
];

const Homepage = () => {
  return (
    <main>
      <section className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={houseProfile}
          alt="House Profile"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
          <h1 className="text-5xl md:text-4xl font-bold text-center text-primary">
            <span className="text-white text-shadow-xl">
              Let Us Help you find a{" "}
            </span>{" "}
            <br /> Dream House for You and Your Family
          </h1>

          <p className="mt-6 text-center text-sm md:text-xl max-w-3xl">
            Browse through the houses and find the one thet suits you and your
            family, turn that dream house to a reality living
          </p>
          <div className="flex py-3 px-5 bg-white rounded-2xl mt-4 h-16 w-full items-center justify-between gap-2 shadow-lg">
            {/* Keywords Input */}
            <input
              type="text"
              placeholder="Enter keywords"
              className="text-sm text-gray-600 placeholder-gray-400 border-0 outline-none flex-1 min-w-0"
            />

            <div className="w-px h-8 bg-gray-200" />

            {/* Sell or Rent */}
            <select className="text-sm text-gray-600 border-0 outline-none bg-transparent cursor-pointer flex-1 min-w-0">
              <option value="">Sell or Rent</option>
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </select>

            <div className="w-px h-8 bg-gray-200" />

            {/* Property Type */}
            <select className="text-sm text-gray-600 border-0 outline-none bg-transparent cursor-pointer flex-1 min-w-0">
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
            </select>

            <div className="w-px h-8 bg-gray-200" />

            {/* Location */}
            <select className="text-sm text-gray-600 border-0 outline-none bg-transparent cursor-pointer flex-1 min-w-0">
              <option value="">Location</option>
              <option value="nairobi">Nairobi</option>
              <option value="mombasa">Mombasa</option>
            </select>

            <div className="w-px h-8 bg-gray-200" />

            {/* Amenities */}
            <select className="text-sm text-gray-600 border-0 outline-none bg-transparent cursor-pointer flex-1 min-w-0">
              <option value="">Amenities</option>
              <option value="pool">Pool</option>
              <option value="gym">Gym</option>
              <option value="parking">Parking</option>
            </select>

            {/* Search Button */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shrink-0">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        {/* Top label */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-orange-500 text-lg"></span>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Property Types
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-12">
          Explore Apartment Types
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-5 max-w-5xl mx-auto">
          {propertyTypes.map((type) => (
            <div
              key={type.label}
              className="flex flex-col gap-4 p-5 bg-white rounded-2xl shadow-md border border-gray-100 hover:border-orange-400 transition-all duration-400 cursor-pointer w-44 hover:scale-105"
            >
              {/* Icon circle */}
              <div className="w-14 h-14 rounded-full bg-blue-800 flex items-center justify-center text-2xl">
                {type.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-base font-bold text-gray-800">
                  {type.label}
                </h3>
                <p className="text-sm text-orange-500">
                  {type.count} Properties
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom label */}
        <div className="flex items-center justify-center gap-2 mt-14">
          <span className="text-orange-500 text-lg"></span>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Properties
          </p>
        </div>
      </section>

      <Suggested />
    </main>
  );
};

export default Homepage;
