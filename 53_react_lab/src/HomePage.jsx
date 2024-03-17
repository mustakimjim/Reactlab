import React, { useState } from 'react';

function HomePage() {
    const [textBoxes, setTextBoxes] = useState([{ id: 1, value: '' }]);
    const [sum, setSum] = useState(0);

    const addTextBox = () => {
        const newId = textBoxes.length + 1;
        setTextBoxes([...textBoxes, { id: newId, value: '' }]);
    };

    const deleteTextBox = (id) => {
        setTextBoxes(textBoxes.filter((textBox) => textBox.id !== id));
    };

    const handleInputChange = (id, value) => {
        const updatedTextBoxes = textBoxes.map((textBox) =>
            textBox.id === id ? { ...textBox, value } : textBox
        );
        setTextBoxes(updatedTextBoxes);
        const newSum = updatedTextBoxes.reduce((acc, textBox) => acc + parseFloat(textBox.value || 0), 0);
        setSum(newSum);
    };

    return (
        <div className='flex flex-col items-center justify-center pt-16' style={{ background: 'linear-gradient(to bottom, #000000, #FF0000)' }}>
            {textBoxes.map((textBox) => (
                <div key={textBox.id} className="flex items-center mb-2">
                    <input
                        type="text"
                        value={textBox.value}
                        onChange={(e) => handleInputChange(textBox.id, e.target.value)}
                        className='p-2 mr-2 border-2 border-gray-500 rounded-md focus:outline-none focus:border-blue-700'
                        placeholder="Enter a value"
                    />
                    <button onClick={() => deleteTextBox(textBox.id)} className='px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'>Delete</button>
                </div>
            ))}
            <div className='flex items-center justify-between gap-x-20'>
                <button onClick={addTextBox} className='px-4 py-2 mt-5 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>Add TextBox</button>
                <div className='mt-5 text-xl'>Total Sum: {sum}</div>
            </div>
        </div>
    );
}

export default HomePage;
