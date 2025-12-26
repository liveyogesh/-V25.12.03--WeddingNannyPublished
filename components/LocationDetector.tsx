import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CITIES_OPTIONS } from '../constants.ts';

// Haversine formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const LocationDetector: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleProximityDetection = (latitude: number, longitude: number) => {
    let nearestCity = null;
    let minDistance = 150; // Threshold of 150km for proximity

    CITIES_OPTIONS.forEach((city) => {
      if (city.lat && city.lng && city.path) {
        const distance = calculateDistance(latitude, longitude, city.lat, city.lng);
        if (distance < minDistance) {
          minDistance = distance;
          nearestCity = city;
        }
      }
    });

    if (nearestCity && nearestCity.path) {
      navigate(nearestCity.path, { replace: true });
    }
    sessionStorage.setItem('wn_location_checked', 'true');
  };

  useEffect(() => {
    // Only detect on root or if not already checked in this session
    if (location.pathname !== '/' || sessionStorage.getItem('wn_location_checked')) {
      return;
    }

    // First check user preference
    const preferredPath = localStorage.getItem('wn_preferred_city_path');
    if (preferredPath && preferredPath !== location.pathname) {
      navigate(preferredPath, { replace: true });
      sessionStorage.setItem('wn_location_checked', 'true');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleProximityDetection(position.coords.latitude, position.coords.longitude);
        },
        async () => {
          // Fallback to IP Geolocation if permission denied or unavailable
          try {
            const res = await fetch('https://ipapi.co/json/');
            const data = await res.json();
            if (data.latitude && data.longitude) {
              handleProximityDetection(data.latitude, data.longitude);
            } else {
              sessionStorage.setItem('wn_location_checked', 'failed');
            }
          } catch {
            sessionStorage.setItem('wn_location_checked', 'error');
          }
        },
        { timeout: 8000 }
      );
    }
  }, [location.pathname, navigate]);

  return null;
};

export default LocationDetector;