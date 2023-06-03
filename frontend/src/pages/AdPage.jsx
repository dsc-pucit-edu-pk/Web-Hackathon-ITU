import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ParticipationWidget from "../components/ParticipationWidget";
import PlaceGallery from "../components/Uploaders/PlaceGallery";
import Wishlist_Icon from "../components/Wishlist_Icon";
import { format } from "timeago.js"
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useAuthStore from "../store/authStore";
import AddressLink from "../components/AccountNav/AddressLink"

export default function AdPage() {
  const { id } = useParams();
  const [Event, setEvent] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const {user, token, addToWishlist, isLiked} = useAuthStore();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchEvent();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchEvent = async () => {
    setEvent(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URI}/event/${id}`);
      if (response.data) {
        setEvent(response.data);
      } else {
        navigate('/404');
      }
    } catch (error) {
      navigate('/404');
    }
  }

  const handleWishlist = async (adId) => {
    await addToWishlist(adId, user, token);
  };

  return (
    <div className="pt-2 overflow-hidden" style={{ minHeight: "80vh" }}>
      {!Event && (
        <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>
            <Skeleton height={20} width={200} />
            <Skeleton height={12} width={100} className="mt-2" />
          </div>
        <div className="flex justify-between">
          <Skeleton height={400} width={700} className="rounded-lg" />
          <Skeleton height={400} width={360} className="rounded-3xl md:block mr-16 hidden" />
        </div>
        </motion.div>
        </AnimatePresence>
      )}
      <AnimatePresence>
      {Event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="md:text-2xl text-lg">{Event.title}</p>
          <p className=" text-gray-500 text-[10px] my-1">posted {format(Event.createdAt)}</p>
          <div className="flex gap-5 lg:flex-row flex-col justify-between">
            <div className="relative w-fit">
              <PlaceGallery photos={Event.images} />
              <div className="flex gap-5 absolute top-4 cursor-pointer md:right-2 right-2 lg:right-4">
              <div onClick={(e) => { e.stopPropagation(); user ? handleWishlist(Event._id) : setOpenLogin(true) }}>
                  <Wishlist_Icon isLiked={isLiked(Event._id)} size={23} />
                </div>
              </div>
            </div>

            <div className="my-4 md:hidden">
              <h3 className="text-xl">{Event.title}</h3>
              <AddressLink>{Event.location}</AddressLink>
              <button onClick={() => {user ? setOpenReport(true) : setOpenLogin(true) }} className="text-xs items-center mt-2 h-fit text-primary bg-red-100 p-2 font-medium rounded-lg hover:bg-red-200">Report this ad</button>
            </div>
            <ParticipationWidget event={Event} />
          </div>

          <div className="mt-3 mb-8 grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-[2fr_1fr]">
            <div>
              <div className="hidden md:block my-4">
                <h3 className="md:text-xl w-fit text-sm">{Event.title}</h3>
                <div className="flex">
                <AddressLink>{Event.location}</AddressLink>
                <button onClick={() => {user ? setOpenReport(true) : setOpenLogin(true) }} className="text-xs items-center ml-auto h-fit text-primary bg-red-100 p-2 font-medium rounded-lg hover:bg-red-200">Report this ad</button>
                </div>
              </div>
              <hr className="mt-8 mb-6" />
              <div className="flex flex-col">
                <h3 className="md:text-2xl font-medium">Description:</h3>
                <p className="mt-2">{showFullDescription ? Event.description : `${Event.description.slice(0, 200)}...`}</p>
                <button onClick={toggleDescription} className="md:ml-auto w-fit mt-2 md:p-2 bg-white font-medium md:hover:bg-gray-100 rounded-full">
                  {showFullDescription ? "Hide Description" : "Show full Description"}
                </button>
              </div>
            </div>
            <div>
            </div>
            <div>
              <hr />
              <br />
              {/* <RelatedAds adId={place._id} adCategory={place.category} adSubCategory={place.subcategory} /> */}
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}