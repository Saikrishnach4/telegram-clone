import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaMoon } from 'react-icons/fa';
import styles from './main.module.css';
import image from "../images/Chats .png";

export default function Main() {
    const [messages, setMessages] = useState([]);
    const [lastMessage, setLastMessage] = useState('');
    const [lastMessageTime, setLastMessageTime] = useState('');
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isBoxVisible, setIsBoxVisible] = useState(false); 
    const [animationInProgress, setAnimationInProgress] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const [click, setClick] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        fetchLastMessage();
    }, []);

    const fetchLastMessage = () => {
        axios.get('https://devapi.beyondchats.com/api/get_chat_messages?chat_id=3888')
            .then(response => {
                const fetchedMessages = response.data.data;
                if (fetchedMessages.length > 0) {
                    const lastMsg = fetchedMessages[fetchedMessages.length - 1].message;
                    const lastMsgTime = new Date(fetchedMessages[fetchedMessages.length - 1].created_at).toLocaleTimeString();
                    setLastMessage(lastMsg);
                    setLastMessageTime(lastMsgTime);
                    setClick(true);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    };

    const fetchMessages = () => {
        axios.get('https://devapi.beyondchats.com/api/get_chat_messages?chat_id=3888')
            .then(response => {
                const fetchedMessages = response.data.data;
                setMessages(fetchedMessages);
                setIsChatVisible(true);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    };

    const toggleBox = () => {
        if (!animationInProgress) {
            setAnimationInProgress(true);
            if (isBoxVisible) {
                setTimeout(() => {
                    setIsBoxVisible(false);
                    setAnimationInProgress(false);
                }, 300); 
            } else {
                setIsBoxVisible(true);
                setTimeout(() => {
                    setAnimationInProgress(false);
                }, 300); 
            }
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`${styles.main} ${isDarkMode ? styles.dark : styles.light}`}>
            
            <div className={styles.left}>
                <div className={styles.left1}>
                    <svg
                        style={{ cursor: "pointer" }}
                        width="20"
                        height="14"
                        viewBox="0 0 20 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={toggleBox}  
                    >
                        <path d="M0.999991 12H19C19.2549 12.0003 19.5 12.0979 19.6854 12.2728C19.8707 12.4478 19.9822 12.687 19.9972 12.9414C20.0121 13.1958 19.9293 13.4464 19.7657 13.6418C19.6021 13.8373 19.3701 13.9629 19.117 13.993L19 14H0.999991C0.745111 13.9997 0.499959 13.9021 0.314622 13.7272C0.129286 13.5522 0.0177558 13.313 0.00281867 13.0586C-0.0121185 12.8042 0.0706654 12.5536 0.234256 12.3582C0.397846 12.1627 0.629895 12.0371 0.882991 12.007L0.999991 12H19H0.999991ZM0.999991 6L19 5.998C19.2549 5.99828 19.5 6.09588 19.6854 6.27085C19.8707 6.44582 19.9822 6.68495 19.9972 6.93939C20.0121 7.19384 19.9293 7.44438 19.7657 7.63983C19.6021 7.83529 19.3701 7.9609 19.117 7.991L19 7.998L0.999991 8C0.745111 7.99972 0.499959 7.90212 0.314622 7.72715C0.129286 7.55218 0.0177558 7.31305 0.00281867 7.05861C-0.0121185 6.80416 0.0706654 6.55362 0.234256 6.35817C0.397846 6.16271 0.629895 6.0371 0.882991 6.007L0.999991 6L19 5.998L0.999991 6ZM0.999991 0H19C19.2549 0.000282707 19.5 0.0978789 19.6854 0.272848C19.8707 0.447817 19.9822 0.686953 19.9972 0.941395C20.0121 1.19584 19.9293 1.44638 19.7657 1.64183C19.6021 1.83729 19.3701 1.9629 19.117 1.993L19 2H0.999991C0.745111 1.99972 0.499959 1.90212 0.314622 1.72715C0.129286 1.55218 0.0177558 1.31305 0.00281867 1.05861C-0.0121185 0.804163 0.0706654 0.553621 0.234256 0.358168C0.397846 0.162715 0.629895 0.0371036 0.882991 0.00699997L0.999991 0H19H0.999991Z" fill="#707991" />
                    </svg>
                    <div className={styles.inputContainer}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                            placeholder='Search'
                            className={styles.searchInput}
                            type='search'
                        />
                    </div>
                </div>

                <div className={styles.beyondchat} onClick={fetchMessages}>
                    <div className={styles.avatar}>
                        <img src={image} alt='BeyondChat' className={styles.avatarImage} />
                    </div>
                    <div className={styles.hello}>
                        <div>BeyondChat</div>
                        <div className={styles.lastMessage}>{lastMessage}</div>
                    </div>
                    <div className={styles.lastMessageTime}>{lastMessageTime}</div>
                </div>

            </div>

            {(click || screenWidth < 700) && (
                <div className={styles.right}>
                    {isChatVisible && messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${styles.message} ${msg.sender_id === 1 ? styles.beyondchatMessage : styles.userMessage}`}
                        >
                            <div className={styles.messageText}>{msg.message}</div>
                            <div className={styles.messageDetails}>
                                <span className={styles.senderName}>{msg.sender.name}</span>
                                <span className={styles.timestamp}>{new Date(msg.created_at).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isBoxVisible && (
                <div className={`${styles.box} ${isBoxVisible ? styles.visible : styles.hidden}`}>
                    <button className={styles.closeButton} onClick={toggleBox}>×</button>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div style={{ borderBottom: "1px solid #ccc ", paddingBottom: "10px" }}>
                            <li>My profile</li>
                        </div>
                        <li>Account settings</li>
                        <li>Notification</li>
                        <li>Help</li>
                        <li>Dark mode</li>
                        <li>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
