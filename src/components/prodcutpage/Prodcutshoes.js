import ListOfProdcut from "./ListOfProdcut";
import "./prodcutpage.css";
import Prodcutbage_itme from "./prodcutpage_itme";

export default function Prodcutshoes() {
  return (
    <div className="product-bags">
      <div className="container">
        <div className="title">
          <h2>SHOES</h2>
          <ListOfProdcut />
        </div>
        <div className="row">
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
        </div>
      </div>
    </div>
  );
}
