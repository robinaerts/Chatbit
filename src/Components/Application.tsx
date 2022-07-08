import { collection, orderBy, query, limit, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../config/firebaseConfig"
import ChatSelect from "./ChatSelect"
import MyChat from "./MyChat"
import OtherChat from "./OtherChat"

export default function Application() {
    const [messages, setMessages] = useState<{owner?: string, text?: string, createdAt?: string}[]>([{owner: "", text: "", createdAt: ""}]);
    const user = auth.currentUser;

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
                    <div className="profile-img"></div>
                    <div>
                        <p style={{fontWeight: "bold"}}>Fname Lname</p>
                        <p style={{fontSize: "0.8rem"}}>email@domain.com</p>
                    </div>
                </div>
                    <input type="text" id="search-user-input" placeholder="Search for a user..."/>
                    <div id="chat-select-container">
                        <h4 style={{marginBottom: "1rem"}}>Nothing here yet...</h4>
                        <p>Start chatting with someone by searching for their username!</p>
                        {/* <ChatSelect/> */}
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