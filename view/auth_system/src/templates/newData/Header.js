import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
  <>

{/* <!--Second navbar--> */}
<nav
  class="relative flex w-full flex-wrap items-center justify-between bg-gradient-to-r from-blue-600 to-blue-200 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 lg:py-4">
  <div class="flex w-full flex-wrap items-center justify-between px-3">
    <div>
      <Link
        class="text-xl font-semibold text-neutral-800 dark:text-neutral-200"
        href="#"
        >DOCTOR-APP
        </Link>
    </div>
  <Link link to ="/patient">
    Home
  </Link>
  </div>
</nav>
</>
  )
}

export default Header
