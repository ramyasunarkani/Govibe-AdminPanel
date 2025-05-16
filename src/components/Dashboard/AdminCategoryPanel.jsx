import React, { useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCategory, deleteCategory, editCategories } from '../../Store/category_actions';
import './AdminCategoryPanel.css'
const AdminCategoryPanel = () => {
    const categories = useSelector((state) => state.categories.categories);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [categoryName, setCategoryName] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const dispatch=useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const openModal = (cat = null) => {
    if (cat) {
      setCategoryName(cat.name);
      setImageBase64(cat.image);
      setEditingId(cat.id);
    } else {
      setCategoryName('');
      setImageBase64('');
      setEditingId(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCategoryName('');
    setImageBase64('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !imageBase64) {
      alert('Please enter all fields.');
      return;
    }

    const payload = { name: categoryName, image: imageBase64 };

    try {
      if (editingId) {
       dispatch(editCategories({...payload,id:editingId}))
      } else {
        dispatch(addNewCategory(payload));
      }
      closeModal();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
     dispatch(deleteCategory(id))
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div>
     <div className='category-header'>
       <h1>All Categories</h1>
      <button onClick={() => openModal()} className='newcate-btn'>+New Category</button>
     </div>

      {showModal && (
        <Modal onClose={closeModal}>
          <span className='top-header'>
            <h2>{editingId ? 'Edit Category' : 'Create New Category'}</h2>
            <span onClick={()=> setShowModal(false)} className='close-x'>X</span>
          </span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required={!editingId}
            />
            <button type="submit" className='Category-new'>{editingId ? 'Update' : 'Create'}</button>
          </form>
        </Modal>
      )}

      <div className="category-container">
        {categories.map((cat) => (
          <div key={cat.id} className="category-item">
            <img src={cat.image} alt={cat.name} width="100" />
            <h3>{cat.name}</h3>
            <span className='category-btn'>
              <button onClick={() => openModal(cat)}>Edit</button>
            <button onClick={() => handleDelete(cat.id)}>Delete</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategoryPanel;
