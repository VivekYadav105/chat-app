import { useEffect,  useState } from "react";
import {io} from 'socket.io-client'

function useSocket(user) {
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        let socketIo;

        if (user && user.token) {
            socketIo = io(process.env.REACT_APP_BACKEND_SOCKET_URL, {
                auth: { token: user.token }
            });
            console.log("Socket connection established");

            socketIo.on("connect_error", (err) => {
                if (err.message === "invalid credentials") {
                    console.log("Unauthorized user");
                }
                console.log(err.message);
                setSocket(null); // Reset socket on error
            });

            socketIo.on("connect", () => {
                console.log("Connected to server", socketIo.id);
            });

            socketIo.on("active_user", (data) => {
                console.log(data);
            });

            socketIo.on("message", (data) => {
                console.log(data);
            });

            socketIo.on("message_upload_completed", (data) => {
                console.log("message_upload_completed");
                console.log(data);
            });

            socketIo.on("update-message-with-files", (data) => {
                console.log("inside update-message-with-files");
                
                console.log(data);

            });

            socketIo.on("error", (error) => {
                console.log("Socket error:", error);
            });

            setSocket(socketIo);
        }

        return () => {
            if (socketIo) {
                socketIo.disconnect();
                console.log("Socket disconnected");
            }
        };
    }, [user]);

    return [socket];
}

export default useSocket;
