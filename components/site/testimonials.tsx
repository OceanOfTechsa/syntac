'use client'

// React Imports
import { useEffect, useRef, useState, type SVGProps } from 'react'

// Third-party Imports
import { gsap } from '@/lib/gsap'

// Component Imports
import { Button } from '@/components/ui/button'
import {ArrowLeftIcon, ArrowRightIcon, Star} from 'lucide-react'
import { ITestimonial, TESTIMONIALS } from '@/data/reviews'

const TILE_SIZE = 100
const TILE_GAP = 8
const BLOCK_HEIGHT = TILE_SIZE * 3 + TILE_GAP * 2
const SHADOW_ROOM = 60
const VIEWPORT_HEIGHT = BLOCK_HEIGHT + SHADOW_ROOM
const SIDE_ROOM = 40
const VIEWPORT_WIDTH = TILE_SIZE + SIDE_ROOM * 2
const SIDE_COLUMN_TILES = 5
const COLUMN_STEP = TILE_SIZE + TILE_GAP
const ROW_OFFSET = COLUMN_STEP / 2
const QUOTE_SLIDE = 32
// Every testimonial gets exactly this many milliseconds on screen.
const AUTOPLAY_INTERVAL = 5000
// Rough heuristic for whether a quote is long enough to need "Read more" —
// no real DOM measurement, just a character-count threshold.
const READ_MORE_THRESHOLD = 180

const TILE_CLASS = 'bg-card size-25 rounded-md border border-border/70 shadow-xs'

const QuoteMark = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' {...props}>
        <path
            fill='currentColor'
            d='M7.17 6C4.87 6 3 7.87 3 10.17V18h7.17v-7.83H6.17c0-.92.75-1.67 1.67-1.67h1V6H7.17ZM17.17 6c-2.3 0-4.17 1.87-4.17 4.17V18h7.17v-7.83h-4c0-.92.75-1.67 1.67-1.67h1V6h-1.67Z'
        />
    </svg>
)

const MiddleColumnBlock = ({ avatar, name, index }: { avatar: string; name: string; index: number }) => (
    <div className='mx-auto w-fit space-y-2'>
        <div className={TILE_CLASS} />
        <div className='shadow-realistic relative size-25 rounded-md'>
            <img
                src={`https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-${index}.png`}
                alt={name}
                loading='lazy'
                className='absolute inset-0 h-full w-full rounded-md object-cover'
            />
        </div>
        <div className={TILE_CLASS} />
    </div>
)

const Testimonials = () => {
    const [index, setIndex] = useState(0)
    const [previousIndex, setPreviousIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    // Drives which quote/name is actually rendered. Only updated mid-story
    // (via tl.call), so the old quote stays visible through its exit and the
    // new one only appears once the enter animation begins — the GSAP
    // equivalent of Framer's <AnimatePresence mode="wait">.
    const [displayedIndex, setDisplayedIndex] = useState(0)
    // Whether the current quote is shown in full or clamped to 3 lines.
    const [isExpanded, setIsExpanded] = useState(false)

    const leftColRef = useRef<HTMLDivElement>(null)
    const rightColRef = useRef<HTMLDivElement>(null)
    const middleWrapperRef = useRef<HTMLDivElement>(null)
    const quoteRef = useRef<HTMLDivElement>(null)
    const isFirstRender = useRef(true)

    // Kept in sync with `index` so the autoplay interval's callback always
    // reads the current value rather than a stale one captured at setup time.
    const indexRef = useRef(index)
    useEffect(() => {
        indexRef.current = index
    }, [index])

    // Collapse back to the 3-line clamp whenever the displayed testimonial
    // changes, so "Read more" doesn't stay expanded into the next one.
    useEffect(() => {
        setIsExpanded(false)
    }, [displayedIndex])

    // Rest positions on mount — no animation, just placing everything where it
    // should sit at rest.
    useEffect(() => {
        if (leftColRef.current) gsap.set(leftColRef.current, { y: ROW_OFFSET })
        if (rightColRef.current) gsap.set(rightColRef.current, { y: ROW_OFFSET })
        if (middleWrapperRef.current) gsap.set(middleWrapperRef.current, { y: 0 })
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        const tl = gsap.timeline()

        // Decorative side columns: always reset just below rest and slide up
        // into place — direction-independent, same as the original variants.
        if (leftColRef.current) {
            tl.fromTo(
                leftColRef.current,
                { y: ROW_OFFSET + COLUMN_STEP },
                { y: ROW_OFFSET, duration: 0.5, ease: 'power2.out' },
                0
            )
        }
        if (rightColRef.current) {
            tl.fromTo(
                rightColRef.current,
                { y: ROW_OFFSET + COLUMN_STEP },
                { y: ROW_OFFSET, duration: 0.5, ease: 'power2.out' },
                0
            )
        }

        // Middle avatar reel: slides down from above the viewport into place —
        // also direction-independent.
        if (middleWrapperRef.current) {
            tl.fromTo(
                middleWrapperRef.current,
                { y: -VIEWPORT_HEIGHT },
                { y: 0, duration: 0.5, ease: 'power2.out' },
                0
            )
        }

        // Quote text: the one piece that depends on direction — slide the old
        // quote out, swap content once it's gone, slide the new one in from the
        // opposite side it exited toward.
        if (quoteRef.current) {
            tl.to(
                quoteRef.current,
                { y: direction > 0 ? -QUOTE_SLIDE : QUOTE_SLIDE, opacity: 0, duration: 0.35, ease: 'power2.out' },
                0
            )
            tl.call(() => setDisplayedIndex(index))
            tl.fromTo(
                quoteRef.current,
                { y: direction > 0 ? QUOTE_SLIDE : -QUOTE_SLIDE, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
            )
        }

        return () => {
            tl.kill()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    const goTo = (nextDirection: number) => {
        setPreviousIndex(indexRef.current)
        setDirection(nextDirection)
        setIndex(current => (current + nextDirection + TESTIMONIALS.length) % TESTIMONIALS.length)
    }

    const [isPaused, setIsPaused] = useState(false)

    // Always points at the current `goTo`, so the interval below can call it
    // without needing `goTo` in its own dependency array.
    const goToRef = useRef(goTo)
    useEffect(() => {
        goToRef.current = goTo
    })

    // A single, persistent interval — the only autoplay timer in the
    // component. (A second, leftover interval at a different rate was
    // re-introduced in an earlier revision of this file and has been removed
    // again here — two independent timers both calling goTo(1) is what was
    // causing testimonials to occasionally skip ahead too fast.)
    useEffect(() => {
        if (isPaused) return
        const id = setInterval(() => goToRef.current(1), AUTOPLAY_INTERVAL)
        return () => clearInterval(id)
    }, [isPaused])

    const reelTestimonial: ITestimonial = TESTIMONIALS[index]
    const reelOutgoing: ITestimonial = TESTIMONIALS[previousIndex]
    const quoteTestimonial: ITestimonial = TESTIMONIALS[displayedIndex]
    const canReadMore = quoteTestimonial.details.length > READ_MORE_THRESHOLD

    return (
        <section
            className='bg-background py-8 sm:py-16 lg:py-24'
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className='mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8'>
                <div className='grid grid-cols-1 items-center gap-6 sm:grid-cols-[323px_1fr] sm:gap-8'>
                    <div
                        className='relative mx-auto h-78 w-full mask-[radial-gradient(ellipse_at_center,black_25%,transparent_80%)] sm:mx-0'>
                        <div
                            className='absolute inset-0 grid h-auto grid-cols-3 content-center gap-3 max-sm:mx-auto max-sm:w-fit'>
                            <div
                                ref={leftColRef}
                                style={{gridColumn: 1, gridRow: 1, alignSelf: 'center'}}
                                className='space-y-2'
                            >
                                {Array.from({length: SIDE_COLUMN_TILES}, (_, tileIndex) => (
                                    <div key={tileIndex} className={TILE_CLASS}/>
                                ))}
                            </div>

                            <div
                                className='relative'
                                style={{
                                    gridColumn: 2,
                                    gridRow: 1,
                                    alignSelf: 'center',
                                    width: TILE_SIZE,
                                    height: VIEWPORT_HEIGHT
                                }}
                            >
                                <div
                                    className='absolute top-0 mask-[linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]'
                                    style={{
                                        left: '50%',
                                        transform: `translate(-50%, ${SHADOW_ROOM / 2}px)`,
                                        width: VIEWPORT_WIDTH,
                                        height: VIEWPORT_HEIGHT
                                    }}
                                >
                                    <div ref={middleWrapperRef}>
                                        <MiddleColumnBlock avatar={reelTestimonial.avatar} name={reelTestimonial.name}
                                                           index={reelTestimonial.index}/>
                                        <div style={{marginTop: SHADOW_ROOM}}>
                                            <MiddleColumnBlock avatar={reelOutgoing.avatar} name={reelOutgoing.name}
                                                               index={reelOutgoing.index}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                ref={rightColRef}
                                style={{gridColumn: 3, gridRow: 1, alignSelf: 'center'}}
                                className='space-y-2'
                            >
                                {Array.from({length: SIDE_COLUMN_TILES}, (_, tileIndex) => (
                                    <div key={tileIndex} className={TILE_CLASS}/>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='overflow-hidden'>
                        <div className='mb-8'>
                            <QuoteMark className='fill-primary size-9 rotate-180'/>
                        </div>

                        <div ref={quoteRef} className='space-y-5'>
                            {/* Rating */}
                            {/*<div className="flex gap-1 text-yellow-400 mb-3">*/}
                            {/*    {Array.from({length: quoteTestimonial.rating}).map((_, idx) => (*/}

                            {/*        <Star key={idx}/>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                            <div>
                                <p
                                    className={
                                        isExpanded
                                            ? 'text-primary max-w-xl text-xl font-medium lg:text-[26px]'
                                            : 'text-primary line-clamp-3 max-w-xl text-xl font-medium lg:text-[26px]'
                                    }
                                >
                                    {quoteTestimonial.details}
                                </p>
                                {canReadMore && (
                                    <button
                                        type='button'
                                        onClick={() => setIsExpanded(v => !v)}
                                        className='cursor-pointer text-muted-foreground hover:text-foreground mt-1 text-sm font-medium underline-offset-2 hover:underline'
                                    >
                                        {isExpanded ? 'Show less' : 'Read more'}
                                    </button>
                                )}
                            </div>
                            <div>
                                <p className='text-base font-medium'>
                                    {quoteTestimonial.title}. {quoteTestimonial.name} {quoteTestimonial.surname}
                                </p>
                                <p className='text-muted-foreground text-xs'>{quoteTestimonial.date}</p>
                            </div>
                        </div>

                        <div className='mt-6 flex gap-3'>
                            <Button
                                onClick={() => goTo(-1)}
                                aria-label='Previous testimonial'
                                variant='outline'
                                size='icon'
                                className='hover:border-primary/30 dark:hover:border-primary/30 text-primary hover:bg-primary/10 dark:hover:bg-primary/10 hover:text-primary rounded-full'
                            >
                                <ArrowLeftIcon className='size-4'/>
                            </Button>
                            <Button
                                onClick={() => goTo(1)}
                                aria-label='Next testimonial'
                                variant='outline'
                                size='icon'
                                className='hover:border-primary/30 dark:hover:border-primary/30 text-primary hover:bg-primary/10 dark:hover:bg-primary/10 hover:text-primary rounded-full'
                            >
                                <ArrowRightIcon className='size-4'/>
                            </Button>
                        </div>
                    </div>
                </div>

                <p className="text-muted-foreground px-4 text-center italic sm:px-6 lg:px-8">
                    <span className="text-foreground font-medium">
                        Note:
                    </span> All Avatars shown are illustrative and used to protect the identity of our clients.
                </p>
            </div>
        </section>
    )
}

export default Testimonials