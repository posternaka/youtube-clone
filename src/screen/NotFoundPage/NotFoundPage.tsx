import Image from "next/image";

import NotFoundImage from "./notFound.png";

export const NotFoundPage = () => {
    return (
        <div>
            <Image loading="eager" width="500" src={NotFoundImage} alt="Not Found" />
        </div>
    )
}