import React from 'react';
import { PieChart, Pie, Cell, Legend, LabelList } from 'recharts';

const data = [
  { name: 'Краевые', value: 45 },
  { name: 'Шельфовые', value: 59 },
  { name: 'Кельвин', value: 12 },
  { name: 'Пуанкаре', value: 5 },
];

const COLORS = [ '#008000','#ff0000',  '#0000ff', 'orange'];

const PieDiagram = () => {
  return (
    <PieChart width={800} height={400}>
      <Legend verticalAlign="top" height={36} fill="black" />
      <Pie
        data={data}
        cx={400}
        cy={200}
        outerRadius={160}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <LabelList
          dataKey="value"
          position="inside"
          fill="#ffffff"
          formatter={(value) => `${value}`}
        />
      </Pie>
    </PieChart>
  );
};

export default PieDiagram;