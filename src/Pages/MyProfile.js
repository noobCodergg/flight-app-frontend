import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { userDetail, updateUser } from '../Services/user'; // Ensure you have this API method
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
function MyProfile() {
  const navigate=useNavigate()
  const {user}=useContext(UserContext)
 console.log(user.id)
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });
  
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const id = user.id;

  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userDetail(id);
        setProfileData(response.data[0]);
      } catch (error) {
        alert('Error fetching data');
      }
    };
    fetchUserData();
  }, [id]);

  // Handle change in the input fields
  const handleChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Enable editing for a specific field
  const handleEdit = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  // Save the updated data
  const handleSave = async (field) => {
    try {
      const updatedData = { [field]: profileData[field] };
      const response = await updateUser(id, updatedData);  // You must create this API method
      if (response.data) {
        setIsEditing((prevState) => ({
          ...prevState,
          [field]: false,
        }));
        alert('Profile updated successfully');
      }
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
        <h2 className="text-2xl font-bold text-teal-900 mb-6">My Profile</h2>

        <div className="space-y-4">
          {/* Name Section */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-gray-700">Name</label>
            {isEditing.name ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg"
                />
                <button
                  onClick={() => handleSave('name')}
                  className="text-teal-600 font-semibold"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{profileData.name}</span>
                <button
                  onClick={() => handleEdit('name')}
                  className="text-teal-600 font-semibold"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Email Section */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-gray-700">Email</label>
            {isEditing.email ? (
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg"
                />
                <button
                  onClick={() => handleSave('email')}
                  className="text-teal-600 font-semibold"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{profileData.email}</span>
                <button
                  onClick={() => handleEdit('email')}
                  className="text-teal-600 font-semibold"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Phone Section */}
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-gray-700">Phone</label>
            {isEditing.phone ? (
              <div className="flex items-center space-x-2">
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg"
                />
                <button
                  onClick={() => handleSave('phone')}
                  className="text-teal-600 font-semibold"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{profileData.phone}</span>
                <button
                  onClick={() => handleEdit('phone')}
                  className="text-teal-600 font-semibold"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
