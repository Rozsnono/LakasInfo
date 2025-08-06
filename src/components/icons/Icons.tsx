import React, { JSX } from "react";

export function Settings({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {
    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    );
}

export function ChevronDown({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {
    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m6 9 6 6 6-6"></path>
        </svg>
    );
}

export function ChevronRight({ size, color, strokeColor, strokeWidth, isStroke, className, onClick }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
    onClick?: () => void;
}): JSX.Element {
    return (
        <svg onClick={onClick} className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m9 18 6-6-6-6"></path>
        </svg>
    );
}

export function ChevronLeft({ size, color, strokeColor, strokeWidth, isStroke, className, onClick }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
    onClick?: () => void;
}): JSX.Element {
    return (
        <svg onClick={onClick} className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m15 18-6-6 6-6"></path>
        </svg>
    );
}

export function Lightning({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {
    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 9h8L11 24v-9H4l9-15v9Zm-2 2V7.22L7.532 13H13v4.394L17.263 11H11Z"></path>
        </svg>

    )
}

export function Water({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {
    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m12 3.101-4.95 4.95a7 7 0 1 0 9.9 0L12 3.101Zm0-2.828 6.364 6.364a9 9 0 1 1-12.728 0L12 .273Z"></path>
        </svg>
    )
}

export function Gas({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-.866-.23-1.697-.5-2.47-1.667 1.647-2.933 2.47-3.8 2.47 3.995-7 1.8-10-4.2-14 .5 5-2.796 7.274-4.138 8.537A7.5 7.5 0 0 0 12 23Zm.71-17.765c3.241 2.75 3.257 4.887.753 9.274-.76 1.333.202 2.991 1.737 2.991.688 0 1.384-.2 2.12-.595a5.5 5.5 0 1 1-9.088-5.412c.126-.118.765-.685.793-.71.424-.38.773-.717 1.118-1.086 1.23-1.318 2.114-2.78 2.566-4.462h.001Z"></path>
        </svg>
    )
}

export function Bar({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 13h6v8H2v-8Zm14-5h6v13h-6V8ZM9 3h6v18H9V3ZM4 15v4h2v-4H4Zm7-10v14h2V5h-2Zm7 5v9h2v-9h-2Z"></path>
        </svg>
    )
}


export function Wallet({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 7h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h15v4ZM4 9v10h16V9H4Zm0-4v2h12V5H4Zm11 8h3v2h-3v-2Z"></path>
        </svg>
    )
}

export function Loader({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.364 5.636 16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364Z"></path>
        </svg>
    )
}

export function Add({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z"></path>
        </svg>
    )
}

export function Times({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m4 4 16 16"></path>
            <path d="M4 20 20 4"></path>
        </svg>
    )
}

export function Callendar({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 9.5h19V20a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V9.5Z"></path>
            <path d="M2.5 4.5a1 1 0 0 1 1-1h17a1 1 0 0 1 1 1v5h-19v-5Z"></path>
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <path d="M14 17h3"></path>
            <path d="M7 17h3"></path>
            <path d="M14 13h3"></path>
            <path d="M7 13h3"></path>
        </svg>
    )
}

export function Home({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.512.23a.75.75 0 0 1 .976 0l11.462 9.825V21.6a2.35 2.35 0 0 1-2.35 2.35h-6.4a.75.75 0 0 1-.75-.75v-4.8a2.45 2.45 0 0 0-4.9 0v4.8a.75.75 0 0 1-.75.75H2.4A2.35 2.35 0 0 1 .05 21.6V10.055L11.512.231ZM1.55 10.746V21.6c0 .47.38.85.85.85h5.65V18.4a3.95 3.95 0 0 1 7.9 0v4.05h5.65c.47 0 .85-.38.85-.85V10.745L12 1.788 1.55 10.745Z" clipRule="evenodd"></path>

        </svg>
    )
}

export function Pin({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m12 23.728-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728Zm4.95-7.778a7 7 0 1 0-9.9 0L12 20.9l4.95-4.95ZM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"></path>

        </svg>
    )
}

export function Building({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.665.13a.75.75 0 0 1 .67 0l9.6 4.8-.67 1.34L12 1.64 2.735 6.27l-.67-1.342 9.6-4.8ZM1.65 9.55H0v-1.5h24v1.5h-1.65v12.9H24v1.5H0v-1.5h1.65V9.55Zm1.5 0v12.9h3.3v-9.6h7.9v9.6h6.5V9.55H3.15Zm9.7 12.9v-8.1h-4.9v8.1h4.9Z" clipRule="evenodd"></path>
        </svg>
    )
}


export function Apartmant({ size, color, strokeColor, strokeWidth, isStroke, className }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 20h2v2H1v-2h2V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v17Zm-2 0V4H5v16h14ZM8 11h3v2H8v-2Zm0-4h3v2H8V7Zm0 8h3v2H8v-2Zm5 0h3v2h-3v-2Zm0-4h3v2h-3v-2Zm0-4h3v2h-3V7Z"></path>
        </svg>
    )
}

export function Check({ size, color, strokeColor, strokeWidth, isStroke, className, isChecked }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
    isChecked?: boolean;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isChecked ? (
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16.001A8 8 0 0 0 12 20Zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16Z"></path>
            ) :
                (
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16.001A8 8 0 0 0 12 20Z"></path>
                )
            }
        </svg>
    )
}

export function Payment({ size, color, strokeColor, strokeWidth, isStroke, className, isChecked }: {
    size?: number;
    color?: string;
    strokeColor?: string;
    strokeWidth?: number;
    isStroke?: boolean;
    className?: string;
    isChecked?: boolean;
}): JSX.Element {

    return (
        <svg className={className} width={size} height={size} fill={isStroke ? 'none' : color} stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2Zm-2 0H3V6h14v8Zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Zm13 0v11c0 1.1-.9 2-2 2H4v-2h17V7h2Z"></path>

        </svg>
    )
}
