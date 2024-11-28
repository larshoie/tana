// // class LLMHeroAnimation {
// //     /**
// //      * Create a new LLM Hero Animation
// //      * @param {Object} options - Configuration options
// //      * @param {HTMLElement} options.container - The container element
// //      * @param {number} [options.speed=1000] - Time per element (ms)
// //      * @param {number} [options.pauseDuration=1000] - Pause time when all elements are visible (ms)
// //      * @param {boolean} [options.autoplay=true] - Whether to start animation automatically
// //      */
// //     constructor(options) {
// //         this.container = options.container;
// //         this.speed = options.speed ?? 1000; // Time per element
// //         this.pauseDuration = options.pauseDuration ?? 1000; // Pause duration when all elements are visible
// //         this.autoplay = options.autoplay ?? true;

// //         // Internal state tracking
// //         this.children = Array.from(this.container.children);
// //         this.animationTimeouts = [];
// //         this.isAnimating = this.autoplay;

// //         // Bind methods to maintain correct context
// //         this.animateSequence = this.animateSequence.bind(this);
// //         this.handleMouseEnter = this.handleMouseEnter.bind(this);
// //         this.handleMouseLeave = this.handleMouseLeave.bind(this);

// //         // Initial setup
// //         this.init();
// //     }

// //     /**
// //      * Initialize the animation
// //      */
// //     init() {
// //         this.container.classList.add('llm-hero-animation');
// //         this.children.forEach((child) => {
// //             child.classList.add('llm-hero-item');
// //             child.style.opacity = '0';
// //             child.style.transition = 'opacity 0.3s ease-in-out';
// //         });
// //         this.container.style.position = 'relative';

// //         this.container.addEventListener('mouseenter', this.handleMouseEnter);
// //         this.container.addEventListener('mouseleave', this.handleMouseLeave);

// //         if (this.autoplay) {
// //             this.animateSequence();
// //         }
// //     }

// //     /**
// //      * Clear all existing animation timeouts
// //      */
// //     clearAnimationTimeouts() {
// //         this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
// //         this.animationTimeouts = [];
// //     }

// //     /**
// //      * Animate the sequence of revealing, pausing, and fading out
// //      */
// //     animateSequence() {
// //         this.clearAnimationTimeouts();

// //         this.children.forEach(child => {
// //             child.style.opacity = '0';
// //             if (child.tagName.toLowerCase() === 'video') {
// //                 child.pause();
// //                 child.currentTime = 0;
// //             }
// //         });

// //         if (!this.isAnimating) return;

// //         const revealDelay = this.speed;

// //         // Reveal children sequentially
// //         this.children.forEach((child, index) => {
// //             const timeout = setTimeout(() => {
// //                 if (this.isAnimating) {
// //                     child.style.opacity = '1';
// //                     if (child.tagName.toLowerCase() === 'video') {
// //                         child.play();
// //                     }
// //                 }
// //             }, index * revealDelay);
// //             this.animationTimeouts.push(timeout);
// //         });

// //         // Pause when all elements are visible
// //         const pauseStart = this.children.length * revealDelay;
// //         const pauseTimeout = setTimeout(() => {
// //             if (this.isAnimating) {
// //                 // Fade-out children in reverse order after the pause
// //                 this.fadeOutSequence(pauseStart);
// //             }
// //         }, pauseStart + this.pauseDuration);
// //         this.animationTimeouts.push(pauseTimeout);
// //     }

// //     /**
// //      * Fade-out children in reverse order
// //      */
// //     fadeOutSequence(startTime) {
// //         const fadeOutDelay = this.speed;

// //         this.children
// //             .slice()
// //             .reverse()
// //             .forEach((child, index) => {
// //                 const timeout = setTimeout(() => {
// //                     if (this.isAnimating) {
// //                         child.style.opacity = '0';
// //                         if (child.tagName.toLowerCase() === 'video') {
// //                             child.pause();
// //                             child.currentTime = 0;
// //                         }
// //                     }
// //                 }, startTime + index * fadeOutDelay);
// //                 this.animationTimeouts.push(timeout);
// //             });

// //         // Restart the sequence after fade-out
// //         const restartTime = startTime + this.children.length * fadeOutDelay;
// //         const restartTimeout = setTimeout(() => {
// //             if (this.isAnimating) {
// //                 this.animateSequence();
// //             }
// //         }, restartTime);
// //         this.animationTimeouts.push(restartTimeout);
// //     }

// //     /**
// //      * Pause animation on mouse enter
// //      */
// //     handleMouseEnter() {
// //         this.isAnimating = false;
// //         this.clearAnimationTimeouts();
// //         this.children.forEach(child => {
// //             if (child.tagName.toLowerCase() === 'video') {
// //                 child.pause();
// //             }
// //         });
// //     }

// //     /**
// //      * Resume animation on mouse leave
// //      */
// //     handleMouseLeave() {
// //         this.isAnimating = true;
// //         this.animateSequence();
// //     }

// //     /**
// //      * Manually start the animation
// //      */
// //     start() {
// //         this.isAnimating = true;
// //         this.animateSequence();
// //     }

// //     /**
// //      * Manually stop the animation
// //      */
// //     stop() {
// //         this.isAnimating = false;
// //         this.clearAnimationTimeouts();
// //         this.children.forEach(child => {
// //             child.style.opacity = '0';
// //             if (child.tagName.toLowerCase() === 'video') {
// //                 child.pause();
// //                 child.currentTime = 0;
// //             }
// //         });
// //     }

// //     /**
// //      * Destroy the animation and clean up
// //      */
// //     destroy() {
// //         this.container.removeEventListener('mouseenter', this.handleMouseEnter);
// //         this.container.removeEventListener('mouseleave', this.handleMouseLeave);

// //         this.clearAnimationTimeouts();

// //         this.container.classList.remove('llm-hero-animation');
// //         this.container.style.position = '';
// //         this.children.forEach(child => {
// //             child.classList.remove('llm-hero-item');
// //             child.style.opacity = '';
// //             child.style.transition = '';
// //         });
// //     }
// // }

// // // Expose to global scope if not using a module system
// // if (typeof window !== 'undefined') {
// //     window.LLMHeroAnimation = LLMHeroAnimation;
// // }

// // export default LLMHeroAnimation;





// class LLMHeroAnimation {
//     /**
//      * Create a new LLM Hero Animation
//      * @param {Object} options - Configuration options
//      * @param {HTMLElement} options.container - The container element
//      * @param {number} [options.speed=1000] - Time per element (ms)
//      * @param {number} [options.pauseDuration=1000] - Pause time when all elements are visible (ms)
//      * @param {boolean} [options.autoplay=true] - Whether to start animation automatically
//      */
//     constructor(options) {
//         this.container = options.container;
//         this.speed = options.speed ?? 1000; // Time per element
//         this.pauseDuration = options.pauseDuration ?? 1000; // Pause duration when all elements are visible
//         this.autoplay = options.autoplay ?? true;

//         // Internal state tracking
//         this.children = Array.from(this.container.children);
//         this.animationTimeouts = [];
//         this.isAnimating = this.autoplay;
//         this.currentStep = 0; // Track the current position in the sequence
//         this.isPaused = false; // Track whether the animation is paused

//         // Bind methods to maintain correct context
//         this.animateSequence = this.animateSequence.bind(this);
//         this.resumeSequence = this.resumeSequence.bind(this);
//         this.handleMouseEnter = this.handleMouseEnter.bind(this);
//         this.handleMouseLeave = this.handleMouseLeave.bind(this);

//         // Initial setup
//         this.init();
//     }

//     /**
//      * Initialize the animation
//      */
//     init() {
//         this.container.classList.add('llm-hero-animation');
//         this.children.forEach((child) => {
//             child.classList.add('llm-hero-item');
//             child.style.opacity = '0';
//             child.style.transition = 'opacity 0.3s ease-in-out';
//         });
//         this.container.style.position = 'relative';

//         this.container.addEventListener('mouseenter', this.handleMouseEnter);
//         this.container.addEventListener('mouseleave', this.handleMouseLeave);

//         if (this.autoplay) {
//             this.animateSequence();
//         }
//     }

//     /**
//      * Clear all existing animation timeouts
//      */
//     clearAnimationTimeouts() {
//         this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
//         this.animationTimeouts = [];
//     }

//     /**
//      * Animate the sequence of revealing, pausing, and fading out
//      */
//     animateSequence() {
//         this.clearAnimationTimeouts();

//         if (!this.isAnimating || this.isPaused) return;

//         const totalSteps = this.children.length * 2 + 1; // Reveal + Pause + Fade-out
//         const revealSteps = this.children.length;
//         const fadeOutSteps = this.children.length;
//         const pauseStep = revealSteps; // The step when all elements are visible

//         if (this.currentStep < revealSteps) {
//             // Reveal sequence
//             const child = this.children[this.currentStep];
//             if (child) {
//                 child.style.opacity = '1';
//                 if (child.tagName.toLowerCase() === 'video') {
//                     child.play();
//                 }
//             }
//         } else if (this.currentStep === pauseStep) {
//             // Pause when all elements are visible
//             setTimeout(() => {
//                 this.currentStep++;
//                 this.animateSequence();
//             }, this.pauseDuration);
//             return;
//         } else if (this.currentStep > pauseStep && this.currentStep < totalSteps) {
//             // Fade-out sequence
//             const fadeOutIndex = this.currentStep - pauseStep - 1;
//             const child = this.children[this.children.length - 1 - fadeOutIndex];
//             if (child) {
//                 child.style.opacity = '0';
//                 if (child.tagName.toLowerCase() === 'video') {
//                     child.pause();
//                     child.currentTime = 0;
//                 }
//             }
//         } else {
//             // Restart sequence
//             this.currentStep = 0;
//             this.animateSequence();
//             return;
//         }

//         // Move to the next step
//         this.currentStep++;
//         const nextTimeout = setTimeout(() => {
//             this.animateSequence();
//         }, this.speed);
//         this.animationTimeouts.push(nextTimeout);
//     }

//     /**
//      * Resume animation from the current step
//      */
//     resumeSequence() {
//         this.isPaused = false;
//         this.animateSequence();
//     }

//     /**
//      * Pause animation on mouse enter or manual stop
//      */
//     handleMouseEnter() {
//         this.isPaused = true;
//         this.clearAnimationTimeouts();
//     }

//     /**
//      * Resume animation on mouse leave or manual start
//      */
//     handleMouseLeave() {
//         this.resumeSequence();
//     }

//     /**
//      * Manually start the animation
//      */
//     start() {
//         this.isAnimating = true;
//         this.resumeSequence();
//     }

//     /**
//      * Manually stop the animation
//      */
//     stop() {
//         this.isAnimating = false;
//         this.isPaused = true;
//         this.clearAnimationTimeouts();
//     }

//     /**
//      * Destroy the animation and clean up
//      */
//     destroy() {
//         this.container.removeEventListener('mouseenter', this.handleMouseEnter);
//         this.container.removeEventListener('mouseleave', this.handleMouseLeave);

//         this.clearAnimationTimeouts();

//         this.container.classList.remove('llm-hero-animation');
//         this.container.style.position = '';
//         this.children.forEach(child => {
//             child.classList.remove('llm-hero-item');
//             child.style.opacity = '';
//             child.style.transition = '';
//         });
//     }
// }

// // Expose to global scope if not using a module system
// if (typeof window !== 'undefined') {
//     window.LLMHeroAnimation = LLMHeroAnimation;
// }

// export default LLMHeroAnimation;



// class LLMHeroAnimation {
//     /**
//      * Create a new LLM Hero Animation
//      * @param {Object} options - Configuration options
//      * @param {HTMLElement} options.container - The container element
//      * @param {number} [options.speed=1000] - Time per element (ms)
//      * @param {number} [options.pauseDuration=1000] - Pause time when all elements are visible (ms)
//      * @param {boolean} [options.autoplay=true] - Whether to start animation automatically
//      */
//     constructor(options) {
//         this.container = options.container;
//         this.speed = options.speed ?? 1000; // Time per element
//         this.pauseDuration = options.pauseDuration ?? 1000; // Pause duration when all elements are visible
//         this.autoplay = options.autoplay ?? true;

//         // Internal state tracking
//         this.children = Array.from(this.container.children);
//         this.animationTimeouts = [];
//         this.isAnimating = this.autoplay;
//         this.currentStep = 0; // Track the current position in the sequence
//         this.isPaused = false; // Track whether the animation is paused
//         this.hasReachedMidpoint = false; // Ensures animation reaches at least 50%

//         // Bind methods to maintain correct context
//         this.animateSequence = this.animateSequence.bind(this);
//         this.resumeSequence = this.resumeSequence.bind(this);
//         this.handleMouseEnter = this.handleMouseEnter.bind(this);
//         this.handleMouseLeave = this.handleMouseLeave.bind(this);

//         // Initial setup
//         this.init();
//     }

//     /**
//      * Initialize the animation
//      */
//     init() {
//         this.container.classList.add('llm-hero-animation');
//         this.children.forEach((child) => {
//             child.classList.add('llm-hero-item');
//             child.style.opacity = '0';
//             child.style.transition = 'opacity 0.3s ease-in-out';
//         });
//         this.container.style.position = 'relative';

//         this.container.addEventListener('mouseenter', this.handleMouseEnter);
//         this.container.addEventListener('mouseleave', this.handleMouseLeave);

//         if (this.autoplay) {
//             this.animateSequence();
//         }
//     }

//     /**
//      * Clear all existing animation timeouts
//      */
//     clearAnimationTimeouts() {
//         this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
//         this.animationTimeouts = [];
//     }

//     /**
//      * Animate the sequence of revealing, pausing, and fading out
//      */
//     animateSequence() {
//         this.clearAnimationTimeouts();

//         if (!this.isAnimating || this.isPaused) return;

//         const totalSteps = this.children.length * 2 + 1; // Reveal + Pause + Fade-out
//         const revealSteps = this.children.length;
//         const fadeOutSteps = this.children.length;
//         const pauseStep = revealSteps; // The step when all elements are visible

//         if (this.currentStep < revealSteps) {
//             // Reveal sequence
//             const child = this.children[this.currentStep];
//             if (child) {
//                 child.style.opacity = '1';
//                 if (child.tagName.toLowerCase() === 'video') {
//                     child.play();
//                 }
//             }
//         } else if (this.currentStep === pauseStep) {
//             // Pause when all elements are visible
//             this.hasReachedMidpoint = true; // Mark that the animation has reached 50%
//             setTimeout(() => {
//                 this.currentStep++;
//                 this.animateSequence();
//             }, this.pauseDuration);
//             return;
//         } else if (this.currentStep > pauseStep && this.currentStep < totalSteps) {
//             // Fade-out sequence
//             const fadeOutIndex = this.currentStep - pauseStep - 1;
//             const child = this.children[this.children.length - 1 - fadeOutIndex];
//             if (child) {
//                 child.style.opacity = '0';
//                 if (child.tagName.toLowerCase() === 'video') {
//                     child.pause();
//                     child.currentTime = 0;
//                 }
//             }
//         } else {
//             // Restart sequence
//             this.currentStep = 0;
//             this.animateSequence();
//             return;
//         }

//         // Move to the next step
//         this.currentStep++;
//         const nextTimeout = setTimeout(() => {
//             this.animateSequence();
//         }, this.speed);
//         this.animationTimeouts.push(nextTimeout);
//     }

//     /**
//      * Resume animation from the current step
//      */
//     resumeSequence() {
//         this.isPaused = false;
//         this.animateSequence();
//     }

//     /**
//      * Pause animation on mouse enter or manual stop
//      */
//     handleMouseEnter() {
//         if (this.hasReachedMidpoint) {
//             // Only allow pausing if the animation has reached at least 50%
//             this.isPaused = true;
//             this.clearAnimationTimeouts();
//         }
//     }

//     /**
//      * Resume animation on mouse leave or manual start
//      */
//     handleMouseLeave() {
//         if (this.hasReachedMidpoint) {
//             this.resumeSequence();
//         }
//     }

//     /**
//      * Manually start the animation
//      */
//     start() {
//         this.isAnimating = true;
//         this.resumeSequence();
//     }

//     /**
//      * Manually stop the animation
//      */
//     stop() {
//         this.isAnimating = false;
//         this.isPaused = true;
//         this.clearAnimationTimeouts();
//     }

//     /**
//      * Destroy the animation and clean up
//      */
//     destroy() {
//         this.container.removeEventListener('mouseenter', this.handleMouseEnter);
//         this.container.removeEventListener('mouseleave', this.handleMouseLeave);

//         this.clearAnimationTimeouts();

//         this.container.classList.remove('llm-hero-animation');
//         this.container.style.position = '';
//         this.children.forEach(child => {
//             child.classList.remove('llm-hero-item');
//             child.style.opacity = '';
//             child.style.transition = '';
//         });
//     }
// }

// // Expose to global scope if not using a module system
// if (typeof window !== 'undefined') {
//     window.LLMHeroAnimation = LLMHeroAnimation;
// }

// export default LLMHeroAnimation;



class LLMHeroAnimation {
    /**
     * Create a new LLM Hero Animation
     * @param {Object} options - Configuration options
     * @param {HTMLElement} options.container - The container element
     * @param {number} [options.speed=1000] - Time per element (ms)
     * @param {number} [options.pauseDuration=1000] - Pause time when all elements are visible (ms)
     * @param {boolean} [options.autoplay=true] - Whether to start animation automatically
     */
    constructor(options) {
        this.container = options.container;
        this.speed = options.speed ?? 1000; // Time per element
        this.pauseDuration = options.pauseDuration ?? 1000; // Pause duration when all elements are visible
        this.autoplay = options.autoplay ?? true;

        // Internal state tracking
        this.children = Array.from(this.container.children);
        this.animationTimeouts = [];
        this.isAnimating = this.autoplay;
        this.currentStep = 0; // Track the current position in the sequence
        this.isPaused = false; // Track whether the animation is paused
        this.hasPassedMidpoint = false; // Ensures pausing is only allowed past 50%

        // Bind methods to maintain correct context
        this.animateSequence = this.animateSequence.bind(this);
        this.resumeSequence = this.resumeSequence.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        // Initial setup
        this.init();
    }

    /**
     * Initialize the animation
     */
    init() {
        this.container.classList.add('llm-hero-animation');
        this.children.forEach((child) => {
            child.classList.add('llm-hero-item');
            child.style.opacity = '0';
            child.style.transition = 'opacity 0.3s ease-in-out';
        });
        this.container.style.position = 'relative';

        this.container.addEventListener('mouseenter', this.handleMouseEnter);
        this.container.addEventListener('mouseleave', this.handleMouseLeave);

        if (this.autoplay) {
            this.animateSequence();
        }
    }

    /**
     * Clear all existing animation timeouts
     */
    clearAnimationTimeouts() {
        this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
        this.animationTimeouts = [];
    }

    /**
     * Animate the sequence of revealing, pausing, and fading out
     */
    animateSequence() {
        this.clearAnimationTimeouts();

        if (!this.isAnimating || this.isPaused) return;

        const totalSteps = this.children.length * 2 + 1; // Reveal + Pause + Fade-out
        const revealSteps = this.children.length;
        const fadeOutSteps = this.children.length;
        const pauseStep = revealSteps; // The step when all elements are visible

        if (this.currentStep < revealSteps) {
            // Reveal sequence
            const child = this.children[this.currentStep];
            if (child) {
                child.style.opacity = '1';
                if (child.tagName.toLowerCase() === 'video') {
                    child.play();
                }
            }
        } else if (this.currentStep === pauseStep) {
            // Pause when all elements are visible
            setTimeout(() => {
                this.currentStep++;
                this.animateSequence();
            }, this.pauseDuration);
            return;
        } else if (this.currentStep > pauseStep && this.currentStep < totalSteps) {
            // Mark that animation has passed the midpoint
            this.hasPassedMidpoint = true;

            // Fade-out sequence
            const fadeOutIndex = this.currentStep - pauseStep - 1;
            const child = this.children[this.children.length - 1 - fadeOutIndex];
            if (child) {
                child.style.opacity = '0';
                if (child.tagName.toLowerCase() === 'video') {
                    child.pause();
                    child.currentTime = 0;
                }
            }
        } else {
            // Restart sequence
            this.currentStep = 0;
            this.hasPassedMidpoint = false; // Reset midpoint flag
            this.animateSequence();
            return;
        }

        // Move to the next step
        this.currentStep++;
        const nextTimeout = setTimeout(() => {
            this.animateSequence();
        }, this.speed);
        this.animationTimeouts.push(nextTimeout);
    }

    /**
     * Resume animation from the current step
     */
    resumeSequence() {
        this.isPaused = false;
        this.animateSequence();
    }

    /**
     * Pause animation on mouse enter or manual stop
     */
    handleMouseEnter() {
        if (this.hasPassedMidpoint) {
            // Only allow pausing if the animation has passed the midpoint (start of fade-out)
            this.isPaused = true;
            this.clearAnimationTimeouts();
        }
    }

    /**
     * Resume animation on mouse leave or manual start
     */
    handleMouseLeave() {
        if (this.hasPassedMidpoint) {
            this.resumeSequence();
        }
    }

    /**
     * Manually start the animation
     */
    start() {
        this.isAnimating = true;
        this.resumeSequence();
    }

    /**
     * Manually stop the animation
     */
    stop() {
        this.isAnimating = false;
        this.isPaused = true;
        this.clearAnimationTimeouts();
    }

    /**
     * Destroy the animation and clean up
     */
    destroy() {
        this.container.removeEventListener('mouseenter', this.handleMouseEnter);
        this.container.removeEventListener('mouseleave', this.handleMouseLeave);

        this.clearAnimationTimeouts();

        this.container.classList.remove('llm-hero-animation');
        this.container.style.position = '';
        this.children.forEach(child => {
            child.classList.remove('llm-hero-item');
            child.style.opacity = '';
            child.style.transition = '';
        });
    }
}

// Expose to global scope if not using a module system
if (typeof window !== 'undefined') {
    window.LLMHeroAnimation = LLMHeroAnimation;
}

export default LLMHeroAnimation;