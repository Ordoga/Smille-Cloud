export default function InputForm({ points, setPoints, setIsSubmitted, maxValue }) {
    function handleSubmit(e) {
        e.preventDefault()
        setIsSubmitted(true)
    }

    // Allowing empty input and not making it a zero
    function handleCoordinateChange(index, coord, value) {
        if (value === '' || (!isNaN(value) && +value <= maxValue && +value >= 0)) {
            const newPoints = [...points]
            newPoints[index][coord] = value === '' ? '' : +value
            setPoints(newPoints)
            setIsSubmitted(false)
        }
    }

    function handleBlur(index, coord, value) {
        if (value === '') {
            const newPoints = [...points]
            newPoints[index][coord] = 0
            setPoints(newPoints)
        }
    }

    if (!points) return

    return (
        <section className='input-form-container page'>
            <div className='secondary-title'>{`Choose Coordinates between 0 and ${maxValue}`}</div>
            <form className='input-form' onSubmit={handleSubmit}>
                {points.map((point, index) => (
                    <div key={index} className='point-input'>
                        <h3 className='point-number'>Point {index + 1}</h3>
                        <div className='coordinate-inputs'>
                            <div className='coordinate'>
                                <label>X Coordinate</label>
                                <input
                                    type='text'
                                    value={point.x}
                                    onChange={e => handleCoordinateChange(index, 'x', e.target.value)}
                                    onBlur={e => handleBlur(index, 'x', point.x)}
                                    required
                                />
                            </div>
                            <div className='coordinate'>
                                <label>Y Coordinate</label>
                                <input
                                    type='text'
                                    value={point.y}
                                    onChange={e => handleCoordinateChange(index, 'y', e.target.value)}
                                    onBlur={e => handleBlur(index, 'y', point.y)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button className='margin-top'>Draw Triangle</button>
            </form>
        </section>
    )
}
