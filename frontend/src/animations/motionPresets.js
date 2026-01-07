/**
 * Shared animation presets for the entire application
 *
 * Why this file exists:
 * - Keeps animations consistent across all components
 * - Avoids repeating animation code in every component
 * - Makes the UI feel smooth and professional
 *
 * Used with: Framer Motion
 */

/**
 * Common easing curve used in all animations
 * This cubic-bezier curve creates a natural, smooth motion
 * Similar to Material UI / Apple UI animations
 */
export const ease = [0.4, 0, 0.2, 1];

/**
 * Fade-up animation
 *
 * Use case:
 * - Cards
 * - Sections
 * - Filters
 * - Hero blocks
 *
 * Effect:
 * - Element starts slightly below
 * - Fades in while moving upward
 */
export const fadeUp = {
  hidden: {
    opacity: 0, // element is invisible
    y: 20,      // element starts 20px lower
  },
  visible: {
    opacity: 1, // fully visible
    y: 0,       // moves to original position
    transition: {
      duration: 0.6, // smooth but noticeable
      ease,
    },
  },
};

/**
 * Simple fade-in animation
 *
 * Use case:
 * - Text
 * - Icons
 * - Small UI elements
 *
 * Effect:
 * - Only opacity changes
 * - No movement
 */
export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

/**
 * Scale-in animation
 *
 * Use case:
 * - Modals
 * - Popups
 * - Success messages
 *
 * Effect:
 * - Element slightly zooms in while appearing
 * - Makes popups feel more natural
 */
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95, // slightly smaller
  },
  visible: {
    opacity: 1,
    scale: 1,    // normal size
    transition: {
      duration: 0.4,
      ease,
    },
  },
};

/**
 * Spring-based transition for capsule-style UI elements
 *
 * Use case:
 * - Tabs
 * - Active indicators
 * - Sliding highlights
 *
 * Why spring:
 * - Feels responsive and physical
 * - Avoids robotic animations
 */
export const capsuleTransition = {
  type: "spring",
  stiffness: 500, // how fast it moves
  damping: 30,    // how much bounce is reduced
};
