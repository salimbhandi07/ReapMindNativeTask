// hooks/useSocket.js
import {useEffect} from 'react';
import io from 'socket.io-client';

const useSocket = (room, onMessageReceive, onMessageDelete) => {
  useEffect(() => {
    const socket = io('http://10.0.2.2:5000');

    socket.emit('join_room', room);

    socket.on('receive_message', onMessageReceive);
    socket.on('message_deleted', onMessageDelete);

    return () => {
      socket.off('receive_message', onMessageReceive);
      socket.off('message_deleted', onMessageDelete);
    };
  }, [room, onMessageReceive, onMessageDelete]);
};

export default useSocket;
