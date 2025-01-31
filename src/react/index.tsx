"use client"
import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { wrapperStyle, inlineStyle, buttonStyle, iframeStyle, openStyle } from './style';
import { EmbedInfo } from './type';

type AbsoluteStyle = {
    position: 'absolute',
    top: string;
    right: string;
}

type Props = {
    id: string;
    isDevelopmentMode?: boolean;
    isStagingMode?: boolean;
    absoluteStyle?: AbsoluteStyle | {};
}

export function Embed({ id, isDevelopmentMode = false, isStagingMode = false, absoluteStyle = {} }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    // ボタンの位置調整
    const [buttonLeftCoord, setButtonLeftCoord] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const adjustButtonPosition = () => {
            console.log("buttonRef", buttonRef.current);
            if (buttonRef.current) {
                setButtonLeftCoord(buttonRef.current.offsetWidth / 2 + buttonRef.current.offsetHeight / 2);
            }
        }

        // ページ表示タイミングではなぜかbuttonRefが取得できないので, 100ms後に実行する
        setTimeout(() => {
            adjustButtonPosition()
        }, 100);

        window.addEventListener("resize", adjustButtonPosition);

        return () => {
            window.removeEventListener("resize", adjustButtonPosition);
        };
    }, [buttonRef]);

    // ボタン以外をクリックしたら埋め込みを閉じる
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (event.target !== buttonRef.current) {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [buttonRef]);

    // APIから埋め込み設定の情報を取得する
    const domain = isDevelopmentMode
        ? 'http://localhost:3000' : isStagingMode
            ? 'https://stg.fasterview.jp' : 'https://fasterview.ai';
    const fetcher = (url: string) => fetch(url).then(res => res.json());
    const { data, error } = useSWR<EmbedInfo>(`${domain}/api/embed?id=${id}`, fetcher);

    // iframeからのメッセージを受信して, アンケートを閉じる
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data === `fasterview-close-button-${id}`) {
                setIsOpen(false);
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [id]);

    if (error) {
        console.error('failed to get fasterview embed info. error: ', error);
        return null;
    }

    return (
        <>
            {
                data && (
                    <div
                        style={{
                            ...(isOpen ? openStyle : wrapperStyle),
                            ...absoluteStyle,
                        }}
                    >
                        <div style={inlineStyle}>
                            <button
                                ref={buttonRef}
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: data.backgroundColor,
                                    color: data.textColor,
                                    left: `-${buttonLeftCoord}px`,

                                }}
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                }}
                            >
                                {data.text}
                            </button>

                            <iframe
                                style={iframeStyle}
                                src={`${domain}/user/answer/${id}/embed`}
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}
