"use client";
import React, { useState } from "react";
import bannerData from "@/data/bannerData.json";
import { PencilIcon } from "@heroicons/react/solid";
import EditBannerPopup from "./EditBannerPopup";

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

const HomePage = () => {
  const [banners, setBanners] = useState<Banner[]>(bannerData.banner);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  const handleSave = async (updatedBanner: Banner) => {
    try {
      const response = await fetch("/api/updateBanner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ banner: updatedBanner }),
      });

      if (response.ok) {
        setBanners(
          bannerData.banner.map((b) =>
            b.id === updatedBanner.id ? updatedBanner : b
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
      {bannerData.banner.map((banner: Banner) => (
        <div
          className="relative p-4 text-white rounded-md overflow-hidden"
          style={{
            background: `url(${banner.background})`,
            backgroundSize: "cover",
          }}
          key={banner.id}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 p-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold">{banner.title}</h2>
            <p className="mt-2">{banner.description}</p>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded">
              {banner.cta}
            </button>
            <button
              className="absolute top-2 right-2  hover:bg-gray-800 text-white p-2 rounded-full"
              aria-label="Edit"
              onClick={() => setSelectedBanner(banner)}
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
