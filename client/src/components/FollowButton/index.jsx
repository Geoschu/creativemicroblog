import React, { useState } from 'react';

function FollowButton({ userId, initialIsFollowing }) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [followers, setFollowers] = useState(0); // Add this line
  
    const handleClick = async () => {
      const newStatus = !isFollowing;
      setIsFollowing(newStatus);
      if (!isFollowing) {
        setFollowers(followers + 1); // Increment followers count if the user is not already following
      } else {
        setFollowers(followers > 0 ? followers - 1 : 0); // Decrement followers count if the user is already following
      }
      // Call your API to update the follow status
      // await toggleFollow(userId, newStatus);
    };
  
    return (
      <div>
        <button className={`follow-button ${isFollowing ? 'active' : ''}`} onClick={handleClick}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        <p>{followers} Followers</p> {/* Display the followers count */}
      </div>
    );
}

export default FollowButton;