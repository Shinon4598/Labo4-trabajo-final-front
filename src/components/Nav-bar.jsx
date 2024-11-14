
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Navbar({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { currentUser } = useAuth()


  return(
    <nav className="p-6 lg:px-8 bg-slate-50 border-gray-200">
      <div className="flex justify-between">
        <div className="flex lg:flex-1">
          <Link to="/" className="flex items-center">
            <img className="size-7" src="/src/assets/logo.png" alt="logo"/>
            <span className="text-base sm:text-xl font-bold text-violet-400 px-3  hover:brightness-90">Generador de ideas</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
                {children && children.map((child, index) => (
                  <Link key={index} to={child.props.href} className="text-sm/6 font-semibold text-violet-500 block relative">{child.props.children}</Link>
                ))}
        </div>
      </div>
      
      {mobileMenuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 lg:hidden flex flex-col gap-y-4 items-center">
            {children && children.map((child, index) => (
              <Link key={index} to={child.props.href} className="text-sm/6 font-semibold text-violet-500 block relative">{child.props.children}</Link>
            ))}
            {currentUser && (
              <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:flex lg:flex-1 lg:justify-end flex flex-col`}>
                <Link to="/profile" className="text-sm/6 font-semibold text-violet-500">Perfil <span aria-hidden="true">&rarr;</span></Link>
              </div>
            )}
          </div>
      )}
      
      
    </nav>
    )
}