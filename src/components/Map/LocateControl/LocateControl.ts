import { useEffect } from "react";
import { useMap } from "react-leaflet";
// @ts-ignore
import Locate from "leaflet.locatecontrol";

export const LocateControl: React.FunctionComponent = () => {
    const map = useMap();

    useEffect(() => {
        // geo locate props
        const locateOptions = {
            flyTo: true,
            position: 'topright',
            maxZoom: 19,
            strings: {
                title: 'Show me where I am, yo!'
            }
        };

        const lc = new Locate(locateOptions);
        lc.addTo(map);
    }, [map]);

    return null;
};