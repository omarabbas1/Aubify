import Navbar from '../NavBar/NavBar';
import Posts from '../Posts/Posts';
import './HomePage.css';

const HomePage = () => {
  const handleSubmitPost = (newPostContent) => {
    // Here, you can perform any necessary operations with the new post content
    console.log('New post content:', newPostContent);
    // For now, let's just log the new post content
  };

  /* const handleSignOut = () => {
        / Handle sign out logic here
      };
      */

  return (
    <div className="home-page">
      <Navbar 
        websiteName="Aubify" 
        userName="User Name" 
       /* onSignOut={handleSignOut}     To handle the user's signout after creating a token.*/    
      />
       {/* Render the Posts component and pass the onSubmit function */}
       <Posts handleSubmitPost={handleSubmitPost} />
    </div>
  );
};

export default HomePage;