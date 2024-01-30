import { expect, it } from 'vitest'
import { add } from './Add'

it('Should add two numbers and return a sum', () => {
  //   Arrange
  const valA = 2
  const valB = 4

  //   Act
  const sum = add(valA, valB)

  //   Assert
  const expectedResult = valA + valB
  expect(sum).toBe(expectedResult)
})
