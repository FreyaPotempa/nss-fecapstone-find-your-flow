import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ProgressChart = ({ data }) => {

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                {/*
                Don't know if I like this here but might add in again later 
                <CartesianGrid strokeDasharray="3 3"/> */}
                <XAxis dataKey="dateCompleted" />
                <YAxis dataKey="difficulty" domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="dateCompleted" fill="#8884d8" />
                <Bar dataKey="difficulty" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    )
}