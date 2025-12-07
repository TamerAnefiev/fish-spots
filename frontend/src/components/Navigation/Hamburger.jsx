export default function Hamburger({ isOpen, handleHamburgerMenu }) {
    return (
        <button onClick={handleHamburgerMenu} className="md:hidden w-[60px] h-[45px] relative rotate-0 duration-500 ease-in-out">
            <span className={`block absolute h-[9px] bg-orange-700 rounded-lg opacity-100 duration-200 ease-in-out rotate-0 ${isOpen ? "top-[18px] left-2/4 w-0" : "top-0 left-0 w-full"}`}></span>
            <span className={`block absolute left-0 top-[18px] h-[9px] w-full bg-orange-700 rounded-lg opacity-100 duration-200 ease-in-out ${isOpen ? "rotate-45" : "rotate-0"}`}></span>
            <span className={`block absolute left-0 top-[18px] h-[9px] w-full bg-orange-700 rounded-lg opacity-100 duration-200 ease-in-out ${isOpen ? "-rotate-45" : "rotate-0"}`}></span>
            <span className={`block absolute h-[9px] bg-orange-700 rounded-lg opacity-100 duration-200 ease-in-out rotate-0 ${isOpen ? "top-[18px] left-2/4 w-0" : "top-[36px] left-0 w-full"}`}></span>
        </button>
    );
}
