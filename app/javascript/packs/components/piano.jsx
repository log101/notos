import React from "react";

const Piano = (props) => {
    return <ul className="piano">
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '1C')} className="white-key" data-key="20" data-note="1C"></span>
            <span onClick={(e) => props.handleClick(e, '1Cs')} className="black-key" data-key="81" data-note="1Cs"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '1D')} className="white-key" data-key="65" data-note="1D"></span>
            <span onClick={(e) => props.handleClick(e, '1Ds')} className="black-key" data-key="87" data-note="1Ds"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '1E')} className="white-key" data-key="83" data-note="1E"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '1F')} className="white-key" data-key="68" data-note="1F"></span>
            <span onClick={(e) => props.handleClick(e, '1Fs')} className="black-key" data-key="82" data-note="1Fs"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '1G')} className="white-key" data-key="70" data-note="1G"></span>
            <span onClick={(e) => props.handleClick(e, '1Gs')} className="black-key" data-key="84" data-note="1Gs"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '2A')} className="white-key" data-key="71" data-note="2A"></span>
            <span onClick={(e) => props.handleClick(e, '2As')} className="black-key" data-key="89" data-note="2As"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '2B')} className="white-key" data-key="72" data-note="2B"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '2C')} className="white-key" data-key="74" data-note="2C"></span>
            <span onClick={(e) => props.handleClick(e, '2Cs')} className="black-key" data-key="73" data-note="2Cs"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '2D')} className="white-key" data-key="75" data-note="2D"></span>
            <span onClick={(e) => props.handleClick(e, '2Ds')} className="black-key" data-key="79" data-note="2Ds"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '2E')} className="white-key" data-key="76" data-note="2E"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '2F')} className="white-key" data-key="186" data-note="2F"></span>
            <span onClick={(e) => props.handleClick(e, '2Fs')} className="black-key" data-key="219" data-note="2Fs"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '2G')} className="white-key" data-key="222" data-note="2G"></span>
            <span onClick={(e) => props.handleClick(e, '2Gs')} className="black-key" data-key="221" data-note="2Gs"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '3A')} className="white-key" data-key="220" data-note="3A"></span>
            <span onClick={(e) => props.handleClick(e, '3As')} className="black-key" data-key="13" data-note="3As"></span>
        </li>
        <li className="key">
            <span onClick={(e) => props.handleClick(e, '3B')} className="white-key" data-key="37" data-note="3B"></span>
        </li>
        <li className="wlink"><a href="https://mczak.com/code/piano/" target="_blank">Piano HTML</a></li>
    </ul>
}

export { Piano };