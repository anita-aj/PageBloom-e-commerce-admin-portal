import { useState } from "react";
import useProductStore from "../store/useProductStore";
import { PLACEHOLDER } from "../constants.js";  

function ProductCard({ product }) {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(product.price);

  const updatePrice = useProductStore((state) => state.updatePrice);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  
  const handleSave = async () => {
    const newPrice = Number(price);
    if (!Number.isFinite(newPrice) || newPrice < 0) {
      return;
    }

    const success = await updatePrice(product.id, newPrice);
    if (success) {
      setIsEditing(false);
    }
    };
    const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.title}"?`
    );

    if (confirmed) {
      await deleteProduct(product.id);
    }
};
return (
    <article className="rounded-xl bg-cream p-4 shadow-sm">
      <img
        src={product.image || PLACEHOLDER}
        alt={product.title}
        className="mb-4 h-48 w-full rounded-lg object-cover"
      />
      
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p className="text-sm text-gray-600">{product.author}</p>
        <p className="mt-2 text-sm">{product.category}</p>

        <div className="mt-3">
            {isEditing ? (
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min="0"
              value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-28 rounded-lg border border-gray-300 bg-white p-2"
                aria-label={`New price for ${product.title}`}
            />
            <button
              onClick={handleSave}
              className="rounded-lg bg-clay px-3 py-2 text-white"
            >
              Save
            </button>
            <button
              onClick={() => {
                setPrice(product.price);
                setIsEditing(false);
              }}
              className="rounded-lg border px-3 py-2"
            >
                Cancel
            </button>
          </div>
        ) : (
            <p className="text-lg font-bold">
            KSh {Number(product.price).toLocaleString("en-KE")}
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
            onClick={() => setIsEditing(true)}
            className="rounded-lg border border-clay px-3 py-2 text-clay"
        >
          Edit Price
        </button>
        <button
          onClick={handleDelete }
          className="rounded-lg bg-red-600 px-3 py-2 text-white"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
