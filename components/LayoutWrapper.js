import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
// import NavLink from './NavLink'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
// import React, {useState} from 'react';
const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}
// const [activeMenu, setActiveMenu] = useState();
const LayoutWrapper = ({ children }) => {
  const router = useRouter()
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen ">
        <header className="grid grid-cols-4 justify-items-center items-center fixed z-10 top-0 left-0 right-0 px-40 bg-white dark:bg-slate-900 dark:border-[#f5f5f5] py-6 border-b border-slate-900 backdrop-filter backdrop-blur-lg bg-opacity-30 dark:backdrop-filter dark:backdrop-blur-lg dark:bg-opacity-30">
          <div className="col-span-1">
            <Link href="/" aria-label="">
              <div className="flex items-center justify-center">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="text-slate-900 dark:text-gray-100 hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="items-center text-base leading-5 col-span-2">
            <div className="hidden sm:block ">
              {headerNavLinks.map((link) => (
                // console.log(link.href),
                <Link
                  key={link.title}
                  href={link.href}
                  // className="p-1 mx-2"
                  // activeClassName = "active-v"
                  // onClick={this.handleClick}
                  className={
                    router.pathname === link.href
                      ? 'px-1 mx-4 cursor-pointer font-bold text-primary-400 sm:p-4 dark:text-primary-400 hover:bg-gray-200 hover:rounded-xl dark:hover:bg-[#252630] underline'
                      : 'px-1 mx-4 cursor-pointer font-medium text-gray-900 sm:p-4 dark:text-gray-100 hover:bg-gray-200 hover:rounded-xl dark:hover:bg-[#252630]'
                  }
                >
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <motion.main
          className="mt-24 mb-auto"
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: 'linear' }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
