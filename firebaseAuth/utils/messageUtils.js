export const formatTime = dateString => {
  return new Date(dateString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const generateRoomName = (userId, currentUserId) => {
  return [userId, currentUserId].sort().join('_');
};
