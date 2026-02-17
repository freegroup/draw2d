/**
 * @class draw2d.util.Animation
 * 
 * Utility class for DOM animations without jQuery dependency.
 * Provides fadeIn and fadeOut effects that are 100% API-compatible with jQuery's fadeIn/fadeOut.
 * 
 * @author Andreas Herz
 * @since 6.0.0
 */

/**
 * Fade in an element over a specified duration.
 * 100% API-compatible with jQuery's fadeIn() method.
 * 
 * @param {HTMLElement} element - The DOM element to fade in
 * @param {number} duration - Duration in milliseconds
 * @param {function} [callback] - Optional callback when animation completes (called exactly once)
 * @static
 */
export function fadeIn(element, duration, callback) {
  if (!element?.style) {
    if (callback) callback()
    return
  }

  let completed = false
  let timeoutId = null

  const complete = () => {
    if (completed) return
    completed = true
    
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    
    element.style.transition = ''
    element.style.removeProperty('opacity')
    
    if (callback) callback()
  }

  // Store current display value or default to empty
  const currentDisplay = window.getComputedStyle(element).display
  const targetDisplay = (currentDisplay === 'none') ? '' : currentDisplay

  // Set initial state
  element.style.display = targetDisplay
  element.style.opacity = '0'
  element.style.transition = `opacity ${duration}ms ease-in-out`

  // Trigger reflow to ensure transition works
  void element.offsetHeight

  // Start fade in
  element.style.opacity = '1'

  // Handle completion via transitionend
  const handleTransitionEnd = (e) => {
    // Only react to opacity transitions on this element
    if (e.target === element && e.propertyName === 'opacity') {
      element.removeEventListener('transitionend', handleTransitionEnd)
      complete()
    }
  }

  element.addEventListener('transitionend', handleTransitionEnd)
  
  // Fallback timeout in case transitionend doesn't fire
  timeoutId = setTimeout(() => {
    element.removeEventListener('transitionend', handleTransitionEnd)
    complete()
  }, duration + 50)
}

/**
 * Fade out an element over a specified duration.
 * 100% API-compatible with jQuery's fadeOut() method.
 * 
 * @param {HTMLElement} element - The DOM element to fade out
 * @param {number} duration - Duration in milliseconds
 * @param {function} [callback] - Optional callback when animation completes (called exactly once)
 * @static
 */
export function fadeOut(element, duration, callback) {
  if (!element?.style) {
    if (callback) callback()
    return
  }

  let completed = false
  let timeoutId = null

  const complete = () => {
    if (completed) return
    completed = true
    
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    
    element.style.display = 'none'
    element.style.transition = ''
    element.style.removeProperty('opacity')
    
    if (callback) callback()
  }

  // Get current opacity or default to 1
  const currentOpacity = window.getComputedStyle(element).opacity
  
  // Set up transition
  element.style.opacity = currentOpacity
  element.style.transition = `opacity ${duration}ms ease-in-out`

  // Trigger reflow
  void element.offsetHeight

  // Start fade out
  element.style.opacity = '0'

  // Handle completion via transitionend
  const handleTransitionEnd = (e) => {
    // Only react to opacity transitions on this element
    if (e.target === element && e.propertyName === 'opacity') {
      element.removeEventListener('transitionend', handleTransitionEnd)
      complete()
    }
  }

  element.addEventListener('transitionend', handleTransitionEnd)
  
  // Fallback timeout in case transitionend doesn't fire
  timeoutId = setTimeout(() => {
    element.removeEventListener('transitionend', handleTransitionEnd)
    complete()
  }, duration + 50)
}
