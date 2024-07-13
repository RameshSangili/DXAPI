import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

const PieChartComponent = ({ data }) => {
    const navigate = useNavigate();

    // Parse the data to count occurrences of each status
    const statusCounts = data.reduce((acc, item) => {
        acc[item.pyAssignmentStatus] = (acc[item.pyAssignmentStatus] || 0) + 1;
        return acc;
    }, {});

    // Convert the counts to an array suitable for the pie chart
    const chartData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status],
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

    const handleClick = (data, index) => {
        const status = data.name;
        const filteredData = data.filter(item => item.pyAssignmentStatus === status);
        navigate('/drilldown', { state: { filteredData } });
    };

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={chartData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name }) => `${name}`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                onClick={handleClick}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
    );
};

export default PieChartComponent;
