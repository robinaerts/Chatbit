import { FC } from "react"

interface Message {
    owner?: string;
    text?: string;
    createdAt?: string;
}

const MyChat: FC<Message> = (props) => {
    return (
        <div className="chat-owner">
            <p style={{width: "100%"}}>{props.text}</p>
        </div>
    )
}

export default MyChat;