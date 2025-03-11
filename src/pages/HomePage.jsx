import { useState } from 'react'
import TrianglePreview from '../cmps/TrianglePreview'
import InputForm from '../cmps/InputForm'

export default function HomePage() {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [points, setPoints] = useState([
        { x: 150, y: 500 },
        { x: 450, y: 350 },
        { x: 200, y: 100 },
    ])

    const MAX_VALUE = 600

    if (!points) return

    return (
        <section className='home-page'>
            {isSubmitted ? (
                <TrianglePreview points={points} setIsSubmitted={setIsSubmitted} maxValue={MAX_VALUE} />
            ) : (
                <InputForm points={points} setPoints={setPoints} setIsSubmitted={setIsSubmitted} maxValue={MAX_VALUE} />
            )}
        </section>
    )
}
