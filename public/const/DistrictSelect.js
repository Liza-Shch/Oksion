import District from "./District";

const DistrictSelect = District;
DistrictSelect.forEach((district) => {
    district.chosen = false;
});

DistrictSelect.push({
    text: 'Любой',
    value: 'any',
    chosen: true,
});

export default DistrictSelect;