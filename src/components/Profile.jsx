import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProfileModal from "../components/ProfileModal.jsx";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../api/axios.js";
import toast from "react-hot-toast";
import Pcard from "./Pcard.jsx";

const Profile = () => {
  const { getToken } = useAuth();
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { profileId } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const currentUser = clerkUser
    ? {
        _id: clerkUser.id,
        username: clerkUser.username || clerkUser.fullName || "User",
        email: clerkUser.primaryEmailAddress?.emailAddress,
      }
    : null;

  const isMyProfile = !profileId || profileId === currentUser?._id;

  // دالة لاقتطاع النصوص
  const truncateText = (text, wordLimit = 2) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const fetchUser = async (id) => {
    if (!id) return;
    try {
      const token = await getToken();
      const { data } = await api.post(
        "/api/user/profiles",
        { profileId: id },
        { headers: { Authorization:` Bearer ${token}` } }
      );

      if (data.success) {
        setUser(data.profile);
        setPosts(data.posts || []);
      } else {
        toast.error(data.message || "Failed to load profile");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("fetchUser error:", error);
    }
  };

  useEffect(() => {
    if (!isUserLoaded || !currentUser) return;
    const idToFetch = profileId || currentUser._id;
    fetchUser(idToFetch);
  }, [profileId, currentUser?._id, isUserLoaded]);

  if (!isUserLoaded || !currentUser) return <Loading />;
  if (!user) return <Loading />;

  return (
    <div
      className="absolute min-h-screen w-full p-6 overflow-y-auto"
      style={{
        background:
          "linear-gradient(180deg, #020617 0%, #0b1747 30%, #16213e 60%, #0f3d3e 85%, #052915 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Cover */}
        <div className="relative">
          <div className="h-56 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            {user.cover_photo ? (
              <img
                src={user.cover_photo}
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(to right, rgba(7, 23, 90, 0.9), rgba(26, 94, 73, 0.8))",
                }}
              />
            )}
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <img
              src={user.profile_picture}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-teal-300 shadow-[0_0_40px_rgba(45,212,191,0.9)]"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="mt-20 text-center text-white">
          <h1 className="text-3xl font-bold tracking-wide drop-shadow-md">
            {user.username}
          </h1>
          <p className="text-teal-200 text-sm mt-2 italic">
            {user.bio || "No bio yet..."}
          </p>

          {isMyProfile && (
            <button
              onClick={() => setShowEdit(true)}
              className="mt-3 px-5 py-2 bg-gradient-to-r from-teal-600 to-green-700 rounded-xl border
               border-teal-400 hover:brightness-110 transition-all text-sm shadow-lg"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-6">
          {["posts", "media"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all shadow-md ${
                activeTab === tab
                  ? "bg-gradient-to-r from-green-600 to-teal-500 text-white scale-110"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Posts / Media */}
      <div className="mt-8 flex flex-col items-center gap-6">
  {activeTab === "posts" &&
    (() => {
      console.log("All posts:", posts); // ✨ اطبع هنا كل البوستات
      return posts.map((post) => (
        <Pcard
          key={post._id}
          post={{
            ...post,
            title: truncateText(post.title),
            summary: truncateText(post.summary),
            content: truncateText(post.content),
            user: {
              _id: user._id,
              username: user.username,
              profile_picture: user.profile_picture,
              full_name: user.full_name,
            },
          }}
          className="w-full max-w-2xl"
        />
      ));
    })()}


          {activeTab === "media" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {posts.flatMap((p) =>
                p.image_urls.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="rounded-xl object-cover shadow-lg hover:scale-105 transition-all w-full h-48"
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* Profile Modal */}
        {showEdit && <ProfileModal user={user} setShowEdit={setShowEdit} />}
      </div>
    </div>
  );
};

export default Profile;