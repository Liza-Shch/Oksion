import ReglamentWorkType from './ReglamentWorkType';

const ReglamentWorkTypeSelect = ReglamentWorkType.map((workType) => { return Object.assign({}, workType) });
ReglamentWorkTypeSelect.forEach((workType) => {
    workType.chosen = false;
});

ReglamentWorkTypeSelect[0].chosen = true;

export default ReglamentWorkTypeSelect;