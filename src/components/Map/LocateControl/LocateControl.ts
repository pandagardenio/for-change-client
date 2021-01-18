import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMap } from "react-leaflet";
// @ts-ignore
import Locate from "leaflet.locatecontrol";

export const LocateControl: React.FunctionComponent = () => {
    const { t } = useTranslation();
    const map = useMap();

    useEffect((): () => void => {
        const locateOptions = {
            flyTo: true,
            position: 'topright',
            locateOptions: {
                maxZoom: 14
            },
            strings: {
                title: t('map.controls.locate.label')
            }
        };

        const lc = new Locate(locateOptions);
        lc.addTo(map);

        return (): void => { lc.remove(); };
    }, [map, t]);

    return null;
};