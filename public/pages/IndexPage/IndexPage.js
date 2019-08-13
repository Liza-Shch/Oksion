import IndexContainer from '../../components/IndexContainer/IndexContainer';
import ERROR_MSG from '../ErrorMsg';

export default class IndexPage {
    constructor() {};

    render() {
        const indexContainer = new IndexContainer();
        return indexContainer.render()
    };
}