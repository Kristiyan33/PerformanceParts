'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { auth } from "../lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useCart } from "../lib/CartContext"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const { cart } = useCart()
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const router = useRouter()

  const [isAdmin, setIsAdmin] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        if (user.email && user.email.includes("admin@")) {
          setIsAdmin(true)
        } else {
          setIsAdmin(false)
        }
      } else {
        setUser(null)
        setIsAdmin(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setDropdownOpen(false)
    } catch (err) {
      console.error("Error signing out: ", err)
    }
  }

  const handleHover = (link) => setHoveredLink(link)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="w-full flex justify-between items-center px-4 md:px-8 py-4 bg-[#3C5173] text-white shadow-md relative">
      {/* Logo Container */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <img src="/images/site logo.png" alt="Logo" className="h-16 md:h-20 w-auto" />
          <span className="ml-3 text-xl md:text-2xl font-bold text-[#E2DAD6]">Performance Parts</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden cursor-pointer" onClick={toggleMobileMenu}>
        <div className="w-7 h-1 bg-white mb-1.5"></div>
        <div className="w-7 h-1 bg-white mb-1.5"></div>
        <div className="w-7 h-1 bg-white"></div>
      </div>

      {/* Navigation Links Container */}
      <div
        className={`${
          isMobileMenuOpen
            ? "absolute top-full left-0 right-0 flex flex-col items-center bg-[#3C5173] shadow-lg z-50 py-4 space-y-4"
            : "hidden md:flex items-center space-x-6"
        }`}
      >
        <Link
          href="/modYourCar"
          className={`text-[#E2DAD6] px-6 py-4 text-xl rounded-md transition-all duration-300 ${
            hoveredLink === "how-to-mod-your-car"
              ? "text-[#80CBC4] bg-[#50688C] shadow-md"
              : "hover:text-[#80CBC4] hover:bg-[#50688C]"
          }`}
          onMouseEnter={() => handleHover("how-to-mod-your-car")}
          onMouseLeave={() => setHoveredLink(null)}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Тунинговай колата си!
        </Link>

        <Link
          href="/shop"
          className={`text-[#E2DAD6] px-6 py-4 text-xl rounded-md transition-all duration-300 ${
            hoveredLink === "shop" ? "text-[#80CBC4] bg-[#50688C] shadow-md" : "hover:text-[#80CBC4] hover:bg-[#50688C]"
          }`}
          onMouseEnter={() => handleHover("shop")}
          onMouseLeave={() => setHoveredLink(null)}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Магазин
        </Link>

        <Link
          href="/contacts"
          className={`text-[#E2DAD6] px-6 py-4 text-xl rounded-md transition-all duration-300 ${
            hoveredLink === "contacts"
              ? "text-[#80CBC4] bg-[#50688C] shadow-md"
              : "hover:text-[#80CBC4] hover:bg-[#50688C]"
          }`}
          onMouseEnter={() => handleHover("contacts")}
          onMouseLeave={() => setHoveredLink(null)}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Контакти
        </Link>

        {user ? (
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {isAdmin ? (
              <button
                onClick={() => {
                  router.push("/admin")
                  setIsMobileMenuOpen(false)
                }}
                className={`text-[#E2DAD6] px-6 py-4 text-xl rounded-md transition-all duration-300 ${
                  hoveredLink === "admin"
                    ? "text-[#80CBC4] bg-[#50688C] shadow-md"
                    : "hover:text-[#80CBC4] hover:bg-[#50688C]"
                }`}
                onMouseEnter={() => handleHover("admin")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Админ панел
              </button>
            ) : (
              <div className="relative">
                <Link href="/cart" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/images/cart icon.png" alt="Cart" className="h-14 w-14 md:h-16 md:w-16" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#1F2937] text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            )}

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <img
                src="/images/user icon.png"
                alt="Profile"
                className="h-12 w-12 md:h-14 md:w-14 rounded-full cursor-pointer"
              />

              <div
                className={`absolute right-0 mt-2 w-52 bg-[#1F2937] rounded-md shadow-lg z-10 transition-all duration-300 ${
                  dropdownOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href="/account"
                  className="block px-5 py-4 text-base text-white hover:bg-[#3C5173]"
                  onClick={() => {
                    setDropdownOpen(false)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Профил
                </Link>
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-5 py-4 text-base text-white hover:bg-[#3C5173]"
                >
                  Излез
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <Link
              href="/login"
              className={`text-[#E2DAD6] px-6 py-4 text-xl rounded-md transition-all duration-300 ${
                hoveredLink === "login"
                  ? "text-[#80CBC4] bg-[#50688C] shadow-md"
                  : "hover:text-[#80CBC4] hover:bg-[#50688C]"
              }`}
              onMouseEnter={() => handleHover("login")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Влез!
            </Link>

            <Link
              href="/register"
              className={`text-[#E2DAD6] px-6 py-4 text-xl rounded-md transition-all duration-300 ${
                hoveredLink === "register"
                  ? "text-[#80CBC4] bg-[#50688C] shadow-md"
                  : "hover:text-[#80CBC4] hover:bg-[#50688C]"
              }`}
              onMouseEnter={() => handleHover("register")}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Регистрирай се!
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
