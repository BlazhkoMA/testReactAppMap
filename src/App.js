import LayoutComponent from "./Layout/Layout";
import Map from "./Components/Map/Map";
import ResizeController from "./Components/ResizeController/ResizeController";
import TableComponent from "./Components/Table/Table";
function App() {
  return (
    <LayoutComponent>
        <ResizeController>
            <TableComponent/>
            <Map/>
        </ResizeController>
    </LayoutComponent>
  );
}

export default App;
