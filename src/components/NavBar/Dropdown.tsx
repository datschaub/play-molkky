import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "framer-motion";

export const Dropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const dropdownVariants = {
        hidden: {
            y: -20,
            opacity: 0,
            transition: {
                duration: 0.2,
            },
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.2,
            },
        },
    };

    return (
        <div className="">
            <label
                tabIndex={0}
                className="btn btn-ghost btn-circle"
                onClick={toggleDropdown}
            >
                <Bars3Icon className="w-6 h-6" />
            </label>
            <motion.div
                className="z-[1] p-2 shadow bg-secondary rounded-box w-52 menu menu-sm dropdown-content "
                variants={dropdownVariants}
                initial="hidden"
                animate={isDropdownOpen ? "visible" : "hidden"}
            >
                <ul tabIndex={0}>
                    <li>
                        <a>Homepage</a>
                    </li>
                    <li>
                        <a>Portfolio</a>
                    </li>
                    <li>
                        <a>About</a>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
};
