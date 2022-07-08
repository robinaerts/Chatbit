import { FC } from "react";

interface Message {
    text?: string;
    owner?: string;
    createdAt?: string;
}

const OtherChat: FC<Message> = (props) => {
    return(
        <div className="chat-other">
            <div className="profile-img-chat"></div>
            <p style={{fontSize: "0.8rem"}}>{props.text}</p>
        </div>
    )
}

export default OtherChat;