import React from 'react';
import './styles.css';

interface HeaderProps {
    title?: string;
}
const Header: React.FC<HeaderProps> = (props) => {
    return(
        <header className="header-content">
            {props.title? <h1>ToDo List</h1> : ""}
            <div id="content">
                {props.children}
            </div>
        </header>
    );
}


export default Header;