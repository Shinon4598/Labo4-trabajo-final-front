
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { currentUser } = useAuth()

  const childrens = React.Children.map(props.children, (child) => {

    return React.cloneElement(child, 
      { className: `${mobileMenuOpen && 'block'} text-sm/6 font-semibold text-gray-900` }
    )
  })


  return(
    <nav className="flex items-center justify-between p-6 lg:px-8 bg-slate-50" aria-label="Global">
      <div className="flex lg:flex-1">
        <Link to="/" className="flex items-center">
          <img className="size-5" src="/src/assets/logo.png" alt="logo"/>
          <span className="text-base sm:text-xl font-bold text-[#1e0e4b] text-black px-3">Generador de ideas</span>
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
      {props.children && (
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:flex lg:flex-1 lg:gap-x-12 flex flex-col`}>
          {childrens}
        </div>
      )}
      {currentUser && (
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:flex lg:flex-1 lg:justify-end flex flex-col`}>
          <Link to="/perfil" className="text-sm/6 font-semibold text-gray-900">Perfil <span aria-hidden="true">&rarr;</span></Link>
        </div>
      )}
      
    </nav>
    )
}