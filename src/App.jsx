import Form from "./components/Form";
import Table from "./components/Table";
import UpdateForm from "./components/UpdateForm";
import { useAppContext } from "./context/ContextProvider";

function App() {
  const { showForm, showUpdateForm, selectedId } = useAppContext();
  return (
    <div className="pt-24">
      <Table />
      {showForm && <Form />}
      {showUpdateForm && <UpdateForm id={selectedId} />}
    </div>
  );
}

export default App;
