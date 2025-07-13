import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AccountPage() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/account", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser(res.data)
        setFormData({ name: res.data.name, email: res.data.email })
      } catch (err) {
        console.error("Failed to fetch user data", err)
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          localStorage.removeItem("token")
          navigate("/login")
        } else {
          setError("Failed to load account info.")
        }
      }
    }

    fetchUser()
  }, [navigate, token])


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess("")
    setError("")

    try {
      const res = await axios.put(
        "http://localhost:8081/api/account",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setUser(res.data)
      setSuccess("Profile updated successfully.")
      setIsEditing(false)
    } catch (err) {
      console.error("Failed to update profile", err)
      setError("Update failed. Please try again.")
    }
  }

  if (error && !user) {
    return (
      <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!user) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Account Info</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border rounded px-3 py-2 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={!isEditing}
            className={`w-full border rounded px-3 py-2 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
            required
          />
        </div>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}

        {isEditing && (
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ name: user.name, email: user.email })
                setIsEditing(false)
                setSuccess("")
                setError("")
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </form>

      {!isEditing && (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Edit
        </button>
      )}

    </div>
  )
}

export default AccountPage
