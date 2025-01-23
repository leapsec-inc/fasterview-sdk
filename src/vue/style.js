export const wrapperStyle = {
    position: 'fixed',
    top: '200px',
    right: '-360px',
    transition: '0.2s ease-in-out',
    'z-index': 1000,
};

export const inlineStyle = {
    position: 'relative',
    display: 'flex',
    'align-items': 'center',
};

export const buttonStyle = {
    position: 'absolute',
    left: 0,
    width: 'fit-content',
    height: 'fit-content',
    'border-radius': '8px 8px 0 0',
    padding: '8px 16px',
    'white-space': 'nowrap',
    transform: 'rotate(-90deg)',
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    cursor: 'pointer',
}

export const iframeStyle = {
    width: '360px',
    height: '480px',
    'border-radius': '8px 0 0 8px',
    'border-right': 'none',
    overflow: 'hidden',
    'z-index': 1000,
}

export const openStyle = {
    ...wrapperStyle,
    display: 'flex',
    transition: 'all 0.2s ease-in-out',
    position: 'fixed',
    top: '200px',
    right: '0px',
    'z-index': 1000,
}