import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import AdminLayout from '../components/AdminLayout';

export default function AdminProducts() {
  const { products, deleteProduct, updateProduct } = useStore();
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirmDelete(null);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-xs font-body tracking-[0.18em] text-muted uppercase mb-1">Inventory</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">Products</h1>
        </div>
        <Link to="/admin/add-product" className="btn-primary flex items-center gap-2">
          <PlusCircle size={16} />
          Add Product
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="input-field pl-9"
        />
      </div>

      {/* Table */}
      <div className="card bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead className="border-b border-card-border">
              <tr className="text-xs uppercase tracking-widest text-muted">
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium hidden sm:table-cell">Category</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Stock</th>
                <th className="text-left p-4 font-medium hidden md:table-cell">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.photos?.[0]}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-sm bg-blush-light flex-shrink-0"
                      />
                      <span className="font-medium text-ink line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted hidden sm:table-cell">{product.category}</td>
                  <td className="p-4 font-medium text-espresso">GH₵ {product.price.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${
                        product.quantityInStock === 0 ? 'text-red-500' :
                        product.quantityInStock <= 3 ? 'text-amber-600' : 'text-ink'
                      }`}>
                        {product.quantityInStock}
                      </span>
                      {/* Quick stock update */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateProduct(product.id, { quantityInStock: Math.max(0, product.quantityInStock - 1) })}
                          className="w-5 h-5 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded text-xs transition-colors"
                        >−</button>
                        <button
                          onClick={() => updateProduct(product.id, { quantityInStock: product.quantityInStock + 1 })}
                          className="w-5 h-5 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded text-xs transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        to={`/admin/edit-product/${product.id}`}
                        className="p-2 text-muted hover:text-espresso hover:bg-stone-100 rounded transition-all"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => setConfirmDelete(product.id)}
                        className="p-2 text-muted hover:text-red-500 hover:bg-red-50 rounded transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setConfirmDelete(null)}
        >
          <div className="bg-white rounded-sm shadow-2xl p-8 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-lg font-semibold text-ink mb-2">Delete Product?</h3>
            <p className="text-sm text-muted font-body mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="btn-secondary flex-1">Cancel</button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 bg-red-500 text-white font-body font-medium py-3 rounded-sm hover:bg-red-600 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}