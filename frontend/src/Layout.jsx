import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header"
import useAuthStore from "./store/authStore";
import useSocketStore from "./store/socketStore";
import { useEffect } from "react";
import {io} from "socket.io-client";

const Layout = () => {
    const { user } = useAuthStore();
    const {setSocket, socket} = useSocketStore();

    useEffect(()=>{
        try {         
            const socketConnect = io(import.meta.env.VITE_SOCKET_URI);
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
        <Header />
        <div>
        <Outlet />
        </div>
        </div>
    );
};

export default Layout;