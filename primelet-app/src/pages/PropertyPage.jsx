import { apiClient } from "../config/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const IMAGE_URL = import.meta.env.VITE_STATIC_FILES_URL;

export const PropertyPage = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const { slug } = params;

  useEffect(() => {
    const fetchPropertyBySlug = async () => {
      try {
        const response = await apiClient.get(`/api/v1/properties/${slug}`);
        setProperty(response.data.data.property);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyBySlug();
  }, [slug]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <img src={`${IMAGE_URL}${property.image}`} alt={property.title} />
      <h2>{property.title}</h2>
      <p>Address {property.address}</p>
      <p>County {property.county}</p>
      <p>Beds {property.beds}</p>
      <p>Baths {property.baths}</p>
      <p>Parking {property.parking}</p>
      <p>
        {Number(property.price).toLocaleString("en-KE", {
          style: "currency",
          currency: "KES",
        })}
      </p>
    </div>
  );
};
