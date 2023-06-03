import { useEffect, useState } from "react"
import axios from "axios"
import HomeItem from "../HomeItem"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const RelatedAds = ({
    adId,
    adCategory,
    adSubCategory,
}) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchAds()
    }, [adCategory, adSubCategory])

    const fetchAds = async () => {
        setLoading(true);
        await axios
            .get(
                `${import.meta.env.VITE_BASE_URI}/products/listings?category=${adCategory}&subcategory=${adSubCategory}&page=${0}&limit=${5}`
            )
            .then((response) => {
                response.data.products = response.data.products.filter((ad) => ad._id !== adId);
                response.data.products = response.data.products.slice(0, 3);
                setData(response.data.products);
                setLoading(false);
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            {loading ? ((
                <div className="mt-8 flex gap-3 flex-wrap">
                    <div className="flex flex-col gap-2">
                        <Skeleton width={200} height={215} />
                        <div>
                            <Skeleton width={140} />
                            <Skeleton width={140} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Skeleton width={200} height={215} />
                        <div>
                            <Skeleton width={140} />
                            <Skeleton width={140} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Skeleton width={200} height={215} />
                        <div>
                            <Skeleton width={140} />
                            <Skeleton width={140} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Skeleton width={200} height={215} />
                        <div>
                            <Skeleton width={140} />
                            <Skeleton width={140} />
                        </div>
                    </div>
                </div>
            )) : (
                data.length > 0 && (
                    <>
                    <div className="mb-4 flex">
                    <h1 className="md:text-2xl font-medium">Related Ads</h1>
                        
                    <Link className="h-fit md:p-2 rounded-full font-medium ml-auto hover:bg-gray-100" to={"/listings/" + adCategory + "/" + adSubCategory}>
                                View More
                            </Link>
                    </div>
                        <div className="flex flex-wrap gap-5">
                            {data.map((ad) => (
                                <HomeItem place={ad} key={ad._id} />
                            ))}
                        </div>
                    </>
                )
            )}
        </div>
    )
}

export default RelatedAds