import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import AnimeContainer from "./components/AnimeContainer"

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <AnimeContainer />
      </div>
    </DndProvider>
  )
}

export default App
