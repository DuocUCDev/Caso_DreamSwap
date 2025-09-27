import { dreams } from "../utils/mockDreams";
import DreamCard from "../components/DreamCard";

export default function Catalog(){
  return (
    <>
      <h1 className="h3 mb-3">Catálogo</h1>
      <div className="row g-3">
        {
          dreams.map(d => (
            <div className="col-12 col-md-6 col-xl-4" key={d.id}>
              <DreamCard dream={d} />
            </div>
          ))
        }      
      </div>
    </>
  );
}