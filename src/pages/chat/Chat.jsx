import React, { useEffect, useState } from 'react';
import { database, auth } from '../../firebase';
import { ref, onValue, push } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const { uid } = useParams();
    const [user] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatUserName, setChatUserName] = useState('');

    useEffect(() => {
        const userRef = ref(database, 'users/' + uid);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setChatUserName(data.displayName || data.email);
            }
        });
    }, [uid]);

    useEffect(() => {
        const messagesRef = ref(database, 'messages');
        onValue(messagesRef, (snapshot) => {
            const data = snapshot?.val();
            const messagesArray = data ? Object?.values(data) : [];
            if (user) {
                const filteredMessages = messagesArray.filter(msg =>
                    (msg?.recipientId === uid && msg?.uid === user?.uid) ||
                    (msg?.recipientId === user?.uid && msg?.uid === uid)
                );
                setMessages(filteredMessages);
            }
        });
    }, [uid, user]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !user) return;

        const messagesRef = ref(database, 'messages');
        push(messagesRef, {
            text: newMessage,
            uid: user?.uid,
            recipientId: uid,
            displayName: user?.displayName || user?.email,
            timestamp: Date.now(),
        });
        setNewMessage('');
    };

    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        if (messageDate.toDateString() === today.toDateString()) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (messageDate.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow at ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return messageDate.toLocaleDateString();
        }
    };

    return (
        <div>
            <h2>Chat with {chatUserName || uid}</h2>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={msg?.uid === user?.uid ? 'my-message' : 'other-message'}>
                        <strong>{msg?.displayName}: </strong>{msg?.text}
                        <div className="text-muted" style={{ fontSize: '0.8em' }}>
                            {formatTimestamp(msg?.timestamp)}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;