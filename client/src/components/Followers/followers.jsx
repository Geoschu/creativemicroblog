// const Followers = () => {
//     return (
//         <div>
//             <h2>Followers</h2>
//             <ul>
//                 <li>John Doe</li>
//                 <li>Jane Doe1</li>
//             </ul>
//         </div>
//     )
//     }


// const FollowerList = () => {
//   const [followers, setFollowers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('YOUR_FOLLOWER_API_ENDPOINT')
//      .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//      .then(data => {
//         setFollowers(data);
//         setIsLoading(false);
//       })
//      .catch(error => {
//         setError(error.message);
//         setIsLoading(false);
//       });
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Follower List</h2>
//       <ul>
//         {followers.map(follower => (
//           <li key={follower.id}>{follower.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FollowerList;
