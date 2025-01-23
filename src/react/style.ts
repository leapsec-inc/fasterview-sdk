import React from 'react';

export const wrapperStyle: React.CSSProperties = {
    position: 'fixed',
    top: '200px',
    right: '0',
    transition: '0.2s ease-in-out',
    transform: 'translateX(100%)',
    zIndex: 1000,
};

export const inlineStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
};

export const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    width: 'fit-content',
    height: 'fit-content',
    borderRadius: '8px 8px 0 0',
    padding: '8px 16px',
    whiteSpace: 'nowrap',
    transform: 'rotate(-90deg)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
}

export const iframeStyle: React.CSSProperties = {
    width: '360px',
    height: '480px',
    borderRadius: '8px 0 0 8px',
    borderRight: 'none',
    overflow: 'hidden',
    zIndex: 1000,
}

export const openStyle: React.CSSProperties = {
    ...wrapperStyle,
    transform: 'translateX(0)',
}