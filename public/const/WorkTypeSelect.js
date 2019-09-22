import WorkType from './WorkType';

const WorkTypeSelect = WorkType.map((workType) => { return Object.assign({}, workType) });
WorkTypeSelect.forEach((workType) => {
    workType.chosen = false;
});

WorkTypeSelect[0].chosen = true;

export default WorkTypeSelect;