import React, { FunctionComponent } from 'react'
import { ISideBarProps } from '../../interfaces/interfaces'

const SideBar: FunctionComponent<ISideBarProps> = ({
    sideBarStyle,
    sideBarRef,
    children
}) => {
  return (
    <nav
      // className={sidebarClass}
      ref={sideBarRef}
      style={sideBarStyle}
      className="
        w-60 h-full px-1 top-0 left-0 fixed shadow-md   
        bg-gray-100 border-r border-gray-300 overflow-hidden
        dark:bg-zinc-900 dark:border-black
      "
    >
        {children}
    </nav>
  )
}

export default SideBar