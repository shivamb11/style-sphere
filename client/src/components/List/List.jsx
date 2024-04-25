import Card from "../Card/Card.jsx";
import "./List.scss";

function List({ data }) {
  return (
    <div className="list">
      {data?.map((item) => (
        <Card item={item} key={item._id} />
      ))}
    </div>
  );
}

export default List;
