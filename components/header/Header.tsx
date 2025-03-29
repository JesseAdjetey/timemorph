import React from 'react'
import HeaderLeft from "@/components/header/left-side";
import HeaderRight from "@/components/header/right-side";


const Header = () => {
    return (
        <div className={"mx-3 flex items-center justify-between py-4"}>
            <HeaderLeft/>
            <HeaderRight/>
        </div>

    )
}
export default Header
