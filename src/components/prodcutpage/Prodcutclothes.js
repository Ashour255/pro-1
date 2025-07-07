import ListOfProdcut from "./ListOfProdcut";
import "./prodcutpage.css";
import Prodcutbage_itme from "./prodcutpage_itme";

export default function Prodcutclothes() {
  return (
    <div className="product-bags">
      <div className="container">
        <div className="title">
          <h2>CLOTHES</h2>
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
