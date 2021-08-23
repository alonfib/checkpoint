import './App.css';
import InteractiveList from './InteractiveList/index.tsx';
import { useState } from 'react';

const mockData = [
  {
    id: 0,
    content: "test 1"
  },
  {
    id: 1,
    content: "test 2"
  },
  {
    id: 2,
    content: "test 3"
  }
]

function App() {
  const [data, setData] = useState(mockData)
  const [isLoading, setIsLoading] = useState(false);

  const mockLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
}


  const addItem = (itemContent ="") => {
    mockLoading();
    if(data.length > 0) {
      const newId = parseInt(data[data.length - 1].id) + 1
      setData([...data, {id: newId, content: itemContent}])
    } else {
      setData([{id: 0, content: itemContent}])
    }
  }

  const editItem = (id, value) => {
    const itemIndex = data.findIndex(item => item.id === id);
    const newItem = JSON.parse(JSON.stringify(data))
    newItem[itemIndex].content = value;
    setData(newItem);
  }

  const validation = async (value) => {
    return true;
  }
  
  const REGEX = /^.*./;

  return (
    <div className="App">
      <InteractiveList 
          data={data}
          onAdd={addItem}
          onRemove={(id) => setData(data.filter(item => item.id != id))}
          onEdit={editItem}
          customValidation={validation}
          regexValidation={REGEX}
          isReadOnly={false}
          isError={false}
          isLoading={isLoading}
        />
    </div>
  );
}

export default App;
