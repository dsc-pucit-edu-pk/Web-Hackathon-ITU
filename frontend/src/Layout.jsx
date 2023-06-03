import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import useAuthStore from "./store/authStore";
import useSocketStore from "./store/socketStore";
import { useEffect } from "react";
import { io } from "socket.io-client";

const Layout = () => {
  const { user } = useAuthStore();
  const { setSocket, socket } = useSocketStore();

  useEffect(() => {
    try {
      const socketConnect = io(import.meta.env.VITE_SOCKET_URI);
      setSocket(socketConnect);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user && socket) {
      socket.emit("addUser", user.email);
    }
  }, [user, socket]);

  function sendNoti() {
    const message = "Notification sent by client";
    const receiverId = "647b3370feaa9e2205e90055";
    socket.emit("sendMessage", { message, receiverId });
  }

  return (
    <>
      <button onClick={sendNoti}>Click me to send</button>

      <div className="min-h-screen">
        <Toaster />
        <Header />
        <div className="px-20 pb-20">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
