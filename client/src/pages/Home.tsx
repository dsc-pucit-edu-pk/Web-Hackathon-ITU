import useAuthStore from "../store/authStore";
import { loginBack } from "../hooks/auth";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const Home = () => {
    const { user, setUser, setToken } = useAuthStore();

    useEffect(() => {
        handleLoginBack();
    }, []);

    const handleLoginBack = async () => {
        try {
            const res = await loginBack();
            if (!res) {
                return;
            }
            setUser(res?.user);
            if (res?.token) {
                setToken(res.token);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div className="min-h-screen">
            <div className="flex justify-center">
                <div className="w-full p-20">
                    {user ? (
                        <div>
                            <h1 className="font-medium text-3xl text-violet-950 mb-1">Weclome {user.name}!</h1>
                            <h2 className="text-md text-violet-950 mb-6">Your email is: {user.email}!</h2>
                            
                        </div>
                    ) : (
                        <h1 className="font-medium text-3xl text-violet-950 mb-6">Login first.</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;