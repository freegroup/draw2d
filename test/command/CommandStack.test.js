/**
 * Unit tests for CommandStack
 * 
 * Tests the command stack functionality including transactions.
 * Uses MockFigure to verify attribute changes and execution order.
 * 
 * Run with: npm test
 */

/**
 * Global operation stack to track execution order across all figures.
 * Each operation records: { figure, operation: 'execute'|'undo', key, value }
 */
let operationStack = []

/**
 * MockFigure that mimics a draw2d Figure's attr() behavior.
 * Tracks all attribute changes and verifies execution order.
 */
class MockFigure {
  constructor(name) {
    this.name = name
    this.attributes = {}
  }

  /**
   * Get or set attributes, like a real draw2d Figure.
   * When setting, records the operation to the global stack.
   */
  attr(key, value) {
    // Called with object: attr({ x: 10, y: 20 })
    if (typeof key === 'object') {
      Object.entries(key).forEach(([k, v]) => {
        operationStack.push({ 
          figure: this.name, 
          key: k, 
          value: v,
          oldValue: this.attributes[k]
        })
        this.attributes[k] = v
      })
      return this
    }
    // Called with two args: attr('x', 10)
    if (value !== undefined) {
      operationStack.push({ 
        figure: this.name, 
        key, 
        value,
        oldValue: this.attributes[key]
      })
      this.attributes[key] = value
      return this
    }
    // Called with one arg: attr('x') - getter
    return this.attributes[key]
  }

  /**
   * Returns a snapshot of current attributes for comparison.
   */
  getSnapshot() {
    return { ...this.attributes }
  }
}

/**
 * Clear the operation stack before each test.
 */
function clearOperationStack() {
  operationStack = []
}

/**
 * Get the last N operations from the stack.
 */
function getLastOperations(n) {
  return operationStack.slice(-n)
}

describe('CommandStack', () => {
  let stack

  beforeEach(() => {
    stack = new draw2d.command.CommandStack()
    clearOperationStack()
  })

  describe('basic operations', () => {
    test('new stack has no undo/redo', () => {
      expect(stack.canUndo()).toBe(false)
      expect(stack.canRedo()).toBe(false)
    })

    test('execute adds command to undo stack', () => {
      const cmd = new draw2d.command.Command('test')
      stack.execute(cmd)
      expect(stack.canUndo()).toBe(true)
      expect(stack.canRedo()).toBe(false)
    })

    test('undo moves command to redo stack', () => {
      const cmd = new draw2d.command.Command('test')
      stack.execute(cmd)
      stack.undo()
      expect(stack.canUndo()).toBe(false)
      expect(stack.canRedo()).toBe(true)
    })

    test('redo moves command back to undo stack', () => {
      const cmd = new draw2d.command.Command('test')
      stack.execute(cmd)
      stack.undo()
      stack.redo()
      expect(stack.canUndo()).toBe(true)
      expect(stack.canRedo()).toBe(false)
    })
  })

  describe('CommandAttr with MockFigure', () => {
    let figure

    beforeEach(() => {
      figure = new MockFigure('TestFigure')
      figure.attr({ x: 0, y: 0, color: 'blue' })
      clearOperationStack() // Clear initial setup operations
    })

    test('execute changes attributes', () => {
      const cmd = new draw2d.command.CommandAttr(figure, { x: 100, y: 200 })
      stack.execute(cmd)

      expect(figure.attr('x')).toBe(100)
      expect(figure.attr('y')).toBe(200)
      expect(figure.attr('color')).toBe('blue') // unchanged
    })

    test('undo restores original values', () => {
      const snapshotBefore = figure.getSnapshot()
      
      const cmd = new draw2d.command.CommandAttr(figure, { x: 100, y: 200 })
      stack.execute(cmd)
      
      expect(figure.attr('x')).toBe(100)
      expect(figure.attr('y')).toBe(200)
      
      stack.undo()
      
      expect(figure.attr('x')).toBe(snapshotBefore.x)
      expect(figure.attr('y')).toBe(snapshotBefore.y)
    })

    test('redo reapplies changes after undo', () => {
      const snapshotBefore = figure.getSnapshot()
      const cmd = new draw2d.command.CommandAttr(figure, { x: 100, y: 200 })
      
      stack.execute(cmd)
      expect(figure.attr('x')).toBe(100)
      expect(figure.attr('y')).toBe(200)
      
      stack.undo()
      expect(figure.attr('x')).toBe(snapshotBefore.x)
      expect(figure.attr('y')).toBe(snapshotBefore.y)
      
      stack.redo()
      expect(figure.attr('x')).toBe(100)
      expect(figure.attr('y')).toBe(200)
    })

    test('multiple undo/redo cycles preserve values', () => {
      const snapshotBefore = figure.getSnapshot()
      const cmd = new draw2d.command.CommandAttr(figure, { x: 100 })
      
      stack.execute(cmd)
      expect(figure.attr('x')).toBe(100)
      
      stack.undo()
      expect(figure.attr('x')).toBe(snapshotBefore.x)
      
      stack.redo()
      expect(figure.attr('x')).toBe(100)
      
      stack.undo()
      expect(figure.attr('x')).toBe(snapshotBefore.x)
    })
  })

  describe('transactions', () => {
    test('simple transaction groups commands', () => {
      stack.startTransaction('group')
      stack.execute(new draw2d.command.Command('cmd1'))
      stack.execute(new draw2d.command.Command('cmd2'))
      stack.commitTransaction()

      // Should be one undo operation
      expect(stack.undostack.length).toBe(1)
    })

    test('nested transactions - 2 levels', () => {
      stack.startTransaction('Outer')
      stack.execute(new draw2d.command.Command('outer-cmd'))
      
      stack.startTransaction('Inner')
      stack.execute(new draw2d.command.Command('inner-cmd1'))
      stack.execute(new draw2d.command.Command('inner-cmd2'))
      stack.commitTransaction()
      
      stack.execute(new draw2d.command.Command('outer-cmd2'))
      stack.commitTransaction()

      // All commands should be in one undo operation
      expect(stack.undostack.length).toBe(1)
    })

    test('nested transactions - 3 levels deep', () => {
      stack.startTransaction('L1')
      stack.execute(new draw2d.command.Command('a'))
      stack.startTransaction('L2')
      stack.execute(new draw2d.command.Command('b'))
      stack.startTransaction('L3')
      stack.execute(new draw2d.command.Command('c'))
      stack.commitTransaction()
      stack.commitTransaction()
      stack.commitTransaction()

      expect(stack.undostack.length).toBe(1)
    })

    test('transaction stack is properly maintained', () => {
      expect(stack.transactionStack.length).toBe(0)
      
      stack.startTransaction('L1')
      expect(stack.transactionStack.length).toBe(0) // First transaction doesn't push
      
      stack.startTransaction('L2')
      expect(stack.transactionStack.length).toBe(1)
      
      stack.startTransaction('L3')
      expect(stack.transactionStack.length).toBe(2)
      
      stack.commitTransaction()
      expect(stack.transactionStack.length).toBe(1)
      
      stack.commitTransaction()
      expect(stack.transactionStack.length).toBe(0)
      
      stack.commitTransaction()
      expect(stack.transactionStack.length).toBe(0)
      expect(stack.transactionCommand).toBeNull()
    })

    test('isInTransaction returns correct state', () => {
      expect(stack.isInTransaction()).toBe(false)
      
      stack.startTransaction('test')
      expect(stack.isInTransaction()).toBe(true)
      
      stack.commitTransaction()
      expect(stack.isInTransaction()).toBe(false)
    })
  })

  describe('execution order verification', () => {
    let figure1, figure2

    beforeEach(() => {
      figure1 = new MockFigure('Figure1')
      figure1.attr({ x: 0, y: 0 })
      figure2 = new MockFigure('Figure2')
      figure2.attr({ x: 0, y: 0 })
      clearOperationStack()
    })

    test('execute order is preserved (FIFO)', () => {
      stack.execute(new draw2d.command.CommandAttr(figure1, { x: 10 }))
      stack.execute(new draw2d.command.CommandAttr(figure2, { x: 20 }))
      stack.execute(new draw2d.command.CommandAttr(figure1, { y: 30 }))

      const ops = getLastOperations(3)
      expect(ops[0]).toMatchObject({ figure: 'Figure1', key: 'x', value: 10 })
      expect(ops[1]).toMatchObject({ figure: 'Figure2', key: 'x', value: 20 })
      expect(ops[2]).toMatchObject({ figure: 'Figure1', key: 'y', value: 30 })
    })

    test('undo order is reversed (LIFO)', () => {
      stack.execute(new draw2d.command.CommandAttr(figure1, { x: 10 }))
      stack.execute(new draw2d.command.CommandAttr(figure2, { x: 20 }))
      stack.execute(new draw2d.command.CommandAttr(figure1, { y: 30 }))

      clearOperationStack()

      // Undo all three - should be in reverse order
      stack.undo() // Undoes figure1.y=30
      stack.undo() // Undoes figure2.x=20
      stack.undo() // Undoes figure1.x=10

      const ops = getLastOperations(3)
      // First undo restores figure1.y to 0
      expect(ops[0]).toMatchObject({ figure: 'Figure1', key: 'y', value: 0 })
      // Second undo restores figure2.x to 0
      expect(ops[1]).toMatchObject({ figure: 'Figure2', key: 'x', value: 0 })
      // Third undo restores figure1.x to 0
      expect(ops[2]).toMatchObject({ figure: 'Figure1', key: 'x', value: 0 })
    })

    test('nested transaction undo reverses all commands', () => {
      stack.startTransaction('Outer')
      stack.execute(new draw2d.command.CommandAttr(figure1, { x: 10 }))
      
      stack.startTransaction('Inner')
      stack.execute(new draw2d.command.CommandAttr(figure2, { x: 20 }))
      stack.execute(new draw2d.command.CommandAttr(figure1, { y: 30 }))
      stack.commitTransaction()
      
      stack.execute(new draw2d.command.CommandAttr(figure2, { y: 40 }))
      stack.commitTransaction()

      // Verify execute order
      expect(figure1.attr('x')).toBe(10)
      expect(figure2.attr('x')).toBe(20)
      expect(figure1.attr('y')).toBe(30)
      expect(figure2.attr('y')).toBe(40)

      clearOperationStack()

      // Single undo should reverse ALL commands in the transaction
      stack.undo()

      // All values should be restored to original
      expect(figure1.attr('x')).toBe(0)
      expect(figure2.attr('x')).toBe(0)
      expect(figure1.attr('y')).toBe(0)
      expect(figure2.attr('y')).toBe(0)

      // Verify undo order: should be reverse of execute order
      const ops = getLastOperations(4)
      expect(ops[0]).toMatchObject({ figure: 'Figure2', key: 'y', value: 0 })
      expect(ops[1]).toMatchObject({ figure: 'Figure1', key: 'y', value: 0 })
      expect(ops[2]).toMatchObject({ figure: 'Figure2', key: 'x', value: 0 })
      expect(ops[3]).toMatchObject({ figure: 'Figure1', key: 'x', value: 0 })
    })
  })

  describe('undo limit', () => {
    test('respects maxundo setting', () => {
      stack.setUndoLimit(3)
      
      for (let i = 0; i < 5; i++) {
        stack.execute(new draw2d.command.Command(`cmd${i}`))
      }
      
      expect(stack.undostack.length).toBe(3)
    })
  })

  describe('markSaveLocation', () => {
    test('clears undo and redo stacks', () => {
      stack.execute(new draw2d.command.Command('cmd1'))
      stack.execute(new draw2d.command.Command('cmd2'))
      stack.undo()
      
      expect(stack.canUndo()).toBe(true)
      expect(stack.canRedo()).toBe(true)
      
      stack.markSaveLocation()
      
      expect(stack.canUndo()).toBe(false)
      expect(stack.canRedo()).toBe(false)
    })
  })
})