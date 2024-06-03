function FollowButton({ userId, initialIsFollowing }) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  
    const handleClick = async () => {
      // Assuming you have a function to toggle follow status
      const newStatus =!isFollowing;
      setIsFollowing(newStatus);
      // Call your API to update the follow status
      // await toggleFollow(userId, newStatus);
    };
  
    return (
      <button className={`follow-button ${isFollowing? 'active' : ''}`} onClick={handleClick}>
        {isFollowing? 'Unfollow' : 'Follow'}
      </button>
    );
  }
  
  export default FollowButton;