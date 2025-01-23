import React from 'react';
type AbsoluteStyle = {
    position: 'absolute';
    top: string;
    right: string;
};
type Props = {
    id: string;
    isDevelopmentMode?: boolean;
    absoluteStyle?: AbsoluteStyle | {};
};
export declare function Embed({ id, isDevelopmentMode, absoluteStyle }: Props): React.JSX.Element | null;
export {};
