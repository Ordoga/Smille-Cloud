import { Stage, Layer, Line, Circle, Text, Rect, Group, Arc } from 'react-konva'

export default function TrianglePreview({ points, setIsSubmitted, maxValue }) {
    const angles = [
        calculateAngle(points[1], points[0], points[2]),
        calculateAngle(points[0], points[1], points[2]),
        calculateAngle(points[0], points[2], points[1]),
    ]
    const arcs = [calculateArcData(0), calculateArcData(1), calculateArcData(2)]

    function handleGoBack() {
        setIsSubmitted(false)
    }

    function calculateAngle(p1, p2, p3) {
        const a = Math.sqrt(Math.pow(p2.x - p3.x, 2) + Math.pow(p2.y - p3.y, 2))
        const b = Math.sqrt(Math.pow(p1.x - p3.x, 2) + Math.pow(p1.y - p3.y, 2))
        const c = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
        const angleRad = Math.acos((a * a + c * c - b * b) / (2 * a * c))
        return Math.round((angleRad * 180) / Math.PI)
    }

    function calculateArcData(currentIndex) {
        // Get the current point
        const point = points[currentIndex]

        // Get the other two points
        const nextIndex = (currentIndex + 1) % 3
        const prevIndex = (currentIndex + 2) % 3

        // Calculate vectors from current point to the other two points
        const vec1 = {
            x: points[nextIndex].x - point.x,
            y: points[nextIndex].y - point.y,
        }
        const vec2 = {
            x: points[prevIndex].x - point.x,
            y: points[prevIndex].y - point.y,
        }

        // Calculate angles in radians for the arc
        const angle1 = Math.atan2(vec1.y, vec1.x)
        const angle2 = Math.atan2(vec2.y, vec2.x)

        // Convert to degrees and ensure proper order
        let startAngle = angle1 * (180 / Math.PI)
        let endAngle = angle2 * (180 / Math.PI)

        // Ensure the arc goes through the interior angle
        let angleDiff = endAngle - startAngle
        if (angleDiff < 0) angleDiff += 360
        if (angleDiff > 180) {
            // Swap angles to get the interior angle
            const temp = startAngle
            startAngle = endAngle
            endAngle = temp
            angleDiff = 360 - angleDiff
        }

        return {
            x: point.x,
            y: point.y,
            angle: angleDiff,
            rotation: startAngle,
        }
    }

    const pointColors = ['#FF6B6B', '#48DBFB', '#1DD1A1']
    const bgColors = ['rgba(255, 107, 107, 0.8)', 'rgba(72, 219, 251, 0.8)', 'rgba(29, 209, 161, 0.8)']

    function TextWithBackground({ x, y, text, backgroundColor, borderRadius = 5, fontSize = 14 }) {
        const lines = text.split('\n')
        const maxLineLength = Math.max(...lines.map(line => line.length))
        const estimatedWidth = maxLineLength * fontSize * 0.6
        const estimatedHeight = lines.length * fontSize * 1.2 + 10

        return (
            <Group>
                <Rect
                    x={x}
                    y={y}
                    width={estimatedWidth}
                    height={estimatedHeight}
                    fill={backgroundColor}
                    cornerRadius={borderRadius}
                    shadowColor='rgba(0,0,0,0.3)'
                    shadowBlur={3}
                    shadowOffset={{ x: 2, y: 2 }}
                />
                <Text x={x + 5} y={y + 5} text={text} fontSize={fontSize} fill='white' />
            </Group>
        )
    }

    return (
        <section className='triangle-preview page'>
            <div className='secondary-title'>Triangle Preview</div>
            <div className='canvas-container'>
                <Stage width={maxValue + 50} height={maxValue + 50}>
                    <Layer>
                        <Line
                            points={[
                                points[0].x,
                                points[0].y,
                                points[1].x,
                                points[1].y,
                                points[2].x,
                                points[2].y,
                                points[0].x,
                                points[0].y,
                            ]}
                            stroke='blue'
                            fill='rgb(255, 255, 255)'
                            closed
                            strokeWidth={2}
                        />

                        {points.map((point, i) => (
                            <Circle
                                key={i}
                                x={point.x}
                                y={point.y}
                                radius={8}
                                fill={pointColors[i]}
                                stroke='white'
                                strokeWidth={2}
                            />
                        ))}

                        {arcs.map((arc, index) => (
                            <Arc
                                key={`arc-${index}`}
                                x={arc.x}
                                y={arc.y}
                                innerRadius={30}
                                angle={arc.angle}
                                rotation={arc.rotation}
                                stroke={pointColors[index]}
                                strokeWidth={3}
                            />
                        ))}

                        {points.map((point, index) => (
                            <TextWithBackground
                                key={index}
                                x={point.x + 25}
                                y={point.y + 5}
                                text={`${angles[index]}°\nPoint ${index + 1}\nx:${point.x} y:${point.y}`}
                                backgroundColor={bgColors[index]}
                                borderRadius={8}
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
            <button onClick={handleGoBack} className='margin-top'>
                Go Back
            </button>
        </section>
    )
}
