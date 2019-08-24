import ObjectTypes from "./ObjectTypes";

const ObjectTypesSelect = ObjectTypes;
ObjectTypesSelect.forEach((objectType) => {
    objectType.chosen = false;
});

ObjectTypesSelect.push({
    text: "Любой",
    value: "any",
    chosen: "true"
});

export default ObjectTypesSelect;