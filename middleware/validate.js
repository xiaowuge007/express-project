/*
 * @Author: lhq
 * @Date: 2022-03-23 16:03:17
 * @LastEditors: lhq
 * @LastEditTime: 2022-03-23 16:08:50
 * @Description: file content
 */
const { validationResult } = require('express-validator')
// parallel processing
const validateAll = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}

// sequential processing, stops running validations chain if the previous one have failed.
const validateRace = validations => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req)
      if (result.errors.length) break
    }

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}
module.exports = {
  validateAll,
  validateRace
}
