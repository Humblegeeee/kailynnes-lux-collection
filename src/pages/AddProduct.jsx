import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import AdminLayout from '../components/AdminLayout';
import { BAG_CATEGORIES, CLOTHING_CATEGORIES, SIZE_OPTIONS, departmentOf } from '../data/sampleProducts';

const EMPTY = {
  name: '',
  price: '',
  quantityInStock: '',
  description: '',
  photos: [''],
  category: BAG_CATEGORIES[0],
  status: 'active',
  sizes: [],
};

export default function AddProduct() {
  const { addProduct } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const setPhoto = (i, value) => {
    const photos = [...form.photos];
    photos[i] = value;
    set('photos', photos);
  };

  const addPhotoField = () => {
    if (form.photos.length < 4) set('photos', [...form.photos, '']);
  };

  const removePhoto = (i) => {
    const photos = form.photos.filter((_, idx) => idx !== i);
    set('photos', photos.length > 0 ? photos : ['']);
  };

  const isClothing = departmentOf(form.category) === 'clothes';

  const toggleSize = (size) => {
    const next = form.sizes.includes(size)
      ? form.sizes.filter(s => s !== size)
      : SIZE_OPTIONS.filter(s => s === size || form.sizes.includes(s));
    set('sizes', next);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Valid price is required';
    if (form.quantityInStock === '' || !Number.isInteger(Number(form.quantityInStock)) || Number(form.quantityInStock) < 0) {
      e.quantityInStock = 'Enter a whole number, 0 or more';
    }
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    addProduct({
      ...form,
      price: Number(form.price),
      quantityInStock: Number(form.quantityInStock),
      photos: form.photos.map(p => p.trim()).filter(Boolean),
      sizes: isClothing ? form.sizes : [],
    });
    navigate('/admin/products');
  };

  return (
    <AdminLayout>
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin/products" className="text-muted hover:text-ink transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <p className="text-xs font-body tracking-[0.18em] text-muted uppercase mb-0.5">New Item</p>
          <h1 className="font-display text-4xl sm:text-5xl font-medium text-ink">Add Product</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic info */}
            <div className="card bg-white p-6 space-y-4">
              <h2 className="font-display text-2xl font-medium text-ink">Product Details</h2>

              <div>
                <label className="label">Product Name <span className="text-red-400">*</span></label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)} className="input-field" placeholder="e.g. The Executive Tote" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="label">Description <span className="text-red-400">*</span></label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} className="input-field resize-none" rows={4} placeholder="Describe the piece..." />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Price (GH₵) <span className="text-red-400">*</span></label>
                  <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className="input-field" placeholder="0" min="0" />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="label">Qty in Stock <span className="text-red-400">*</span></label>
                  <input type="number" value={form.quantityInStock} onChange={e => set('quantityInStock', e.target.value)} className="input-field" placeholder="0" min="0" />
                  {errors.quantityInStock && <p className="text-red-500 text-xs mt-1">{errors.quantityInStock}</p>}
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="card bg-white p-6">
              <h2 className="font-display text-2xl font-medium text-ink mb-4">Photo URLs</h2>
              <p className="text-xs text-muted font-body mb-4">Add image URLs (Unsplash, Google Drive, etc). First photo is the main image.</p>
              <div className="space-y-3">
                {form.photos.map((photo, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="url"
                      value={photo}
                      onChange={e => setPhoto(i, e.target.value)}
                      className="input-field"
                      placeholder={`Photo ${i + 1} URL`}
                    />
                    {i > 0 && (
                      <button type="button" onClick={() => removePhoto(i)} className="text-muted hover:text-red-500 transition-colors flex-shrink-0">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {form.photos.length < 4 && (
                  <button type="button" onClick={addPhotoField} className="flex items-center gap-1.5 text-xs font-body text-gold hover:text-espresso transition-colors">
                    <Plus size={14} /> Add another photo
                  </button>
                )}
              </div>
              {form.photos[0] && (
                <div className="mt-4">
                  <p className="text-xs text-muted font-body mb-2">Preview:</p>
                  <img src={form.photos[0]} alt="Preview" className="w-32 h-32 object-cover bg-blush-light" onError={e => { e.target.style.display = 'none'; }} />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar options */}
          <div className="space-y-6">
            <div className="card bg-white p-6 space-y-4">
              <h2 className="font-display text-2xl font-medium text-ink">Category & Status</h2>

              <div>
                <label className="label">Category</label>
                <select value={form.category} onChange={e => set('category', e.target.value)} className="input-field">
                  <optgroup label="Bags">
                    {BAG_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </optgroup>
                  <optgroup label="Clothes">
                    {CLOTHING_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </optgroup>
                </select>
              </div>

              {isClothing && (
                <div>
                  <span className="label">Sizes Available</span>
                  <div className="flex flex-wrap gap-2">
                    {SIZE_OPTIONS.map(size => (
                      <button
                        key={size}
                        type="button"
                        className="size-chip"
                        aria-pressed={form.sizes.includes(size)}
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted font-body mt-2">
                    Customers choose one of these before adding to their bag. Leave all off for one-size pieces.
                  </p>
                </div>
              )}

              <div>
                <label className="label">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)} className="input-field">
                  <option value="active">Active (visible)</option>
                  <option value="archived">Archived (hidden)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button type="submit" className="btn-primary w-full">Save Product</button>
              <Link to="/admin/products" className="btn-secondary w-full">Cancel</Link>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}