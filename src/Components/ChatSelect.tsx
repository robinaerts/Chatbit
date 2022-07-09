import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../config/firebaseConfig"

export default function ChatSelect() {
    const [chats, setChats] = useState<{[x:string]:any}[]>();
    const user = auth.currentUser;

    useEffect(() => {
        const q = query(collection(db, "chats"), where("users", "array-contains", user?.email));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((chat) => {
                return {...chat.data()}
            })
            setChats(data);
        })
        return unsubscribe;
    }, [])

    const selectChat = (e:any) => {
        e.target.classList.add("select")
    }

    return (
        <div id="chat-select">
            {!chats && 
            <>
                <h4 style={{marginBottom: "1rem"}}>Nothing here yet...</h4>
                <p>Start chatting with someone by searching for their username!</p>
            </>
            }
            {chats?.map((chat) => {
                return (
                    <div onClick={(e) => selectChat(e)} style={{display: "flex", alignItems: "center"}}>
                        <div className="profile-img"></div> 
                        <div>
                            <p>{chat.users.filter((email:string) => email != user?.email)}</p>
                            <p>Last message placeho...</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}