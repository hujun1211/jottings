'use client'
import { motion } from 'motion/react'

const box = {
  width: 100,
  height: 100,
  backgroundColor: '#ff0088',
  borderRadius: 5,
}

export default function Page() {
  return (
    <div>
      <motion.button
        style={box}
        initial={{ height: 100 }}
        animate={{ height: 200 }}
      />
    </div>
  )
}
