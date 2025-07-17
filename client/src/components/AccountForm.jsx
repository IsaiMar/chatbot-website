// src/components/AccountForm.jsx

function AccountForm({
  formData,
  isEditing,
  handleChange,
  handleImageUpload,
  handleSubmit,
  handleCancel,
  handleEdit,
  success,
  error,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Profile Picture */}
      <div>
        <label className="block font-medium mb-1">Profile Picture</label>
        <div className="flex items-center gap-4">
          <img
            src={formData.picture || "/images/default-user.jpg"}
            alt="Profile"
            className="h-24 w-24 object-cover rounded-full border"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm"
            />
          )}
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          readOnly={!isEditing}
          className={`w-full border rounded px-3 py-2 ${
            isEditing ? "bg-white" : "bg-light-200"
          }`}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          readOnly={!isEditing}
          className={`w-full border rounded px-3 py-2 ${
            isEditing ? "bg-white" : "bg-light-200"
          }`}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block font-medium mb-1">Phone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          readOnly={!isEditing}
          className={`w-full border rounded px-3 py-2 ${
            isEditing ? "bg-white" : "bg-light-200"
          }`}
          placeholder="e.g. 123-456-7890"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block font-medium mb-1">Address</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          readOnly={!isEditing}
          className={`w-full border rounded px-3 py-2 ${
            isEditing ? "bg-white" : "bg-light-200"
          }`}
          placeholder="Street, City, State ZIP"
        />
      </div>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}

      {isEditing ? (
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleEdit}
          className="mt-4 bg-secondary-700 text-white px-4 py-2 rounded hover:bg-secondary-800 transition"
        >
          Edit Info
        </button>
      )}
    </form>
  );
}

export default AccountForm;
