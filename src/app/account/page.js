'use client'

import { useEffect, useState } from "react"
import { auth } from "../../lib/firebase"
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setDisplayName(currentUser.displayName || "")
        setEmail(currentUser.email || "")
      } else {
        router.push("/login")
      }
    })

    return () => unsubscribe()
  }, [])

  const handleUpdateProfile = async () => {
    if (!user) return
    try {
      await updateProfile(user, { displayName })
      setMessage("✅ Профилът е обновен успешно!")
      setError("")
    } catch (err) {
      console.error(err)
      setError("❌ Грешка при обновяване на профила.")
    }
  }

  const handleChangePassword = async () => {
    if (!user || !currentPassword || !newPassword) return

    const credential = EmailAuthProvider.credential(email, currentPassword)

    try {
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)
      setMessage("✅ Паролата е сменена успешно!")
      setError("")
      setCurrentPassword("")
      setNewPassword("")
    } catch (err) {
      console.error(err)
      setError("❌ Грешка при смяна на паролата. Провери текущата парола.")
    }
  }

  const handleLogout = async () => {
    await auth.signOut()
    router.push("/")
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center px-4 sm:px-8 lg:px-20 py-12 min-h-screen gap-10 bg-[#121212]">
      {/* LEFT SIDE */}
      <div className="flex flex-col items-center w-full md:w-1/3 bg-[#50688C] p-6 rounded-xl shadow-lg">
        <img
          src="/images/user icon.png"
          alt="User Icon"
          className="h-24 w-24 rounded-full mb-4 border-2 border-[#E2DAD6]"
        />
        <h2 className="text-2xl font-bold text-center">{displayName || "Няма име"}</h2>
        <p className="text-sm mt-1 text-[#E2DAD6] opacity-80">{email}</p>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          Излез
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-2/3 bg-[#2B3A55] p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-[#E2DAD6]">Настройки на профила</h1>

        {message && <p className="text-green-400">{message}</p>}
        {error && <p className="text-red-400">{error}</p>}

        {/* Update Display Name */}
        <div>
          <label className="block mb-2 font-semibold text-[#E2DAD6]">Смени име</label>
          <input
            type="text"
            className="w-full p-3 bg-[#3C5173] border border-[#E2DAD6] rounded-md text-[#E2DAD6] focus:outline-none focus:ring-2 focus:ring-[#80CBC4] placeholder:text-[#B0B9C6]"
            value={displayName}
            placeholder="Въведи ново име"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <button
            onClick={handleUpdateProfile}
            className="mt-3 w-full bg-[#50688C] hover:bg-[#5F7AA5] text-white py-2 rounded-md font-semibold transition"
          >
            Обнови име
          </button>
        </div>

        {/* Change Password */}
        <div>
          <label className="block mb-2 font-semibold text-[#E2DAD6]">Смени парола</label>
          <input
            type="password"
            placeholder="Текуща парола"
            className="w-full p-3 mb-2 bg-[#3C5173] border border-[#E2DAD6] rounded-md text-[#E2DAD6] placeholder:text-[#B0B9C6]"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Нова парола"
            className="w-full p-3 mb-2 bg-[#3C5173] border border-[#E2DAD6] rounded-md text-[#E2DAD6] placeholder:text-[#B0B9C6]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handleChangePassword}
            className="w-full bg-[#50688C] hover:bg-[#5F7AA5] text-white py-2 rounded-md font-semibold transition"
          >
            Смени паролата
          </button>
        </div>
      </div>
    </div>
  )
}
