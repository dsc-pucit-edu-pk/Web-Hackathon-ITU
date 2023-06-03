import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import useAuthStore from "./store/authStore";
import useSocketStore from "./store/socketStore";
import { useEffect } from "react";
import {io} from "socket.io-client";

const Layout = () => {
    const { user } = useAuthStore();
    const {setSocket, socket} = useSocketStore();

    useEffect(()=>{
        try {         
            const socketConnect = io("http://localhost:5000");
            setSocket(socketConnect);
        } catch (error) {
            console.log(error);
        }
    }, []);


     useEffect(() => {
        if (user && socket) {
            socket.emit("addUser", user.email); // this should be id
        }
    }, [user, socket]);

    return (
        <div className="min-h-screen">
        <Toaster />
        <Navbar />
        <div>
        <Outlet />
        </div>
        </div>
    );
};

export default Layout;