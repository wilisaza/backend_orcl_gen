
export const decodeString = (iterations, value) => {
  let decode = value
  for(let i = iterations; i > 0; i--)
    i === 1 ? decode = Buffer.from(decode,'hex').toString('ascii') : decode = Buffer.from(decode,'base64').toString('ascii')
  return decode
}
