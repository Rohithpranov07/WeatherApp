import { useEffect, useState } from "react";

export default function useGeolocation(){
    const [coords, setCoords] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => 
                setCoords({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                }),
            (error) => 
                setError(error.message)
        );
    }, []);
    return { coords, error };
}