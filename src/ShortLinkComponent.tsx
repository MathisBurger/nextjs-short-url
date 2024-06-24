import {useEffect, useState} from "react";
import React from 'react';

export interface ShortLinkMapping {
    id: string;
    url: string;
}

interface ShortLinkComponentProps {
    mapping: ShortLinkMapping[];
}

const ShortLinkComponent = ({mapping}: ShortLinkComponentProps) => {

    const [hasNoShortId, setHasNoShortId] = useState<boolean>(false);

    useEffect(() => {
        const search = new URLSearchParams(window.location.search);
        if (!search.has("shortId")) {
            setHasNoShortId(true);
            return;
        }
        const shortID = search.get("shortId");
        for (const element of mapping) {
            if(shortID === element.id) {
                window.location.replace(element.url);
                return;
            }
        }
        setHasNoShortId(true);

    }, [mapping]);

    if (hasNoShortId) {
        return (
            <p>Invalid short ID.</p>
        );
    }


    return (
      <p>Loading...</p>
    );
}

export default ShortLinkComponent;