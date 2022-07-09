import { collection, orderBy, query, limit, onSnapshot } from "firebase/firestore"
import { useEffect, useState}  from "react"
import { auth, db } from "../config/firebaseConfig"
import ChatSelect from "./ChatSelect"
import MyChat from "./MyChat"
import OtherChat from "./OtherChat"
import {useNavigate} from "react-router-dom"

export default function Application() {
    const [messages, setMessages] = useState<{owner?: string, text?: string, createdAt?: string}[]>([{owner: "", text: "", createdAt: ""}]);
    const navigate = useNavigate()
    const user = auth.currentUser;
    if(user == null) {
        navigate("/login");
    }
    console.log(user?.photoURL);
    useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"), limit(100));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((msg) => ({
                ...msg.data()
            }))
            setMessages(data);
        })

    return unsubscribe;
}, [])

    return (
        <div id="app-container">
            <div id="left-bar-chat">
                <div id="profile-container">
                    <img className="profile-img" src={user?.photoURL || ""}/>
                    <div>
                        <p style={{fontWeight: "bold"}}>{user?.displayName}</p>
                        <p style={{fontSize: "0.8rem"}}>{user?.email}</p>
                    </div>
                </div>
                    <input type="text" id="search-user-input" placeholder="Search for a user..."/>
                    <div id="chat-select-container">
                        <ChatSelect/>
                    </div>
            </div>
            <div id="chat">
                <div id="chat-profile">
                    <div className="profile-img"></div>
                    <p style={{fontWeight: "bold"}}>Fname Lname</p>
                </div>
                <div id="chat-container">
                    {messages.map((msg) => {
                        if (msg.owner === user?.email) {
                            return <MyChat text={msg.text} />
                        } else {
                            return <OtherChat text={msg.text} owner={msg.owner} createdAt={msg.createdAt}/>
                        }
                    })}
                </div>
                <div id="send-message-container">
                    <input type="text" id="send-message-input" placeholder="Type your message here..."/>  
                </div>
            </div>
        </div>
    )
}