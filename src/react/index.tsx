"use client"
import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { wrapperStyle, inlineStyle, buttonStyle, iframeStyle, openStyle } from './style';
import { EmbedInfo } from './type';

type Props = {
    id: string;
    isDevelopmentMode: boolean;
}

export function Embed({ id, isDevelopmentMode }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    // ボタンの位置調整
    const [buttonLeftCoord, setButtonLeftCoord] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const adjustButtonPosition = () => {
            if (buttonRef.current) {
                setButtonLeftCoord(buttonRef.current.offsetWidth / 2 + buttonRef.current.offsetHeight / 2);
            }
        }

        adjustButtonPosition();
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
    const domain = isDevelopmentMode ? 'http://localhost:3000' : 'https://fasterview.ai';
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
                    <div style={isOpen ? openStyle : wrapperStyle}>
                        <div style={inlineStyle}>
                            <button
                                id="fasterview-button"
                                ref={buttonRef}
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: data.backgroundColor,
                                    color: data.textColor,
                                    left: `-${buttonLeftCoord}px`,

                                }}
                                onClick={() => {
                                    setIsOpen(true);
                                }}
                            >
                                {data.text}
                            </button>

                            <iframe
                                id="fasterview-iframe"
                                style={{
                                    ...iframeStyle,
                                    borderColor: data.backgroundColor,
                                }}
                                src={`${domain}/user/answer/${id}/embed`}
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}
