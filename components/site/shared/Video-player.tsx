'use client';

import {
    forwardRef,
    useEffect,
    useRef,
    type CSSProperties,
    type Ref,
    type VideoHTMLAttributes,
} from 'react';

export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

export interface VideoPlayerProps
    extends Omit<
        VideoHTMLAttributes<HTMLVideoElement>,
        'controls' | 'muted' | 'autoPlay' | 'loop' | 'src' | 'poster' | 'style'
    > {
    /** Video source URL (required) */
    src: string;
    /** Optional poster image shown before playback starts */
    poster?: string;
    /** Show native browser controls. Default: false */
    controls?: boolean;
    /** Play with sound. Default: false (muted) */
    sound?: boolean;
    /** Show a 1px border around the video. Default: false */
    bordered?: boolean;
    /** Autoplay on mount. Default: true */
    autoplay?: boolean;
    /** Loop playback. Default: true */
    loop?: boolean;
    /** CSS object-fit value. Default: 'cover' */
    fit?: ObjectFit;
    className?: string;
    style?: CSSProperties;
}

const VideoPlayer = forwardRef(function VideoPlayer(
    {
        src,
        poster,
        controls = false,
        sound = false,
        bordered = false,
        autoplay = true,
        loop = true,
        fit = 'cover',
        className = '',
        style,
        ...rest
    }: VideoPlayerProps,
    forwardedRef: Ref<HTMLVideoElement>
) {
    const internalRef = useRef<HTMLVideoElement>(null);
    const videoRef = (forwardedRef as React.RefObject<HTMLVideoElement>) || internalRef;

    useEffect(() => {
        const v = videoRef.current;
        if (!v || !autoplay) return;
        // autoplay only works reliably when muted in most browsers
        v.play().catch(() => {
            v.muted = true;
            v.play();
        });
    }, [src, autoplay, videoRef]);

    return (
        <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls={controls}
            muted={!sound}
            autoPlay={autoplay}
            loop={loop}
            playsInline
            className={className}
            style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: fit,
                border: bordered ? '1px solid #ccc' : 'none',
                outline: 'none',
                ...style,
            }}
            {...rest}
        />
    );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;