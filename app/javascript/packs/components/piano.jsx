import React from "react";

const Piano = (props) => {
    return <ul className="set">
        <li className="bar white b" onClick={(e) => props.handleClick(e, 'B3')}/>
        <li className="bar black as"/>
        <li className="bar white a" onClick={(e) => props.handleClick(e, 'A3')}/>
        <li className="bar black gs"/>
        <li className="bar white g" onClick={(e) => props.handleClick(e, 'G4')}/>
        <li className="bar black fs" />
        <li className="bar white f" onClick={(e) => props.handleClick(e, 'F4')}/>
        <li className="bar white e" onClick={(e) => props.handleClick(e, 'E4')}/>
        <li className="bar black ds"/>
        <li className="bar white d" onClick={(e) => props.handleClick(e, 'D4')}/>
        <li className="bar black cs"/>
        <li className="bar white c" onClick={(e) => props.handleClick(e, 'C4')}/>
    </ul>
}

export { Piano };