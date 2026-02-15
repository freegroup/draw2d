/**
 * Jest global setup for draw2d tests
 * 
 * This file loads the draw2d namespace and required modules for testing.
 * We load modules selectively to avoid heavy dependencies like Raphael/eve.
 */

// Mock navigator for packages.js (checks for touch device)
global.navigator = global.navigator || { platform: 'test' }

// Load Class.exec.js - this sets global.Class via IIFE
import '../src/lib/Class.exec.js'

// Load the draw2d namespace structure
import draw2d from '../src/packages'

// Make draw2d available globally for modules that expect it
global.draw2d = draw2d

// Now load the required utility modules (they register on the draw2d namespace)
import '../src/util/ArrayList'

// Load geo modules
import '../src/geo/Point'
import '../src/geo/Util'

// Load Configuration (needed for i18n in CommandAttr)
import '../src/Configuration'

// Load command modules
import '../src/command/Command'
import '../src/command/CommandCollection'
import '../src/command/CommandStackEvent'
import '../src/command/CommandStack'
import '../src/command/CommandAttr'

console.log('✓ Jest setup complete: draw2d namespace initialized')