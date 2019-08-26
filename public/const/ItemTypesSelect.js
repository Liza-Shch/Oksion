import ItemTypes from "./ItemTypes";

const ItemTypesSelect = ItemTypes.map((itemType) => {return Object.assign({}, itemType)});
ItemTypesSelect.forEach((itemType) => {
    itemType.chosen = false;
});

ItemTypesSelect.push({
    text: "Любой",
    value: "any",
    chosen: "true"
});

export default ItemTypesSelect;