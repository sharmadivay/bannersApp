"use client";

import React, { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/solid";
import EditBannerPopup from "./EditBannerPopup";

interface Banner {
  _id: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

const getBanners = async () => {
  try {
    const res = await fetch("/api/updateBanner", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching banners:", error);
    return { banners: [] };
  }
};

const HomePage: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      const data = await getBanners();
      setBanners(data.banners);
    };
    fetchBanners();
  }, []);

  const handleSave = async (updatedBanner: Banner) => {
    try {
      const response = await fetch(`/api/updateBanner/${updatedBanner._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBanner),
      });

      if (response.ok) {
        setBanners((prevBanners) =>
          prevBanners.map((b) =>
            b._id === updatedBanner._id ? updatedBanner : b
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Failed to update banner:", errorData.message);
      }
    } catch (error) {
      console.error("Failed to update banner:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
      {banners.map((b) => (
        <div
          className="relative p-4 text-white rounded-md overflow-hidden"
          style={{
            background: `url(${b.background})`,
            backgroundSize: "cover",
          }}
          key={b._id}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold">{b.title}</h2>
            <p className="mt-2">{b.description}</p>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded">
              {b.cta}
            </button>
            <button
              className="absolute top-2 right-2 hover:bg-gray-800 text-white p-2 rounded-full"
              aria-label="Edit"
              onClick={() => setSelectedBanner(b)}
            >
              <PencilIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      ))}
      {selectedBanner && (
        <EditBannerPopup
          banner={selectedBanner}
          onClose={() => setSelectedBanner(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default HomePage;
