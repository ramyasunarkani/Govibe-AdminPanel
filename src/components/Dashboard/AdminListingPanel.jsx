import React, { useState, useEffect } from "react";
import './AdminListingPanel.css';
import Modal from "../UI/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNewListing, editListing, deleteListing } from "../../Store/listing_actions";

const AdminListingPanel = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listItems.items);
  const categories = useSelector((state) => state.categories.categories);

  const defaultForm = {
    placeName: "",
    pricePerNight: "",
    city: "",
    pin: "",
    category: "Villa",
    description: "",
    availability: true,
    booked: false,
    popular: false,
  };

  const [formData, setFormData] = useState(defaultForm);
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState(listings);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) return toast.warning("Upload a max of 4 images");
    const base64Images = await Promise.all(files.map(convertToBase64));
    setImages(base64Images);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      address: {
        city: formData.city,
        pin: formData.pin,
      },
      images,
      createdAt: new Date().toISOString(),
    };

    try {
      if (editingId) {
        dispatch(editListing({ ...payload, id: editingId }));
      } else {
        dispatch(addNewListing(payload));
      }
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save listing");
    }
  };

  const handleEdit = (id, data) => {
    setFormData({
      placeName: data.placeName,
      pricePerNight: data.pricePerNight,
      city: data.address?.city || "",
      pin: data.address?.pin || "",
      category: data.category,
      description: data.description,
      availability: data.availability,
      booked: data.booked || false,
      popular: data.popular || false,
    });
    setImages(data.images || []);
    setEditingId(id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteListing(id));
  };

  const openNewListingModal = () => {
    setFormData(defaultForm);
    setImages([]);
    setEditingId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(defaultForm);
    setImages([]);
  };

  useEffect(() => {
    const keyword = searchInput.toLowerCase();
    if (!keyword) {
      setSearchResults(listings);
    } else {
      const filtered = listings.filter(
        (item) =>
          item.placeName?.toLowerCase().startsWith(keyword) ||
          item.address?.city?.toLowerCase().startsWith(keyword)
      );
      setSearchResults(filtered);
    }
  }, [searchInput, listings]);

  return (
    <div>
      <span className="listing-header">
        <h1>All Listings</h1>
        <button onClick={openNewListingModal} className="new-btn">+ New Listing</button>
      </span>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by place name or city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          <h2>{editingId ? "Edit Listing" : "Create Listing"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="placeName"
              placeholder="Place Name"
              value={formData.placeName}
              onChange={handleChange}
              required
            />
            <input
              name="pricePerNight"
              type="number"
              placeholder="Price Per Night"
              value={formData.pricePerNight}
              onChange={handleChange}
              required
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              name="pin"
              placeholder="PIN Code"
              value={formData.pin}
              onChange={handleChange}
              required
            />
            <select name="category" value={formData.category} onChange={handleChange} required>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <label>
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
              />
              Available
            </label>
            <label>
              <input
                type="checkbox"
                name="booked"
                checked={formData.booked}
                onChange={handleChange}
              />
              Booked
            </label>
            <label>
              <input
                type="checkbox"
                name="popular"
                checked={formData.popular}
                onChange={handleChange}
              />
              Popular
            </label>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            <button type="submit" className="list-new">{editingId ? "Update" : "Create"}</button>
          </form>
        </Modal>
      )}

      {searchResults.map((item) => (
        <div className="listing-card" key={item.id}>
          <h3>{item.placeName} ({item.category})</h3>
          <p>₹{item.pricePerNight} per night</p>
          {item.address ? (
            <p>{item.address.city} - {item.address.pin}</p>
          ) : (
            <p>Address not available</p>
          )}
          <p>{item.description}</p>
          <p>Status: {item.availability ? "Available" : "Not Available"}</p>
          <p>Booked: {item.booked ? "Yes" : "No"}</p>
          <p>Popular: {item.popular ? "Yes" : "No"}</p>
          {item.images?.map((img, i) => (
            <img key={i} src={img} alt={`img-${i}`} width="100" />
          ))}
          <p>Created At: {new Date(item.createdAt).toLocaleDateString()}</p>
          <button onClick={() => handleEdit(item.id, item)} className="list-btn">Edit</button>
          <button onClick={() => handleDelete(item.id)} className="list-btn">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminListingPanel;
