//DO THIS NEXT
import { Container, Text } from "@chakra-ui/react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


export const InstructorGraph = ({ data }) => {
    if (!data.length > 0) {
        return null
    }
    return (
        <>
        <Text size='md' m='4'>Your most popular flows are:</Text>
        <Container m='10'>
        <ResponsiveContainer width={800} height={300}>
            <BarChart
            data={data}
            layout="vertical"
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
            >
                {/* <CartesianGrid strokeDasharray="3 3"/> */}
                <XAxis type="number" domain={[0, 'dataMax']} dataKey="userFaves.length" />
                <YAxis type="category" dataKey="title" />
                <Legend />
                <Tooltip />
                <Bar dataKey="userFaves.length" legendType="star" name="favorites" fill="#56638a" />
                <Bar dataKey="title" hide legendType="circle" fill="#483a58" />
            </BarChart>
        </ResponsiveContainer>
                </Container>
        </>
    )
}