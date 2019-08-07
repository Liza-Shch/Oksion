import IndexContainer from '../../components/IndexContainer/IndexContainer';

export default class IndexPage {
    constructor() {};

    render() {
        const indexContainer = new IndexContainer();
        return indexContainer.render()
    };
}