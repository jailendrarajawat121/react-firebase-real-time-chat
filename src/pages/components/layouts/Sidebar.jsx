import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Card, Badge, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const usersRef = ref(database, 'users');
        onValue(usersRef, (snapshot) => {
            const data = snapshot?.val();
            if (data) {
                const usersArray = Object?.values(data);
                const filteredUsers = usersArray?.filter(u => u?.uid !== user?.uid);
                setUsers(filteredUsers);
            } else {
                console.error('No data found at users reference');
                setUsers([]);
            }
        }, (error) => {
            console.error('Error fetching users data:', error);
        });
    }, [user]);

    useEffect(() => {
        // Fetch all messages
        const messagesRef = ref(database, 'messages');
        onValue(messagesRef, (snapshot) => {
            const data = snapshot?.val();
            const messagesArray = data ? Object.values(data) : [];
            setMessages(messagesArray); // Store all messages
        });
    }, []);

    const getLastMessage = (uid) => {
        // Find the last message for the user
        const userMessages = messages.filter(msg =>
            (msg?.recipientId === uid && msg?.uid === user?.uid) ||
            (msg?.recipientId === user?.uid && msg?.uid === uid)
        );

        if (userMessages.length > 0) {
            const lastMessage = userMessages?.sort((a, b) => b?.timestamp - a?.timestamp)[0];
            return lastMessage.text;
        }
        return null;
    };

    return (
        <Card style={{ width: '18rem' }} className="shadow-sm">
            <Card.Header className="bg-primary text-white text-center">
                {user && `Welcome, ${user?.displayName || user?.email}`}
            </Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                    {users?.map((u) => (
                        <ListGroup.Item
                            key={u.uid}
                            className="d-flex align-items-center justify-content-between"
                            onClick={() => navigate(`/chat/${u?.uid}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="d-flex align-items-center">
                                <Image
                                    src={u.photoURL || 'https://via.placeholder.com/40'}
                                    roundedCircle
                                    width={40}
                                    height={40}
                                    className="me-2"
                                />
                                <div>
                                    <div className="fw-bold">{u?.displayName || u?.email}</div>
                                    {getLastMessage(u?.uid) && (
                                        <small className="text-muted">{getLastMessage(u?.uid)}</small>
                                    )}
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default Sidebar;
